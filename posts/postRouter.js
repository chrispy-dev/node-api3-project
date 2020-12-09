const express = require('express');

const postDb = require('./postDb');
const validatePostId = require('./postMiddleware');

const router = express.Router();

router.get('/', (req, res) => {
  postDb.get()
    .then(posts => res.status(200).json(posts))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error retrieving posts." });
    });
});

router.get('/:id', validatePostId, (req, res) => {
  res.status(200).json(req.post);
});

router.delete('/:id', validatePostId, (req, res) => {
  postDb.remove(req.params.id)
    .then(removed => res.status(201).json(removed))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error removing post." });
    });
});

router.put('/:id', validatePostId, (req, res) => {
  postDb.update(req.params.id, { ...req.body, text: req.body.text })
    .then(updated => res.status(202).json(updated))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error when updating post." });
    });
});

module.exports = router;
