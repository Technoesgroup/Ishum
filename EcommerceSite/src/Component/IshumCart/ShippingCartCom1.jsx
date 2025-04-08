import { useState } from "react";
import { motion } from "framer-motion";
import "../../Style-CSS/IshumCart-css/ShippingCartCom1.css";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaymentIcon from '@mui/icons-material/Payment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ShippingCartCom2 from "./ShippingCartCom2";  // Import overlay component

export default function ShippingStep() {
    const [activeStep, setActiveStep] = useState("location");
    const [showOverlay, setShowOverlay] = useState(false);  // State to control overlay visibility

    const handleContinue = () => {
        setActiveStep("wallet");
        setTimeout(() => {
            setShowOverlay(true);  // Show overlay when button is clicked
        }, 500);
    };

    return (
        <div className="shipping-container">
            <div className="shipping-step-indicators">
                <motion.div animate={{ opacity: activeStep === "location" ? 1 : 0.5 }}>
                    <div className="Shipping-icon-line-btw"> <LocationOnIcon className="icons-of-shipping" /> <div className="line-btw"></div></div>
                </motion.div>
                <motion.div animate={{ opacity: activeStep === "wallet" ? 1 : 0.5 }}>
                    <div className="Shipping-icon-line-btw"> <PaymentIcon className="icons-of-shipping" /> <div className="line-btw"></div></div>
                </motion.div>
                <motion.div animate={{ opacity: activeStep === "payment" ? 1 : 0.5 }}>
                    <div className="Shipping-icon-line-btw"> <CheckCircleIcon className="icons-of-shipping" /> </div>
                </motion.div>
            </div>

            <h2 className="shipping-title">Shipping</h2>

            <div className="Content-of-Shipping">
                <div className="shipping-form-grid">
                    <div className="input-wrapper">
                        <input type="text" placeholder="First Name" className="shipping-input" />
                    </div>
                    <div className="input-wrapper">
                        <input type="text" placeholder="Last Name (Required)" className="shipping-input shipping-error-border" />
                    </div>
                    <div className="input-wrapper">
                        <input type="text" placeholder="Country" className="shipping-input" />
                        <KeyboardArrowDownIcon className="Shipping-dropdown-icon" />
                    </div>
                    <div className="input-wrapper">
                        <input type="text" placeholder="Street Name" className="shipping-input" />
                    </div>
                    <div className="input-wrapper">
                        <input type="text" placeholder="City" className="shipping-input" />
                        <KeyboardArrowDownIcon className="Shipping-dropdown-icon" />
                    </div>
                    <div className="input-wrapper">
                        <input type="text" placeholder="State / Province" className="shipping-input" />
                    </div>
                    <div className="input-wrapper">
                        <input type="text" placeholder="Zip Code" className="shipping-input" />
                    </div>
                    <div className="input-wrapper">
                        <input type="text" placeholder="Phone Number" className="shipping-input" />
                    </div>
                </div>

                <div className="ShippingData-RightSide">
                    <div className="radio-home-other-address">
                        <div className="Address-shipping-h3">
                            <h3>Shipping Method</h3>
                        </div>
                        <div className="Address-shipping">
                            <input type="radio" />
                            <span>
                                <h4>Save as home Address</h4>
                                <p>Delivery from 10 to 15 business days</p>
                            </span>
                        </div>
                        <div className="Address-shipping">
                            <input type="radio" />
                            <span>
                                <h4>Ordering For Someone Else</h4>
                                <p>Alternate Mobile Number*</p>
                            </span>
                        </div>
                    </div>

                    <div className="Coupon-Code">
                        <h3>Coupon Code</h3>
                        <input type="text" placeholder="Have a code? type it here..." />
                    </div>

                    <div className="shipping-checkbox-container">
                        <h3>Billing Address</h3>
                        <br />
                        <div className="shipping-checkbox">
                            <input type="checkbox" id="copyAddress" />
                            <label htmlFor="copyAddress">Copy address data from shipping</label>
                        </div>
                    </div>

                    <button className="shipping-continue-button" onClick={handleContinue}>
                        Continue to Payment
                    </button>
                </div>
            </div>

            {/* Overlay for ShippingCartCom2 */}
            {showOverlay && <ShippingCartCom2 onClose={() => setShowOverlay(false)} />}
        </div>
    );
}
