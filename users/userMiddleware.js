const userDb = require('./userDb');

const validateUserId = (req, res, next) => {
    userDb.getById(req.params.id)
        .then(user => {
            if (user) {
                req.user = user;
                next();
            } else {
                res.status(404).json({ message: "User with that ID not found." });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Error retrieving the user." });
        });
};

const validateUser = (req, res, next) => {
    const { name } = req.body;
  
    if (name) {
      next();
    } else {
      res.status(400).json({ message: "User requires a name." });
    };
  };

module.exports = {
    validateUserId,
    validateUser
};