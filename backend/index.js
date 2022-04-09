const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorController = require('./controllers/errorController');
const DaoModel = require('./models/daoModel');
const daoRoutes = require('./routes/daoRoutes');

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

app.use(errorController);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App up and running at port ${PORT} 👟️👟️`);
});
