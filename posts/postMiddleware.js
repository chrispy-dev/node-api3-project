const postDb = require('./postDb');

const validatePostId = (req, res, next) => {
    postDb.getById(req.params.id)
        .then(post => {
            if (post) {
                req.post = post;
                next();
            } else {
                res.status(404).json({ message: "Post with that ID not found." });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Error when retrieving post." });
        })
};

module.exports = validatePostId;