import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../CSS/ManageProduct.css';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/products/delete/${id}`);
      const updated = products.filter((p) => p._id !== id);
      setProducts(updated);
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Failed to remove product");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/products/get-product');
        setProducts(res.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="M-product-container">
      <h2>Product List</h2>
      {products.map((product) => (
        <div key={product._id} className="product-row">
          <img src={`http://localhost:4000/uploads/${product.image}`} alt="product" className="product-image" />
          <p className="product-price">₹{product.price}</p>
          <button className="remove-button" onClick={() => handleRemove(product._id)}>Remove</button>
          <button className="edit-button" onClick={() => handleEdit(product._id)}>Edit</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
