const express = require("express");
const router = express.Router();
const userModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// to register
router.post("/register", async (req, res) => {
  const { name, userName, password } = req.body;
  try {
    // make password hashed
    const hashPassword = await bcrypt.hash(password, 10);
    // create a user
    const result = await userModel.create({
      name,
      userName,
      password: hashPassword,
    });
    //  destructure to ignore password to send
    const { password: _, ...others } = result.toObject();

    return res
      .status(201)
      .json({ message: "Successfully create one user", data: others });
  } catch (err) {
    console.log(err);
    res.status(501).json({ message: "Server side error", error: err?.message });
  }
});

// to login
router.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await userModel.findOne({ userName: userName });
    const { name } = user;

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(401).json({ message: "Authentication Failed." });
    }

    const token = jwt.sign({ userName, name }, process.env.JWT_PRIVATE_KEY);

    res
      .status(200)
      .json({ message: "Logged in successfully", jwt_token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Server side error: ${err?.message}` });
  }
});

module.exports = router;
