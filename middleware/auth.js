const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // Get token from request header
  const token = req.header("x-auth-token");

  //   Check if token is present
  if (!token) {
    return res.status(401).json({ msg: "Authorization denied" });
  }
  //   Verify the token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    // We can use req.user in any of our protected routes, once we verify our user
    req.user = decoded.user;
    next();
  } catch (err) {
    // console.log(err.message);
    return res
      .status(401)
      .json({ msg: "Token validation failed, authorization denied" });
  }
};
