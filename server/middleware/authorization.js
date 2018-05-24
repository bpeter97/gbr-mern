const User = require("./../models/User");

const authorization = (req, res, next) => {
  let errors = {};
  let token = req.header("authorization");

  User.findByToken(token)
    .then(user => {
      if (!user) {
        return Promise.reject();
      }

      req.user = user;
      req.token = token;
      next();
    })
    .catch(e => {
      errors.auth = "Authorization failed";
      res.status(401).json(errors);
    });
};

module.exports = authorization;
