import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);

  const baseURL = import.meta.env.VITE_API_BASE_URL;

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

  // console.log("CartItems:", cartItems);


  const fetchCart = async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`${baseURL}/api/cart/${userId}`);
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

