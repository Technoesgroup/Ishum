import "../../Style-CSS/IshumCart-css/ShippingCartCom2.css";
import CloseIcon from '@mui/icons-material/Close';
import { motion } from "framer-motion";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaymentIcon from '@mui/icons-material/Payment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useState } from "react";

export default function ShippingCartCom2({ onClose }) {
    const [activeStep, setActiveStep] = useState("wallet");

    const handleContinue = () => {
        setActiveStep("wallet");
        setTimeout(() => {
            setShowOverlay(true);  // Show overlay when button is clicked
        }, 500);
    };

    return (
        <div className="Payment-overlay">

            <div className="Payment-overlay-content">
                <button className="close-button" onClick={onClose}>
                    <CloseIcon />
                </button>

                <div className="Payment-shipping-step-indicators">
                <motion.div animate={{ opacity: activeStep === "location" ? 1 : 0.5 }}>
                    <div className="Payment-Shipping-icon-line-btw"> <LocationOnIcon className="Payment-icons-of-shipping" /> <div className="Payment-line-btw"></div></div>
                </motion.div>
                <motion.div animate={{ opacity: activeStep === "wallet" ? 1 : 0.5 }}>
                    <div className="Payment-Shipping-icon-line-btw"> <PaymentIcon className="Payment-icons-of-shipping" /> <div className="Payment-line-btw"></div></div>
                </motion.div>
                <motion.div animate={{ opacity: activeStep === "payment" ? 1 : 0.5 }}>
                    <div className="Payment-Shipping-icon-line-btw"> <CheckCircleIcon className="Payment-icons-of-shipping" /> </div>
                </motion.div>
            </div>

                <h2  className="Steps-2">STEP 2</h2>
                <h2 className="Payment-shipping-title">Payment</h2>
                
                <div  className="Payment-process">
                       <div className="Payment-prices">
                        <h2>Product price</h2> 
                        <h3>&#8377;50,000</h3>
                        </div>

                        <div  className="Payment-prices">
                        <h2>Shipping</h2> 
                        <h3>Free Shipping</h3>
                        </div>

                         <div  className="Payment-prices">
                        <h2>Subtotal</h2> 
                        <h3>&#8377;50,000</h3>
                        </div>

                    <div  className="agree-terms-condition">
                        <input type="checkbox" /> 
                        <h3>I agree to Terms and Conditions</h3>
                    </div>

                    <button className="place-order-button">Place my order</button>
                </div>
            </div>
        </div>
    );
}
