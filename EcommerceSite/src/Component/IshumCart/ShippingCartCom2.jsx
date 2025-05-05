import "../../Style-CSS/IshumCart-css/ShippingCartCom2.css";
import CloseIcon from '@mui/icons-material/Close';
import { motion } from "framer-motion";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaymentIcon from '@mui/icons-material/Payment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../ContextApiCart/LoginContextApi"; // Importing useAuth hook
import { useNavigate } from "react-router-dom";

export default function ShippingCartCom2({ onClose }) {
    const navigate = useNavigate(); 
    const { user } = useAuth(); // Get user from context
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeStep, setActiveStep] = useState("wallet");

    useEffect(() => {
        const fetchCart = async () => {
            try {
                if (!user || !user._id) {
                    alert("User not found. Please log in.");
                    return;
                }
                const res = await axios.get(`http://localhost:4000/api/cart/${user._id}`);
                setCart(res.data);
                console.log(res.data);
            } catch (err) {
                console.error("Error fetching cart for shipping page", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [user]); // Dependency array includes user to refetch if user changes

    if (loading) return <div>Loading...</div>;
    if (!cart?.cartItems || cart.cartItems.length === 0) {
        return <div>No items in cart</div>;
    }

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
        
            const { data: order } = await axios.post("http://localhost:4000/create-order", {
                amount: totalPrice,
            });
        
            const options = {
                key: "rzp_test_Tg2EHa9WfYqYt0", // Replace with your Razorpay Key ID
                amount: order.amount,
                currency: order.currency,
                name: "My Store",
                description: "Test Transaction",
                order_id: order.id,
                handler: async function (response) {
                    try {
                        const verifyRes = await axios.post("http://localhost:4000/verify-payment", {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });
        
                        if (verifyRes.data.status === "success") {
                            // ✅ Save order in backend
                            await axios.post("http://localhost:4000/api/orders/", {
                                userId: user._id,
                                cartItems: cart.cartItems,
                                totalAmount: totalPrice,
                                shippingInfo: {
                                    address: "Dummy Address", // Later take from user input
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
        
                            alert("✅ Payment successful and order saved!");
                            localStorage.setItem("orderConfirmed", "true");
                            navigate("/OrderConformation");

                            onClose();
                        } else {
                            alert("❌ Payment verification failed.");
                        }
                    } catch (error) {
                        console.error("Error saving order:", error);
                        alert("❌ Something went wrong while saving your order.");
                    }
                },
                prefill: {
                    name: user?.name || "Ishum",
                    email: user?.email || "harsh@example.com",
                    contact: user?.phone || "8130299443",
                },
                theme: {
                    color: "#3399cc",
                },
            };
        
            const rzp = new window.Razorpay(options);
            rzp.open();
        };
    

    return (
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
                        <input type="checkbox" />
                        <h3>I agree to Terms and Conditions</h3>
                    </div>

                    <button className="place-order-button" onClick={handlePayment}>
                        Place my order
                    </button>
                </div>
            </div>
        </div>
    );
}

