const express = require("express");
const productsModel = require("../models/products.model");
const verifyToken = require("../middlewares/auth.middleware");
const mongoose = require("mongoose");

const router = express.Router();

// post a product
router.post("/", verifyToken, async (req, res) => {
  try {
    const { name, brand, category, price, quantity } = req.body;
    const product = {
      name,
      brand,
      category,
      price,
      quantity,
      createdBy: req.id,
    };
    const result = await productsModel.create(product);
    res.status(201).json({ message: "success", data: result });
  } catch (err) {
    res.status(500).json({ message: `Server side error: ${err?.message}` });
  }
});

// get all products
router.get("/", verifyToken, async (req, res) => {
  try {
    const products = await productsModel.find();
    res.status(200).json({ message: "Success", data: products });
  } catch (err) {
    res.status(500).json({ message: ` Server side error: ${err?.message}` });
  }
});

// get a product by id
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsModel.findOne({ _id: id });
    if (!product) {
      return res.status(404).json({ message: "Not Found" });
    }
    res.status(201).json({ message: "Success", data: product });
  } catch (err) {
    res.status(500).json({ message: `Server side error: ${err?.message}` });
  }
});

// delete a product by id
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid id format." });
    }
    const result = await productsModel.findByIdAndDelete({ _id: id });
    if (!result) {
      return res.status(404).json({ message: "Product not found!" });
    }
    res.status(200).json({ message: "Deleted Successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Server side error: ${err?.message}` });
  }
});


module.exports = router;
