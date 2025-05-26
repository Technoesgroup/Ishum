import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../Style-CSS/MyProfile-css/Wishlist.css'
import { useAuth } from "../../ContextApiCart/LoginContextApi"; // or wherever your auth context is

const baseURL = import.meta.env.VITE_API_BASE_URL; // your backend base URL

function Whislist() {
  const { user, loadingUser } = useAuth(); // get logged-in user info
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) {
      setLoading(false);
      return;
    }

    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${baseURL}/api/wishlist/user/${user._id}`);
        setWishlist(res.data.wishlist || []); // adjust depending on your API response
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [user]);

  if (loadingUser) return <p>Loading user...</p>;
  if (!user) return <p>Please login to see your wishlist.</p>;

  return (
    <div className="wishlist-page">
      <h2>My Wishlist</h2>
      {loading ? (
        <p>Loading wishlist...</p>
      ) : wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ul>
          {wishlist.map((item) => (
            <li key={item._id}>
              <img
                src={`${baseURL}/uploads/${item.productId.image}`}
                alt={item.productId.name}
                width={80}
              />
              <div>
                <h4>{item.productId.name}</h4>
                <p>Price: ₹{item.productId.price}</p>
                {/* Add more product details here */}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Whislist;

