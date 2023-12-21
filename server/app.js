require('dotenv').config();
require('@babel/register');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const dbConnectCheck = require('./src/lib/middlewares/dbConnectCheck');

const { PORT } = process.env || 3001;
const userRoutes = require('./src/routes/userRoutes');
// const newsRoutes = require('./src/routes/newsRoutes');

dbConnectCheck();

app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Authorization,Origin,X-Requested-With,Content-Type,Accept',
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/user', userRoutes);
// app.use('/news', newsRoutes);

app.get('*', (req, res) => {
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log('\x1b[33mСервер Успешно подключён!!!! \x1b[0m');
});
