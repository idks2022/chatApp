const jwt = require("jsonwebtoken");

const genereateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "10h",
  });
};

module.exports = genereateToken;
