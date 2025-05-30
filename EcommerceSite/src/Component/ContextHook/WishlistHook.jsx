import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../ContextApiCart/LoginContextApi";
import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user, loadingUser } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

  const fetchWishlist = async () => {
    if (!user?._id) return;
    try {
      const res = await axios.get(`${baseURL}/api/wishlist/${user._id}`);


      const fetched = res.data.wishlist;

      if (Array.isArray(fetched)) {
        setWishlist(fetched);
      } else if (fetched) {
        setWishlist([fetched]); // wrap single object
      } else {
        setWishlist([]);
      }
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
    }
  };

  const addToWishlist = async (product) => {
    if (loadingUser) {
      toast.info("Please wait, loading your ID...");
      return;
    }

    if (!user?._id) {
      toast.error("Please login to add to your wishlist.");
      return;
    }

    try {
      await axios.post(`${baseURL}/api/wishlist/add`, {
        userId: user._id,
        productId: product._id,
      });

      toast.success("Added to wishlist!");
      fetchWishlist(); // refresh list
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.info("Already in wishlist");
      } else {
        toast.error("Error adding to wishlist");
        console.error("Wishlist error:", error);
      }
    }
  };

const removeFromWishlist = async (productId) => {
  if (!user?._id) {
    toast.error("Please login to remove from wishlist.");
    return;
  }

  try {
    await axios.delete(`${baseURL}/api/wishlist/remove/${user._id}/${productId}`);

    toast.success("Removed from wishlist!");
    fetchWishlist(); // refresh list
  } catch (error) {
    toast.error("Error removing from wishlist");
    console.error("Wishlist remove error:", error);
  }
};


const toggleWishlist = (product) => {
  const exists = wishlist.some((item) => item.productId === product._id);

  if (exists) {
    removeFromWishlist(product._id);
  } else {
    addToWishlist(product);
  }
};


  useEffect(() => {
    fetchWishlist();
  }, [user?._id]);

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);

