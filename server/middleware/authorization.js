const User = require("./../models/User");

const authorization = (req, res, next) => {
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
      res.status(401).send();
    });
};

module.exports = authorization;
