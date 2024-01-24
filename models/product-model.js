const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String,  },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  colors: { type: [String], required: true },
  description: { type: String, required: true },
  featured: { type: Boolean, required: true },
  shipping: { type: Boolean, required: true },
  stock: { type: Number, required: true },
  reviews: { type: Number, required: true },
  stars: { type: Number, required: true },
  imageFiles: [{ url: String }],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
