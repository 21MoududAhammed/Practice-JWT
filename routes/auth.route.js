const express = require("express");
const router = express.Router();
const userModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");

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
    res.status(501).json({message: 'Server side error', error: err?.message})
  }
});

// to login 
router.post("/login", async(req, res)=>{
    
})

module.exports = router;
