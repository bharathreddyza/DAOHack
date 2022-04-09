const AppError = require('../utils/appError');
const { v4: uuidv4 } = require('uuid');
const Ipfs = require('ipfs');
const OrbitDB = require('orbit-db');

class Dao {
  constructor(Ipfs, OrbitDB) {
    this.OrbitDB = OrbitDB;
    this.Ipfs = Ipfs;
  }

  async create() {
    this.node = await this.Ipfs.create({
      preload: { enabled: false },
      repo: './ipfs',
      EXPERIMENTAL: { pubsub: true },
      config: {
        Bootstrap: [],
        Addresses: { Swarm: [] },
      },
    });

    await this._init();
  }

  async _init() {
    const peerInfo = await this.node.id();
    this.orbitdb = await this.OrbitDB.createInstance(this.node);
    this.defaultOptions = {
      accessController: {
        write: [this.orbitdb.identity.id],
      },
    };

    const docStoreOptions = {
      ...this.defaultOptions,
      indexBy: 'id',
    };
    // this.daos = await this.orbitdb.docs('daos', docStoreOptions);
    this.daos = await this.orbitdb.docs('dao.daos', docStoreOptions);
    // console.log('daos set');
    await this.daos.load();

    this.reviews = await this.orbitdb.docs('dao.reviews', docStoreOptions);
    await this.reviews.load();

    this.jobs = await this.orbitdb.docs('dao.jobs', docStoreOptions);
    await this.jobs.load();

    this.blogs = await this.orbitdb.docs('dao.blogs', docStoreOptions);
    await this.blogs.load();
  }

  // --------------------------------------
  // ---------DAO methods start -----------
  // --------------------------------------

  async newDao(dao) {
    // console.log(dao);
    const existingDao = await this.daos.query((doc) => doc.id === dao.id);

    if (existingDao.length) {
      throw new AppError(400, 'Dao with same id already exists');
    }

    await this.daos.put(dao);
    return dao;
  }

  async updateDao(dao) {
    let existingDao = this.daos.get(dao.id)[0];

    if (!existingDao) {
      console.log('daoModel/updateDao no dao found, creating new dao');
      return await this.newDao(dao);
      // throw new AppError(400, 'No Dao exists with that ID');
    }

    existingDao = { ...existingDao, ...dao };
    return await this.daos.put(existingDao);
  }

  async setDaoTreasury(daoID, treasuryObj) {
    let existingDao = this.daos.get(`${daoID}`)[0];

    if (!existingDao) {
      throw new AppError(400, 'No Dao exists with that ID');
    }

    existingDao = { ...existingDao, ...treasuryObj };
    await this.daos.put(existingDao);
    return existingDao;
  }

  async getDaoDetails(daoID) {
    const dao = this.daos.get(daoID)[0];
    return dao;
  }

  async getFullDao(daoID) {
    const dao = this.daos.get(daoID)[0];
    dao.reviews = await this.reviews.query((doc) => doc.dao_id === daoID);
    dao.jobs = await this.jobs.query((doc) => doc.dao_id === daoID);
    return dao;
  }

  async getAllDaos() {
    const daos = this.daos.get('');
    return daos;
  }

  async upvoteDao(upvoteObj) {
    const existingDao = this.daos.get(upvoteObj.dao_id)[0];
    if (!existingDao) {
      throw new AppError(400, 'No Dao exists with that id');
    }
    const didUpvote = existingDao.upvoteUsers.find(
      (user) => user === upvoteObj.user
    );
    if (didUpvote) {
      throw new AppError(400, 'Already Upvoted');
    }

    existingDao.upvotes += 1;
    existingDao.upvoteUsers.push(upvoteObj.user);
    await this.daos.put(existingDao);
    return existingDao.upvotes;
  }

  // --------------------------------------
  // ---------DAO methods end -----------
  // --------------------------------------

  // --------------------------------------
  // ---------REVIEW methods start -----------
  // --------------------------------------
  async getDaoReviews(daoID) {
    const reviews = await this.reviews.query((doc) => doc.dao_id === daoID);
    return reviews;
  }

  async addReview(review) {
    const existingDao = await this.daos.query(
      (doc) => doc.id === review.dao_id
    );
    if (!existingDao.length) {
      throw new AppError(400, 'No Dao exists with that id');
    }

    const reviewObj = {
      id: uuidv4(),
      ...review,
      upvotes: 0,
      upvoteUsers: [],
      replies: [],
      time: new Date().toISOString(),
    };

    // below line will return a has. we can return that too.
    await this.reviews.put(reviewObj);
    return reviewObj;
  }

