require('dotenv').config(); 
require('@babel/register');
const cors = require('cors');
const morgan = require('morgan'); 
const express = require('express'); 
const path = require('path');
const app = express(); 

const session = require('express-session');
const FileStore = require('session-file-store')(session);
const dbConnectCheck = require('../server/db/dbConnectCheck');
const { PORT } = process.env || 3001;
const userRouter = require('./src/routes/userRouter')
dbConnectCheck();

app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true }
));

const sessionConfig = {
  name: 'Cookie',
  store: new FileStore(),
  secret: process.env.SESSION_SECRET ?? 'Секретное слово',
  resave: false, 
  saveUninitialized: false, 
  cookie: {
    maxAge: 9999999, 
    httpOnly: true,
  },
};



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(session(sessionConfig));
app.use('/user', userRouter)



app.listen(PORT, () => {
  console.log('\x1b[33mСервер Успешно подключён!!!! \x1b[0m' ); 
});

