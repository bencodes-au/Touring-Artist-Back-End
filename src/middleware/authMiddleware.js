const jwt = require("jsonwebtoken");

function authenticationToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    console.error("Authorization failed: No token provided");
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, "secret");
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Authorization failed: Invalid token", error.message);
    res.status(403).json({ error: "Invalid token" });
  }
}

module.exports = authenticationToken;
