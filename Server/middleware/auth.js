const jwt = require("jsonwebtoken");

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    // console.log(user);
    req.body.user_id = user.userId;
    // console.log(req);
    req.body.role = user.role;
    next();
  });
};

exports.isAdmin = (req, res, next) => {
  // console.log(req.body);
  if (req.body.role !== "admin") {
    // console.log("admin");
    return res.sendStatus(403);
  }
  next();
};

exports.verifyApiKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (apiKey !== process.env.ADMIN_API_KEY) {
    // console.log("verify");
    return res.sendStatus(403);
  }
  next();
};
