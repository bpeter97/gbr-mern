const jwt_decode = require("jwt-decode");

const isAdmin = (req, res, next) => {
  let errors = {
    auth: "Admin access is required"
  };
  let token = req.header("authorization");

  const user = jwt_decode(token);

  user.type == "Admin" ? next() : res.status(401).json(errors);
};

module.exports = isAdmin;
