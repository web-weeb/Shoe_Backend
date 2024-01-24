const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;


const productRouter = express.Router();


const productController = require("../controllers/product-controller");

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Product routes
productRouter.post(
  "/addProduct",
  upload.array("imageFiles", 5),
  productController.createProduct
);
productRouter.get("/getAllProducts", productController.getAllProducts);

module.exports = productRouter;
