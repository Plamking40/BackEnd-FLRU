const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(403).send("please you login");

  const token = authorization.split(" ")[1];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send({
      status: 401,
      message: "Authentication failed",
    });
  }
  return next();
};

module.exports = verifyToken;
