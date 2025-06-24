import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import FilledCart from './Component/IshumCart/FilledCart';
import Navbar from './Component/Navbar';
import Home from './Pages/LandingPage';
import './App.css'
import Footer from './Component/Footer';
import Login from "./Component/B-TO-C-Login/LoginUser"; 
import BestSeller from "./Component/BestSeller/BestSellerCom1"; 
import MyOrder from './Component/MyOrder/MyOrder';
import Shipping from './Component/IshumCart/ShippingCartCom1';
import Collection from './Component/Ishum-AdminPanel/CollectionPanel';
import Review from './Component/ReviewCustomer/ReviewCustomer';
import Tale from './Component/Tale/Tale';
import Legacy from './Component/Legacy/Legacy';
import MobileLogin from './Component/B-TO-C-Login/MobileLoginPage/MobileLogin';
import UserAccount from './Pages/MyProfilePage';
import IshumExclusive from './Pages/IshumExclusivePage';
import COLLECTION from './Pages/Collection';
import ViewProduct from './Pages/ViewProduct-Review';
import CollectionPage from "./Component/Collection/CollectionCom3";
import OrderConformation from "./Component/MyOrder/OrderConformation";
import OrderTracking from "./Component/MyOrder/OrderTracking";
import MobileSearch from "./Component/Landing/SearchMobileView/SearchMobile";
import ScrollToTop from './Component/ScrollTop';
import ReturnPolicy from './Component/AllPolicies/ReturnPolicy';
import PrivacyPolicy from "./Component/AllPolicies/PrivacyPolicy"; 
import TearmsServices from './Component/AllPolicies/TearmsPolicy';
import PaymentServices from './Component/AllPolicies/PaymentStatement';
import { useAuth } from './ContextApiCart/LoginContextApi'; 
import  ModalLayout  from './Component/ModelContext/ModelLayout';
import { useModal } from './Component/ModelContext/ModelContext';
import MetaPixel from './Component/FacebookPixel/FB-Pixel';

function App() {
  const [loading, setLoading] = useState(true);
 const { isLoggedIn } = useAuth();
const [hasScrolled, setHasScrolled] = useState(false);
 const {
      showB2BModal, setShowB2BModal,
      showB2UModal, setShowB2UModal,
      showLoginModal, setShowLoginModal,
      showAuthModal, setShowAuthModal
    } = useModal();

const location = useLocation();

useEffect(() => {
  const handleScroll = () => {
    const isMobile = window.innerWidth <= 768;

    if (!hasScrolled && !isLoggedIn) {
      setHasScrolled(true);

      setTimeout(() => {
        if (isMobile) {
          setShowAuthModal(true); // ✅ mobile: open auth modal
        } else {
          setShowB2UModal(true);  // ✅ desktop: open user registration modal
        }
      }, 2000); // 2-second delay
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [hasScrolled, isLoggedIn, setShowAuthModal, setShowB2UModal]);


  // Simulate loading screen delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Show loader for 2 seconds

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  if (loading) {
    const letters = "ishum".split("");

    return (
      <div className="loader-container">
        <div className="khadija-logo">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              initial={{ y: 0 }}
              animate={{ y: [0, -30, 0] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.1,
                ease: "easeInOut",
              }}
              className="letter"
            >
              {letter}
            </motion.span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <MetaPixel location={location} />
      <ScrollToTop />
      <Navbar />
      <ModalLayout />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bestsellers" element={<BestSeller />} />
        <Route path="/Cart" element={<FilledCart />} />
        <Route path="/MyOrder" element={<MyOrder />} />
        <Route path="/Shipping" element={<Shipping />} />
        <Route path="/addcollection" element={<Collection />} />
        <Route path="/review" element={<Review />} />
        <Route path="/Tale" element={<Tale />} />
        <Route path="/Legacy" element={<Legacy />} />
        <Route path="/Login-mobile-profile" element={<MobileLogin />} />
        <Route path="/Profile" element={<UserAccount />} />
        <Route path="/Ishum-Exclusive" element={<IshumExclusive />} />
        <Route path="/Collection" element={<COLLECTION />} />
        <Route path="/co-page/:title" element={<CollectionPage />} />
        <Route path="/Viewproduct/:slug" element={<ViewProduct />} />
        <Route path="/OrderConformation" element={<OrderConformation />} />
        <Route path="/orders/:orderId" element={<OrderTracking />} />
        <Route path="/search" element={<MobileSearch />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/ReturnPolicy" element={<ReturnPolicy />} />
        <Route path="/PaymentServices" element={<PaymentServices />} />
        <Route path="/TearmsServices" element={<TearmsServices />} />
      </Routes>
      <Footer />
      </>
  );
}

export default App;



