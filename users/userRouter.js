const express = require('express');

const userDb = require('./userDb');
const postDb = require('../posts/postDb');
const { validateUserId, validateUser } = require('./userMiddleware');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  userDb.insert({ name: req.body.name })
    .then(user => res.status(201).json(user))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error creating a user." });
    });
});

router.post('/:id/posts', validateUserId, (req, res) => {
  postDb.insert({ text: req.body.text, user_id: req.params.id })
    .then(post => res.status(201).json(post))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error creating a post." });
    });
});

router.get('/', (req, res) => {
  userDb.get()
    .then(users => res.status(200).json(users))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error retrieving the users." });
    });
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {
  userDb.getUserPosts(req.user.id)
    .then(posts => res.status(200).json(posts))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error retrieving user posts." });
    });
});

router.delete('/:id', validateUserId, (req, res) => {
  userDb.remove(req.params.id)
    .then(updated => res.status(201).json(updated))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error deleting user." });
    });
});

router.put('/:id', validateUserId, (req, res) => {
  userDb.update(req.params.id, { ...req.body, name: req.body.name })
    .then(user => res.status(202).json(user))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error updating user." });
    });
});

module.exports = router;
