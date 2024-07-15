const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;

exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
      role,
    });
    res
      .status(201)
      .json({ message: "User registered successfully", user_id: user.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        status: "Incorrect username/password provided. Please retry",
        status_code: 401,
      });
    }
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({
      status: "Login successful",
      status_code: 200,
      user_id: user.id,
      access_token: token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
