/** @format */

// Routing for the backend of the application that has been made modular for simplicity's sake
const express = require('express');
const router = express.Router();

const {
  getProducts,
  getProduct,
  addProducts,
  editProduct,
  orderStock,
  removeProduct,
} = require('../controllers/productController');

// Route for retrieving products to display them on the UI of the frontend
router.get('/', async (req, res) => {
  await getProducts(req, res);
});

// Route for retrieving a single product if need be
router.get('/:id', async (req, res) => {
  await getProduct(req, res);
});

// Route for adding a product
router.post('/', async (req, res) => {
  await addProducts(req, res);
});

// Route for editing a product's information
router.put('/:id', async (req, res) => {
  await editProduct(req, res);
});

// Route for acquiring stock when a normal user places an order
router.put('/:id/order-stock', async (req, res) => {
  await orderStock(req, res);
});

// Route for deleting a product
router.delete('/:id', async (req, res) => {
  await removeProduct(req, res);
});

module.exports = router;
