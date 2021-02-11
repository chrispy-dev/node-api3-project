const { getById } = require('../users/userDb');
const { getPostById } = require('../posts/postDb');

const logger = (req, res, next) => {
    console.log(`Request Method: ${req.method}`);
    console.log(`Request URL: ${req.url}`);
    console.log(`Timestamp: ${new Date().toUTCString()}`);
    next();
};

const validateUserId = (req, res, next) => {
    const { id } = req.params;
    getById(id)
        .then(user => {
            if (user) {
                req.user = user;
                next();
            } else {
                res.status(404).json({ message: "Cannot find user with that ID." });
            };
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: err });
        })
};

const validatePostId = (req, res, next) => {
    const { id } = req.params;

    getPostById(id)
        .then(post => {
            if (post) {
                req.post = post;
                next();
            } else {
                res.status(404).json({ message: "Cannot find post with that ID." });
            };
        });
};

const validateUser = (req, res, next) => {
    const { name } = req.body;

    if (req.body) {
        if (name) {
            next();
        } else {
            res.status(400).json({ message: "Missing required name field." });
        };
    } else {
        res.status(400).json({ message: "Missing user data." });
    };
};

const validatePost = (req, res, next) => {
    const { text } = req.body;

    if (req.body) {
        if (text) {
            next();
        } else {
            res.status(400).json({ message: "Missing required text field." });
        };
    } else {
        res.status(400).json({ message: "Missing post data." });
    };
};

module.exports = {
    logger,
    validateUserId,
    validateUser,
    validatePost,
    validatePostId
};