  async upvoteReview(upvoteObj) {
    const existingReview = this.reviews.get(upvoteObj.review_id)[0];
    if (!existingReview) {
      throw new AppError(400, 'No review exists with that id');
    }
    const didUpvote = existingReview.upvoteUsers.find(
      (user) => user === upvoteObj.user
    );
    if (didUpvote) {
      throw new AppError(400, 'Already Upvoted');
    }

    existingReview.upvotes += 1;
    existingReview.upvoteUsers.push(upvoteObj.user);
    await this.reviews.put(existingReview);
    return existingReview.upvotes;
  }

  async removeUpvote(reviewID) {
    const existingReview = this.reviews.get(reviewID)[0];
    if (!existingReview) {
      throw new AppError(400, 'No review exists with that id');
    }
    existingReview.upvotes -= 1;
    return await this.reviews.put(existingReview);
  }

  async reply(replyObj) {
    const existingReview = this.reviews.get(replyObj.review_id)[0];
    console.log('Daomodel, reply', existingReview);
    if (!existingReview) {
      throw new AppError(400, 'No review exists with that id');
    }

    replyObj = { id: uuidv4(), ...replyObj, time: new Date().toISOString() };
    existingReview.replies = [...existingReview.replies, { ...replyObj }];
    await this.reviews.put(existingReview);
    return replyObj;
  }

  // --------------------------------------
  // ---------REVIEW methods end -----------
  // --------------------------------------

  // --------------------------------------
  // ---------JOB methods start -----------
  // --------------------------------------

  async newJob(jobObj) {
    const existingDao = this.daos.get(jobObj.dao_id)[0];
    if (!existingDao) {
      throw new AppError(400, 'No Dao exists with that id');
    }

    let job = { id: uuidv4(), ...jobObj, open: true, appliedUsers: [] };
    await this.jobs.put(job);
    return job;
  }

  async getDaoJobs(daoID) {
    const existingDao = this.daos.get(daoID)[0];
    if (!existingDao) {
      throw new AppError(400, 'No Dao exists with that id');
    }

    const jobs = await this.jobs.query((doc) => doc.dao_id === daoID);
    return jobs;
  }

  async applyJob(jobID, user) {
    const existingJob = this.jobs.get(jobID)[0];
    if (!existingJob) {
      throw new AppError(400, 'No Job exists with that id');
    }
    if (!existingJob.open) {
      throw new AppError(400, 'This job is closed');
    }
    existingJob.appliedUsers.push(user);
    await this.jobs.put(existingJob);

    return existingJob.appliedUsers;
  }

  async getAllJobs() {
    const jobs = this.jobs.get('');
    return jobs;
  }

  // --------------------------------------
  // ---------JOB methods end -----------
  // --------------------------------------

  // --------------------------------------
  // ---------BLOG methods start -----------
  // --------------------------------------
  // id, name, banner, tags, description, text, publishedAt, length, user, upvotes
  async getAllBlogs() {
    const blogs = await this.blogs.get('');
    return blogs;
  }

  async getBlog(id) {
    const existingBlog = this.blogs.get(id)[0];
    if (!existingBlog) {
      throw new AppError(400, 'No blog exists with that id');
    }

    return existingBlog;
  }

  async newBlog(blogObj) {
    const existingBlog = await this.blogs.query(
      (doc) => doc.name === blogObj.name && doc.user === blogObj.user
    );

    if (existingBlog.length) {
      throw new AppError(
        400,
        'Blog with that name already exists in your blogs.'
      );
    }

    const blog = {
      id: uuidv4(),
      ...blogObj,
      publishedAt: new Date().toISOString(),
      upvotes: 0,
      upvoteUsers: [],
    };

    await this.blogs.put(blog);
    return blog;
  }

  async upvoteBlog(upvoteObj) {
    const existingBlog = this.blogs.get(upvoteObj.blog_id)[0];
    if (!existingBlog) {
      throw new AppError(400, 'No blog exists with that id');
    }
    const didUpvote = existingBlog.upvoteUsers.find(
      (user) => user === upvoteObj.user
    );

    if (didUpvote) {
      throw new AppError(400, 'Already Upvoted');
    }

    existingBlog.upvotes += 1;
    existingBlog.upvoteUsers.push(upvoteObj.user);
    await this.blogs.put(existingBlog);
    return existingBlog.upvotes;
  }
  // --------------------------------------
  // ---------BLOG methods end -----------
  // --------------------------------------
}

const DaoModel = new Dao(Ipfs, OrbitDB);

module.exports = DaoModel;
