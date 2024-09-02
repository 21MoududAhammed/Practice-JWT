const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res
      .status(403)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const isMatchToken = await jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = verifyToken;
