const express = require('express');
const { logger } = require('./middleware/index');

const server = express();
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

server.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use(express.json());

server.use(logger);

server.use('/users', userRouter);
server.use('/posts', postRouter);

module.exports = server;
