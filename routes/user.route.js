const express = require("express");
const userModel = require("../models/user.model");
const verifyToken = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({ message: "Success", users: users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Server side error: ${err?.message}` });
  }
});

module.exports = router;
