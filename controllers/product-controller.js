const cloudinary = require("cloudinary").v2;
const Product = require("../models/product-model");

// Configure Cloudinary (replace with your cloudinary details)
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

const fs = require("fs");
const path = require("path");

const uploadImagesToCloudinary = async (imageFiles) => {
  const uploadPromises = imageFiles.map((file, index) => {
    const tempPath = path.join(
      __dirname,
      `temp${index}${path.extname(file.originalname)}`
    );
    fs.writeFileSync(tempPath, file.buffer);
    return cloudinary.uploader.upload(tempPath);
  });

  return Promise.all(uploadPromises);
};

// Controller to handle product creation
const createProduct = async (req, res) => {
  try {
    const { name, title, category, price, colors, description, featured, shipping, stock, reviews, stars } = req.body;

    const imageFiles = req.files || [];

    const cloudinaryResponses = await uploadImagesToCloudinary(imageFiles);

    const imageUrls = cloudinaryResponses.map((response) => ({
      url: response.secure_url,
    }));

    const newProduct = new Product({
      name,
      title,
      category,
      price,
      colors: colors
        .replace(/[\[\]"]/g, "")
        .split(",")
        .map((color) => color.trim()),
      description,
      featured,
      shipping,
      stock,
      reviews,
      stars,
      imageFiles: imageUrls,
    });

    const savedProduct = await newProduct.save();

    res.json(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// controller to get all products

const getAllProducts = async (req, res) => {
  try {
    const { id } = req.query;

    if (id) {
      const product = await Product.findById(id);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      return res.json(product);
    }

    // Fetch all products if no id is provided
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {createProduct, getAllProducts};
