/** @format */

const Product = require('../models/Product');

// Function that facilitates the retrieval of products to display them
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ message: 'Server error. Failed to fetch products.' });
  }
};

// Function that facilitates the retrieval of a single product if need be
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error. Failed to fetch product.' });
  }
};

// Function that facilitates the adding of a new product
const addProducts = async (req, res) => {
  // Receives user input
  const { name, price, image, description, inStock, threshold } = req.body;

  // First tries to create a new product object containing this data
  try {
    const newProduct = new Product({
      name,
      price,
      image,
      description,
      inStock,
      threshold,
    });

    // And tries to save it
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error.message);
    // Handling validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res
        .status(400)
        .json({ message: 'Validation Error', errors: messages });
    }
    res
      .status(500)
      .json({ message: 'Server error. Failed to create product.' });
  }
};

// A function that facilitates the editing of a product's information
const editProduct = async (req, res) => {
  // Retrieves the current information
  const { name, price, image, description, inStock, threshold } = req.body;

  // Then tries to find this product in the database and if it exists, updates it
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Updating the product fields
    product.name = name !== undefined ? name : product.name;
    product.price = price !== undefined ? price : product.price;
    product.image = image !== undefined ? image : product.image;
    product.description =
      description !== undefined ? description : product.description;
    product.inStock = inStock != undefined ? inStock : product.inStock;
    product.threshold = threshold !== undefined ? threshold : product.threshold;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error(error.message);
    // Handling validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res
        .status(400)
        .json({ message: 'Validation Error', errors: messages });
    }
    res
      .status(500)
      .json({ message: 'Server error. Failed to update product.' });
  }
};

const orderStock = async (req, res) => {
  // They set the quantity on the frontend and it gets sent here via an API call
  const quantity = req.body.quantity;
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    // Adds the quantity to the product's stock capacity
    product.inStock += quantity;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error. Failed to update stock.' });
  }
};

// A function that facilitates the removal of a product by an admin
const removeProduct = async (req, res) => {
  // Finds the product by its id, then deletes it
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ message: 'Server error. Failed to delete product.' });
  }
};

module.exports = {
  getProducts,
  getProduct,
  addProducts,
  editProduct,
  orderStock,
  removeProduct,
};
