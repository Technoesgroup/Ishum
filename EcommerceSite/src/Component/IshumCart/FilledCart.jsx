import React, { useState } from "react";
import "../../Style-CSS/IshumCart-css/FilledCart.css";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import img1 from '../../images/b7c0458edce18027db5028842fd3cc17.png'
import img2 from '../../images/b7c0458edce18027db5028842fd3cc17.png'
import img3 from '../../images/b7c0458edce18027db5028842fd3cc17.png'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from "react-router-dom";




const initialProducts = [
  {
    id: 1,
    name: "VIBRANT VELVET YELLOW CHOGA",
    price: 1990,
    originalPrice: 2990,
    discount: "50% OFF",
    image: img1,
  },
  {
    id: 2,
    name: "VIBRANT VELVET YELLOW CHOGA",
    price: 1990,
    originalPrice: 2990,
    discount: "50% OFF",
    image: img2,
  },
  {
    id: 3,
    name: "VIBRANT VELVET YELLOW CHOGA",
    price: 1990,
    originalPrice: 2990,
    discount: "50% OFF",
    image: img3,
  },
];

const CartItem = ({ image, title, price, size, color, quantity, onIncrease, onDecrease }) => {

  return (
    <div className="Cartitem-cart-item">
      <img src={image} alt={title} />
      <div className="Cartitem-cart-item-details">
        <div  className="Cartitem-details-tile-price">
          <h2>{title}</h2>
          <p>Rs. {price}</p>
           <p className="Tax-include">Tax included. Shipping Calculated at Checkout.</p>
        </div>

   <div className="SizeCartItem-plus-minus-Icons">
   <div className="SizeCartItem">   <p>Size: {size} | Color: {color}</p></div>
        <div className="Cartitem-quantity-control">
        <RemoveOutlinedIcon className="Cartitem-cursor-pointer" onClick={onDecrease} />
       
          <span>{quantity}</span>
          <AddOutlinedIcon className="Cartitem-cursor-pointer" onClick={onIncrease} />
        </div>
   </div>


    </div>
    <div className="Cart-Check-box"><input type="checkbox" /></div>
</div>
  );
};

const Cartitem = () => {

  const [products, setProducts] = useState(initialProducts);
  const navigate = useNavigate();


  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image: img1,
      title: "Gulzaar - Dark Purple Multicolor Printed Velvet Suit Set",
      price: 12599.0,
      size: "36",
      color: "Purple",
      quantity: 1,
    },
    {
      id: 2,
      image: img2,
      title: "Gulzaar - Dark Purple Multicolor Printed Velvet Suit Set",
      price: 12599.0,
      size: "36",
      color: "Purple",
      quantity: 1,
    },
  ]);

  const handleIncrease = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="Cartitem-cart-container">
      <div className="Cartitem-cart-items">
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            image={item.image}
            title={item.title}
            price={item.price}
            size={item.size}
            color={item.color}
            quantity={item.quantity}
            onIncrease={() => handleIncrease(item.id)}
            onDecrease={() => handleDecrease(item.id)}
          />
        ))}
      </div>
      <div className="Cartitem-order-summary">
     
   <div className="TotalAmount-Content">
     <div  className="ProductPrice-Content"><p>Product price</p> <p>{totalPrice}</p></div>
     <div   className="ProductPrice-Content"><p>Total Items:</p><p>{totalItems}</p></div>
     <div   className="ProductPrice-Content"><p>Subtotal</p><p>Rs. {totalPrice.toFixed(2)}</p></div>
        <button className="Proceed-Checkout"  onClick={()=>{navigate("/Shipping")}}>Proceed to Checkout</button>
   </div>

<div>

  <h3 className="SimilarProduct-text">Similar Product<ChevronRightIcon /></h3> 


<div className="SimilarItems-products-grid">
          {products.map((product) => (
            <div key={product.id} className="SimilarItems-product-card">
              <img src={product.image} alt={product.name} className="SimilarItems-product-image" />
              <div className="SimilarItems-product-details">
                <h3 className="SimilarItems-product-name">{product.name}</h3>
             <div  className="Original-Discount-Price">
             <p className="SimilarItems-product-original-price">₹{product.originalPrice}</p>
             <p className="SimilarItems-product-price">₹{product.price}</p>
             <p  className="Discount-off">{product.discount}</p>
             </div>
          <div className="LocalMall-Buy-Now-button">
          <LocalMallIcon  className="LocalMallIcon"/>
          <button className="SimilarItems-buy-button">Buy Now</button>
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
