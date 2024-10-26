/** @format */

// A component that displays a list of the products offered by the store. It allows normal users to order more stock. Admins are allowed to set thresholds and add, update or remove products
import React, { useState, useEffect } from 'react';
import './Products.css';
import ErrorPage from '../ErrorPage/ErrorPage';
import Header from '../Header/Header';

const ProductList = () => {
  // Retrieving the user's JWT and admin status from localStorage
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin');

  // State variable for the quantity to order for a product
  const [orderQuantity, setOrderQuantity] = useState({});

  // State variable for the list of products to show
  const [products, setProducts] = useState([]);
  // State variable for a new product to be added
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    inStock: Number(''),
    threshold: Number(''),
  });
  // State variable for the editing of a product
  const [editMode, setEditMode] = useState(null);

  // Fetches the list of products from the backend to display them as the component mounts
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  // Function to handle the inputs an admin makes when adding a new product
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Function to handle the changing of an order quantity by a normal user
  const handleOrderQuantityChange = (e, id) => {
    const { value } = e.target;
    setOrderQuantity((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // The root URL that API calls will be made to
  const API_URL = 'http://localhost:8000/products';

  // Function to add a product
  const addProduct = () => {
    // First checking if the product does not already exist
    if (!newProduct.name || !newProduct.price) return;

    // Performs a POST request, with the object's data to the backend and stores it in the database
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts((prev) => [...prev, data]);
        setNewProduct({
          name: '',
          price: '',
          image: '',
          description: '',
          inStock: Number(''),
          threshold: Number(''),
        });
      })
      .catch((error) => {
        console.error('Error adding product:', error);
      });
  };

  // Function to delete a product
  const deleteProduct = (id) => {
    // Makes an API call to the backend to remove a product from the database and UI whose ._id matches the id of the product being removed
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setProducts((prev) => prev.filter((product) => product._id !== id));
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };

  // Starts the process for editing a product
  const startEditProduct = (product) => {
    setEditMode(product);
    setNewProduct(product);
  };

  // If editMode is not enabled, prevents the product from being edited
  const editProduct = () => {
    if (!editMode) return;

    // Makes an API call to the backend to find the product with a matching ._id field and updates it with the data contained in the newProduct object
    fetch(`${API_URL}/${editMode._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts((prev) =>
          prev.map((product) => (product._id === editMode._id ? data : product))
        );
        setEditMode(null);
        setNewProduct({
          name: '',
          price: '',
          image: '',
          description: '',
          inStock: Number(''),
          threshold: Number(''),
        });
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  };

  // A function for a normal user to place an order for more stock
  const placeOrder = (id) => {
    // Ensures that the quantity the user tries to order does not equal 0 or a negative number
    if (!orderQuantity[id] || orderQuantity[id] <= 0) {
      alert('Please enter a valid order quantity.');
      return;
    }

    // Finds a product in the database
    const product = products.find((product) => product._id === id);

    // Testing to ensure the numbers are correct
    console.log(orderQuantity[id]);
    console.log(Number(product.inStock + Number(product.threshold)));

    // Prevents the user from ordering a product if the threshold is exceeded
    if (
      Number(orderQuantity[id]) + Number(product.inStock) >
      product.threshold
    ) {
      alert('You may not order more than the threshold.');
      return;
    }

    // orders new stock only if ordering more will not result in having more on hand than the threshold
    fetch(`${API_URL}/${id}/order-stock`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity: parseInt(orderQuantity[id], 10) }),
    })
      .then((response) => response.json())
      .then((updatedProduct) => {
        // Update the product's inStock value after the order is placed
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === updatedProduct._id ? updatedProduct : product
          )
        );
        setOrderQuantity((prev) => ({ ...prev, [id]: '' })); //Clear the order quantity for that product
      })
      .catch((error) => {
        console.error('Error placing order:', error);
      });
  };

  return (
    <div>
      {token ? (
        <div>
          <Header />
          {isAdmin === 'true' ? ( // Ensure isAdmin is checked as a string
            <div className='product-container'>
              {products.map((product) => (
                <div key={product._id} className='productCard'>
                  <img
                    src={product.image}
                    alt={product.name}
                    className='productImage'
                  />
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p className='productPrice'>R{product.price}</p>
                  <div className='orderCounter'>
                    <h4 className='inStockCounter'>
                      In stock: {product.inStock}
                    </h4>
                    <h4 className='thresholdCounter'>
                      Threshold: {product.threshold}
                    </h4>
                  </div>
                  <button
                    className='productButton'
                    onClick={() => deleteProduct(product._id)}>
                    Delete
                  </button>
                  <button
                    className='productButton'
                    onClick={() => startEditProduct(product)}>
                    Edit
                  </button>
                </div>
              ))}
              <div className='addProductForm'>
                <input
                  type='text'
                  name='name'
                  placeholder='Product Name'
                  value={newProduct.name}
                  onChange={handleInputChange}
                />
                <input
                  type='text'
                  name='price'
                  placeholder='Price'
                  value={newProduct.price}
                  onChange={handleInputChange}
                />
                <input
                  type='text'
                  name='image'
                  placeholder='Image URL'
                  value={newProduct.image}
                  onChange={handleInputChange}
                />
                <textarea
                  name='description'
                  placeholder='Description'
                  value={newProduct.description}
                  onChange={handleInputChange}
                />
                <input
                  type='number'
                  name='threshold'
                  placeholder='What must the threshold be?'
                  value={newProduct.threshold}
                  onChange={handleInputChange}
                />
                {editMode ? (
                  <button onClick={editProduct}>Update Product</button>
                ) : (
                  <button onClick={addProduct}>Add Product</button>
                )}
              </div>
            </div>
          ) : (
            <div className='product-container'>
              {products.map((product) => (
                <div key={product._id} className='productCard'>
                  <img
                    src={product.image}
                    alt={product.name}
                    className='productImage'
                  />
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p className='productPrice'>R{product.price}</p>
                  <div className='orderCounter'>
                    <h4 className='inStockCounter'>
                      In stock: {product.inStock}
                    </h4>
                    <h4 className='thresholdCounter'>
                      Threshold: {product.threshold}
                    </h4>
                  </div>
                  <div className='order-more-pane'>
                    <input
                      type='number'
                      placeholder='How much more to order?'
                      value={orderQuantity[product._id] || ''}
                      onChange={(e) =>
                        handleOrderQuantityChange(e, product._id)
                      }
                    />
                    <button onClick={() => placeOrder(product._id)}>
                      Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <ErrorPage message='You must be signed in to view this page.' />
        </div>
      )}
    </div>
  );
};

export default ProductList;
