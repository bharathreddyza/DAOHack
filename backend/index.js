const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorController = require('./controllers/errorController');
const DaoModel = require('./models/daoModel');
const daoRoutes = require('./routes/daoRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const jobRoutes = require('./routes/jobRoutes');
const blogRoutes = require('./routes/blogRoutes');
require('./utils/cronJobs');

DaoModel.create()
  .then(async () => {
    console.log('IPFS connected 📑️📑️');
  })
  .catch((err) => {
    console.log('IPFS error : ', err);
  });

const app = express();

app.use(cors());
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/dao', daoRoutes);

app.use('/api/review', reviewRoutes);

app.use('/api/jobs', jobRoutes);

app.use('/api/blog', blogRoutes);

app.use(errorController);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`App up and running at port ${PORT} 👟️👟️`);
});
