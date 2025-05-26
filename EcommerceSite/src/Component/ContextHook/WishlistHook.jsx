import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../ContextApiCart/LoginContextApi";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const useWishlist = () => {
  const { user, loadingUser } = useAuth();

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
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.info("Already in wishlist");
      } else {
        toast.error("Error adding to wishlist");
        console.error("Wishlist error:", error);
      }
    }
  };

  return { addToWishlist };
};