import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);

  // ✅ Load userId from localStorage on first render
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        if (parsedUser._id) {
          setUserId(parsedUser._id);
        }
      } catch (err) {
        console.error("Error parsing user data from localStorage:", err);
      }
    }
  }, []);

  const fetchCart = async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`http://localhost:4000/api/cart/${userId}`);
      setCartItems(res.data.cartItems || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchCart();
    }
  }, [userId]);

  const updateUserId = (newUserId) => {
    setUserId(newUserId);
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, fetchCart, userId, updateUserId }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

