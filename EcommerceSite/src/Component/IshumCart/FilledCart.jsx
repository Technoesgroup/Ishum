import React, { useState, useEffect } from "react";
import "../../Style-CSS/IshumCart-css/FilledCart.css";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EmptyCart from './EmptyCart';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useCart } from "../../ContextApiCart/CartContextApi";
import Loader from "../../Pages/LoaderFullpage";


const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

const CartItem = ({ id, image, title, price, size, color, quantity, onIncrease, onDecrease, onRemove }) => (

  
  <div className="Cartitem-cart-item">
    <img    loading="lazy" src={`${baseURL}/uploads/${image}`}  alt={title} />
    <div className="Cartitem-cart-item-details">
      <div className="Cartitem-details-tile-price">
        <h2>{title}</h2>
        <p className="ishum-Price-cart">Rs. {price}</p>
        <p className="Tax-include">Tax included. Shipping Calculated at Checkout.</p>
      </div>
      <div className="SizeCartItem-plus-minus-Icons">
        <div className="SizeCartItem">
          <p className="Ishum-Size-paragraph">Size: {size} | Color: {color}</p>
        </div>
        <div className="Cartitem-quantity-control">
          <RemoveOutlinedIcon className="Cartitem-cursor-pointer" onClick={onDecrease} />
          <span>{quantity}</span>
          <AddOutlinedIcon className="Cartitem-cursor-pointer" onClick={onIncrease} />
        </div>
      </div>
    </div>
    <div className="Cart-Check-box">
      <input type="checkbox" />
      <button className="Cartproduct-remove-button" onClick={onRemove}><DeleteForeverIcon className="Cart-deleteicon" /></button>
    </div>
  </div>
);

const Cartitem = () => {
  const navigate = useNavigate();
  const { userId } = useCart();
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


  const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

  console.log("User ID from Context:", userId);

  useEffect(() => {
    if (!userId) return; // If userId is not available, don't fetch cart

    const fetchCart = async () => {
      try {
        const res =  await axios.get(`${baseURL}/api/cart/${userId}`);
        console.log("Backend Cart Data:", res.data);
        setCartItems(res.data.cartItems || []); // Ensure cartItems are updated properly
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchSimilarProducts = async () => {
      try {
        const res =await axios.get(`${baseURL}/api/products/get-product`);
        setProducts(res.data.products.slice(0, 3));
      } catch (err) {
        console.error("Error fetching similar products:", err);
      }
    };

    fetchCart();
    fetchSimilarProducts();
  }, [userId]); // Add userId as dependency, so whenever it changes, data is fetched again

  const handleAddToCart = async (product) => {
    try {
      const res = await axios.post(`${baseURL}/api/cart`, {
        userId,
        productId: product._id,
        quantity: 1,
        size: product.size[0],
        color: product.color,
      });
      setCartItems(res.data.cartItems);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`${baseURL}/api/cart/${userId}/${id}`)
      setCartItems((prev) => prev.filter(item => item.productId.toString() !== id));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const handleIncrease = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  if (loading) return <Loader />;

  if (cartItems.length === 0) return <EmptyCart />;

  return (
    <div className="Cartitem-cart-container">
      <div className="Cartitem-cart-items">
        {cartItems.map((item) => (
          <CartItem
            key={item._id}
            id={item.productId}
            image={item.image}
            title={item.title}
            price={item.price}
            size={item.size}
            color={item.color}
            quantity={item.quantity}
            onIncrease={() => handleIncrease(item._id)}
            onDecrease={() => handleDecrease(item._id)}
            onRemove={() => handleRemove(item.productId)}
          />
        ))}
      </div>

      <div className="Cartitem-order-summary">
        <div className="TotalAmount-Content">
          <div className="ProductPrice-Content"><p>Product price</p> <p>{totalPrice}</p></div>
          <div className="ProductPrice-Content"><p>Total Items:</p><p>{totalItems}</p></div>
          <div className="ProductPrice-Content"><p>Subtotal</p><p>Rs. {totalPrice.toFixed(2)}</p></div>
          <button className="Proceed-Checkout" onClick={() => navigate("/Shipping")}>Proceed to Checkout</button>
        </div>

        <div>
          <h3 className="SimilarProduct-text">Similar Product<ChevronRightIcon /></h3>
          <div className="SimilarItems-products-grid">
            {products.map((product) => (
              <div key={product._id} className="SimilarItems-product-card">
                <img src={`${baseURL}/uploads/${product.image}`} alt={product.name} className="SimilarItems-product-image" />
                <div className="SimilarItems-product-details">
                  <h3 className="SimilarItems-product-name">{product.name}</h3>
                  <div className="Original-Discount-Price">
                    <p className="SimilarItems-product-original-price">₹{product.discount}</p>
                    <p className="SimilarItems-product-price">₹{product.price}</p>
                    <p className="Discount-off">₹{product.discount - product.price} OFF</p>
                  </div>
                  <div className="LocalMall-Buy-Now-button">
                    <LocalMallIcon className="LocalMallIcon" />
                    <button className="SimilarItems-buy-button" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cartitem;

