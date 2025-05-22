import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PinterestIcon from '@mui/icons-material/Pinterest';
import logo from '../images/IshumLogo1.svg';
import { Link, useNavigate } from "react-router-dom";
import RegBusiness from './B-TO-B-Login/RegisterBusiness';
import Login from '../Component/B-TO-C-Login/LoginUser'
import RegUser from './B-TO-C-Login/RegisterUser';
import { motion } from "framer-motion";
import EmailIcon from '@mui/icons-material/Email';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { useCart } from "../ContextApiCart/CartContextApi";
import "../Style-CSS/Navbar.css";
import { useEffect, useState } from 'react';
import Badge from "@mui/material/Badge";
import SearchBar from "./SearchBar/SearchBar";
import { useAuth } from '../ContextApiCart/LoginContextApi';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import AuthModal from "../Component/B-TO-C-Login/MobileLoginPage/AutoMobile"
import MenuIcon from '@mui/icons-material/Menu';


export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [showB2BModal, setShowB2BModal] = useState(false);
  const [showB2UModal, setShowB2UModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDiscoverOpen, setIsDiscoverOpen] = useState(false);
  const [isRecommendationOpen, setIsRecommendationOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
 


  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    // Assume you store user in localStorage after login/register
    const userData = JSON.parse(localStorage.getItem('user'));

    if (userData) {
      setUser({
        name: userData.name,
        email: userData.email,
      });
    }
  }, []);


  const navigate = useNavigate();
  const { cartItems } = useCart();

  const handleSearchClick = () => {
    navigate('/Search-Bar');
  };

  const handleMoblieSearchClick = () => {
    navigate('/search');
  };


  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Set isMobile to true if window width is <= 768px
    };
    handleResize(); // Initialize the isMobile state based on current window size
    window.addEventListener("resize", handleResize); // Update on window resize
    return () => window.removeEventListener("resize", handleResize); // Cleanup on unmount
  }, []);


    const handleCartClick = () => {
    const isLoggedIn = localStorage.getItem('token');

    if (isLoggedIn) {
      navigate('/Cart');
    } else {
      if (isMobile) {
        setShowAuthModal(true); // mobile login flow
      } else {
        setShowLoginModal(true); // desktop login modal (if any)
      }
    }
  };


  return (
    <nav className='Ishum-navbars'>

      {/* TOP FIXED HEADER */}
      <div className="info-top-header">
        <div className="info-top-links">
          {/* <span>SHIPPING & DELIVERY</span> */}
          <span><a href="/OrderTracking">TRACK YOUR ORDER</a></span>
          <span><a href="/ReturnPolicy">RETURNS</a></span>
          <span  onClick={() => setShowB2BModal(true)} >CONTACT US</span>
        </div>
        <div className="Ishum-top-social-icons">
        <a href="https://www.facebook.com/Ishumbykaran/"><FacebookOutlinedIcon className='socialicon' /></a>
        <a href="https://www.instagram.com/ishumbykaran_official?igsh=Y3J6d3JmMDMxa2cw"><InstagramIcon className='socialicon' /></a>
        <a href="https://in.pinterest.com/ishumdesigns/"><PinterestIcon className='socialicon' /></a>
        <a href="https://www.youtube.com/@ishumdesigns1982">   <YouTubeIcon className='socialicon' /></a>
        </div>
      </div>

      {/* SOCIAL ICON + LOGO + PROFILE MENU */}
      <div className="Ishum-navbar">

          <div className='ishum-nav-li-serachbar'>
        <div className={`Ishum-nav-links ${isMenuOpen ? "active" : ""}`}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>STORE</Link>
          <Link to="/bestsellers" onClick={() => setIsMenuOpen(false)}>BESTSELLERS</Link>
          <Link to="/Ishum-Exclusive" onClick={() => setIsMenuOpen(false)}>ISHUM'S EXCLUSIVE</Link>

          {/* <div className="dropdown" onMouseEnter={() => setIsRecommendationOpen(true)} onMouseLeave={() => setIsRecommendationOpen(false)}>
            <div className='RECOMMENDATION'>ISHUM'S RECOMMENDATION <KeyboardArrowDownSharpIcon /></div>
            {isRecommendationOpen && (
              <ul className="Ishum-dropdown-menu">
                <span className='RECOMMENDATION-dropdown-li'>
                  <span className='Occasion'>
                    <h2>Occasion</h2>
                    <li><Link to="/Leg " onClick={() => setIsMenuOpen(false)}>Eid</Link></li>
                    <li><Link to="/Tag" onClick={() => setIsMenuOpen(false)}>Diwali</Link></li>
                    <li><Link to="/B2B-P" onClick={() => setIsMenuOpen(false)}>Karwa Chauth</Link></li>

                  </span>
                  <div  className='line-occasion'></div>
                  <span className='SALE'>
                    <h2>SALE</h2>
                    <li><Link to="/Lega ">Upto 35% Off On Gulzaar Collection</Link></li>
                    <li><Link to="/Ta">Upto 20% Off On Jashn e Rang Collection</Link></li>
                    <li><Link to="/B2B">Diwali Offers</Link></li>
                  </span>
                </span>
              </ul>
            )}
          </div> */}
          <div className="dropdown" onMouseEnter={() => setIsDiscoverOpen(true)} onMouseLeave={() => setIsDiscoverOpen(false)}>
            <div className='discover'>DISCOVER <KeyboardArrowDownSharpIcon /></div>
            {isDiscoverOpen && (
              <ul className="Ishum-dropdown-menu ishum-discover-dropdown">
                <li><Link to="/Legacy" onClick={() => setIsMenuOpen(false)}>Legacy</Link></li>
                <li><Link to="/Tale" onClick={() => setIsMenuOpen(false)}>Our Tale</Link></li>
                <li><Link onClick={() =>   { setShowB2BModal(true); setIsMenuOpen(false);}}>B2B Customers</Link></li>
              </ul>
            )}
          </div>
          <Link to="/review" onClick={() => setIsMenuOpen(false)}>REVIEW</Link>
          {/* <button
            onClick={() => {
              setShowB2BModal(true);
              setIsMenuOpen(false);
            }}
            className="BUSINESS-TO-BUSINESS"
          >
            BUSINESS TO BUSINESS
          </button> */}

        </div>

      </div>
        <div className="Ishum-logo-container">
          <img src={logo} alt="Ishum Logo" className="Ishum-logo" />
        </div>


        <div className="Ishum-right-icons">
          <div> <SearchBar /></div>
          <div className='ishum-rightside-main-icon'>
            {!isLoggedIn && (
              <PermIdentityOutlinedIcon
                className="Ishum-icon"
                onClick={() => {
                  if (isMobile) {
                    setShowAuthModal(true);; // instead of navigate
                  } else {
                    setShowB2UModal(true);
                  }
                }}
              />

            )}
            <SearchIcon className='mobile-search-icon' onClick={handleMoblieSearchClick} />
            <Badge badgeContent={cartItems.length} color="error">
  <LocalMallOutlinedIcon
    className="Ishum-iconbag"
    onClick={handleCartClick}
  />
</Badge>
            {isLoggedIn && (
              <ListOutlinedIcon
                className="Ishum-icon profile-menu-icon"
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={() => setIsOpen(true)}
              />
            )}
          </div>
          {isMenuOpen ? (
            <CloseIcon className="Ishum-menu-icon closemenu-icon" onClick={() => setIsMenuOpen(false)} />
          ) : (
            <MenuIcon className="Ishum-menu-icon menuopen-icon" onClick={() => setIsMenuOpen(true)} />
          )}
          {isLoggedIn && isOpen && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="Profile-dropdown-menu"
              onMouseLeave={() => setIsOpen(false)}
            >
              <ul className="Profile-menu-list">
                <li className="Profile-menu-item">
                  <Link><PermIdentityOutlinedIcon />
                    <div className='Name-ProfileContent'>
                      <p>{user.name || 'Guest User'}</p>
                      <p className='email-name-profile'>{user.email || 'guest@example.com'}</p>
                    </div></Link>
                </li>
                <li className="Profile-menu-item"><Link to={"/MyOrder"}><ShoppingBagIcon />My Order</Link></li>
                <li className="Profile-menu-item"><Link to={"/Profile"}><PermIdentityOutlinedIcon />My Profile</Link></li>
                <li className="Profile-menu-item"><Link to={"/MyOrder"}><EmailIcon />Support</Link></li>
                <li className="Profile-menu-item logout" onClick={handleLogout}><Link to={"/"}><LogoutOutlinedIcon />Logout</Link></li>
              </ul>
            </motion.div>
          )}
        </div>
      </div>

      {/* NAVIGATION LINKS AND SEARCH */}
  

      {/* MODALS */}
      {showB2BModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="B2B-close-btn" onClick={() => setShowB2BModal(false)}>×</button>
            <RegBusiness />
          </div>
        </div>
      )}
      {showLoginModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <Login setShowB2UModal={setShowB2UModal} setShowLoginModal={setShowLoginModal} />
          </div>
        </div>
      )}
      {showB2UModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="RegisterUser-close-btn" onClick={() => setShowB2UModal(false)}>×</button>
            <RegUser setShowB2UModal={setShowB2UModal} setShowLoginModal={setShowLoginModal} />
          </div>
        </div>
      )}


      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}



    </nav>
  );
}
