const express = require('express');
const { validateUserId, validateUser, validatePost } = require('../middleware/index');
const { get, getUserPosts, insert, remove, update } = require('./userDb');
const { postInsert } = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  insert(req.body)
    .then(user => res.status(201).json(user))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: err });
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  console.log(req.user)

  postInsert({ text: req.body.text, user_id: req.user.id})
    .then(post => res.status(200).json(post))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: err });
    });
});

router.get('/', (req, res) => {
  get()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ message: err }));
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {
  getUserPosts(req.user.id)
    .then(posts => res.status(200).json(posts))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: err });
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  remove(req.user.id)
    .then(id => res.status(201).json(id))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: err });
    });
});

router.put('/:id', validateUserId, (req, res) => {
  update(req.user.id, req.body)
    .then(updated => res.status(202).json(updated))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: err });
    });
});

module.exports = router;
