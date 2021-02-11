const express = require('express');
const { get, getPostById, remove, update } = require('./postDb');
const { validatePostId } = require('../middleware/index');

const router = express.Router();

router.get('/', (req, res) => {
  get()
    .then(posts => res.status(200).json(posts))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: err });
    });
});

router.get('/:id', validatePostId, (req, res) => {
  res.status(200).json(req.post);
});

router.delete('/:id', validatePostId, (req, res) => {
  remove(req.post.id)
    .then(deleted => res.status(202).json(deleted))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: err });
    });
});

router.put('/:id', validatePostId, (req, res) => {
  update(req.post.id, req.body)
    .then(updated => res.status(201).json(updated))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: err });
    });
});

module.exports = router;
