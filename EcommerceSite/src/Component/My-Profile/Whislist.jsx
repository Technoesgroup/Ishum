import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../Style-CSS/MyProfile-css/Wishlist.css';
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
      const res = await axios.get(`${baseURL}/api/wishlist/${user._id}`);

      console.log("Full wishlist API response:", res.data);
     console.log("Fetched wishlist items:", res.data.wishlist.items);


if (res.data.wishlist && Array.isArray(res.data.wishlist)) {
  setWishlist(res.data.wishlist);
} else {
  setWishlist([]);
}


    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setWishlist([]); 
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
      ) : !Array.isArray(wishlist) || wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
      <ul>
  {wishlist.map(item => (
    <li key={item._id}>
      <img
        src={`${baseURL}/uploads/${item.productId?.image}`}
        alt={item.productId?.name}
        width={80}
      />
      <div>
        <h4>{item.productId?.name}</h4>
        <p>Price: ₹{item.productId?.price}</p>
      </div>
    </li>
  ))}
</ul>

      )}
    </div>
  );
}

export default Whislist;

