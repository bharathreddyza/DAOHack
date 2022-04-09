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
}

const DaoModel = new Dao(Ipfs, OrbitDB);

module.exports = DaoModel;
