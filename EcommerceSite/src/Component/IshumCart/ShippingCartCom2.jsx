import "../../Style-CSS/IshumCart-css/ShippingCartCom2.css";
import CloseIcon from '@mui/icons-material/Close';
import { motion } from "framer-motion";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaymentIcon from '@mui/icons-material/Payment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {  useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../ContextApiCart/LoginContextApi"; // Importing useAuth hook
import { useNavigate } from "react-router-dom";
import { usePixel } from '../FacebookPixel/FB-Pixel';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ShippingCartCom2({ onClose }) {
    const navigate = useNavigate(); 
    const { user } = useAuth(); // Get user from context
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeStep, setActiveStep] = useState("wallet");
    const [loadingAfterPayment, setLoadingAfterPayment] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
      const { trackEvent } = usePixel();

    
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

    useEffect(() => {
        const fetchCart = async () => {
            try {
                if (!user || !user._id) {
                    toast.error("User not found. Please log in.");
                    return;
                }
                const res = await axios.get(`${baseURL}/api/cart/${user._id}`);
                setCart(res.data);
                console.log(res.data);
            } catch (err) {
                console.error("Error fetching cart for shipping page", err);
                toast.error("Failed to fetch cart data.");
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [user]);

 useEffect(() => {
    if (!loading && (!cart?.cartItems || cart.cartItems.length === 0)) {
        toast.error("No items in cart.");
        // Optional: Navigate away or close overlay after toast
        setTimeout(() => {
            onClose(); // or navigate('/shop') etc.
        }, 1000);
    }
}, [loading]);


    const totalPrice = cart?.cartItems?.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    ) || 0;

    const loadScript = (src) =>
        new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            document.body.appendChild(script);
        });

    const handlePayment = async () => {
        await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        try {
            const { data: order } = await axios.post(`${baseURL}/create-order`, {
                amount: totalPrice,
            });

            const options = {
                key : razorpayKey,
                amount: order.amount,
                currency: order.currency,
                name: "My Store",
                description: "Test Transaction",
                order_id: order.id,
                handler: async function (response) {
                    try {
                        const verifyRes = await axios.post(`${baseURL}/verify-payment`, {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });

                      if (verifyRes.data.status === "success") {
                              setLoadingAfterPayment(true); // show spinner


    // Save order in backend
    await axios.post(`${baseURL}/api/orders/`, {
        userId: user._id,
        cartItems: cart.cartItems,
        totalAmount: totalPrice,
        shippingInfo: {
            address: "Dummy Address",
            city: "Dummy City",
            pincode: "000000",
            phone: user.phone,
        },
        paymentInfo: {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            status: "Paid"
        }
    });

    await axios.delete(`${baseURL}/api/cart/clear/${user._id}`);
    toast.success("Payment successful and order saved!");
    localStorage.setItem("orderConfirmed", "true");

    // Delay for user experience
    setTimeout(() => {
        navigate("/OrderConformation");
        onClose();
    }, 2000); // optional delay
}
 else {
                            toast.error("Payment verification failed.");
                        }
                    } catch (error) {
                        console.error("Error saving order:", error);
                        toast.error("Something went wrong while saving your order.");
                    }
                },
                prefill: {
                    name: user?.name || "Ishum",
                    email: user?.email || "marketing.ishumdesigns@gmail.com",
                    contact: user?.phone || "8130299443",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error("Error creating Razorpay order:", err);
            toast.error("Failed to initiate payment.");
        }
    };

    return (
        <>
        <div className="Payment-overlay">
            <div className="Payment-overlay-content">
                <button className="close-button" onClick={onClose}>
                    <CloseIcon />
                </button>

                <div className="Payment-shipping-step-indicators">
                    <motion.div animate={{ opacity: activeStep === "location" ? 1 : 0.5 }}>
                        <div className="Payment-Shipping-icon-line-btw">
                            <LocationOnIcon className="Payment-icons-of-shipping" />
                            <div className="Payment-line-btw"></div>
                        </div>
                    </motion.div>
                    <motion.div animate={{ opacity: activeStep === "wallet" ? 1 : 0.5 }}>
                        <div className="Payment-Shipping-icon-line-btw">
                            <PaymentIcon className="Payment-icons-of-shipping" />
                            <div className="Payment-line-btw"></div>
                        </div>
                    </motion.div>
                    <motion.div animate={{ opacity: activeStep === "payment" ? 1 : 0.5 }}>
                        <div className="Payment-Shipping-icon-line-btw">
                            <CheckCircleIcon className="Payment-icons-of-shipping" />
                        </div>
                    </motion.div>
                </div>

                <h2 className="Steps-2">STEP 2</h2>
                <h2 className="Payment-shipping-title">Payment</h2>

                <div className="Payment-process">
                    <div className="Payment-prices">
                        <h2>Product price</h2>
                        <h3>₹{totalPrice}</h3>
                    </div>

                    <div className="Payment-prices">
                        <h2>Shipping</h2>
                        <h3>Free Shipping</h3>
                    </div>

                    <div className="Payment-prices">
                        <h2>Subtotal</h2>
                        <h3>₹{totalPrice}</h3>
                    </div>

                    <div className="agree-terms-condition">
                        <input type="checkbox"
                         checked={agreedToTerms} 
                         onChange={(e) => setAgreedToTerms(e.target.checked)}  />
                        <h3>I agree to Terms and Conditions</h3>
                    </div>

                    <button className="place-order-button" onClick={handlePayment}
    disabled={!agreedToTerms}>
                        Place my order
                    </button>
                </div>
            </div>
        </div>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

        {loadingAfterPayment && (
    <div className="loading-overlay">
        <div className="spinner"></div>
        <p>Processing your order...</p>
    </div>
)}

        </>
    );
}


