const express = require('express');
const userDb = require('./users/userDb');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

const server = express();
const host = 'localhost';
const port = 3000;

const logger = (req, res, next) => {
  console.log("Method used: " + req.method);
  console.log("Request URL: " + req.url);
  console.log(new Date().toUTCString());

  next();
};

server.use(express.json());
server.use(logger);

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}/`);
}); 

module.exports = server;
