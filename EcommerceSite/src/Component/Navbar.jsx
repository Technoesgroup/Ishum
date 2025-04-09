import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../images/Ishum Logo 1.svg';
import PersonIcon from '@mui/icons-material/Person';
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
import MenuOpenIcon from '@mui/icons-material/MenuOpen'; // Different menu icon
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';


import "../Style-CSS/Navbar.css";
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [showB2BModal, setShowB2BModal] = useState(false);
  const [showB2UModal, setShowB2UModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDiscoverOpen, setIsDiscoverOpen] = useState(false);
  const [isRecommendationOpen, setIsRecommendationOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/Search-Bar');
  };


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth >= 768);
    };
  
    handleResize(); // Check on initial load
    window.addEventListener("resize", handleResize);
  
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);



  return (
    <nav className='Ishum-navbars'>
      <div className="Ishum-navbar">
        <div className="Ishum-social-icons">
          <XIcon className='socialicon' />
          <FacebookOutlinedIcon className='socialicon' />
          <InstagramIcon className='socialicon' />
          <YouTubeIcon className='socialicon' />
        </div>

        {/* Center Logo */}
        <div className="Ishum-logo-container">
          <img src={logo} alt="Ishum Logo" className="Ishum-logo" />
        </div>

        <div className="Ishum-right-icons">
        <div  className='ishum-rightside-main-icon'>
          <PersonIcon className="Ishum-icon" onClick={() => {
    if (isMobile) {
      navigate("/Login-mobile-profile"); // 👉 Replace with your mobile route
    } else {
      setShowB2UModal(true); // Existing modal logic for desktop
    }
  }} />
          <SearchIcon   className='mobile-search-icon'   onClick={handleSearchClick}/>
          <ShoppingCartOutlinedIcon className="Ishum-icon"  onClick={() => navigate("/Cart")} />
          <MenuIcon className="Ishum-icon  profile-menu-icon"
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setIsOpen(true)}
          />
        </div>
            {isMenuOpen ? (
            <CloseIcon className="Ishum-menu-icon  closemenu-icon" onClick={() => setIsMenuOpen(false)} />
          ) : (
            <MenuOpenIcon className="Ishum-menu-icon  menuopen-icon" onClick={() => setIsMenuOpen(true)} />
          )}

        
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="Profile-dropdown-menu"
          onMouseLeave={() => setIsOpen(false)}
        >
          <ul className="Profile-menu-list">
            <li className="Profile-menu-item">
    <Link> <PersonIcon /> 
       <div className='Name-ProfileContent'><p>Harsh Rajput</p>
        <p  className='email-name-profile'>harshrajput30411@gmail.com</p>
        </div></Link>
              </li>
            <li className="Profile-menu-item">
             <Link   to={"/MyOrder"}><ShoppingBagIcon />My Order</Link> 
              </li>
            <li className="Profile-menu-item">
              <Link  to={"/MyOrder"}> <PermIdentityOutlinedIcon />My Profile</Link>
            </li>
            <li className="Profile-menu-item">
              <Link  to={"/MyOrder"}> <EmailIcon /> Support</Link>
            </li>
            <li className="Profile-menu-item logout">
              <Link  to={"/MyOrder"}> <LogoutOutlinedIcon /> Logout</Link>
            </li>
          </ul>
        </motion.div>
      )}
        </div>
      </div>



      <div className='nav-link'></div>

     
    <div  className='ishum-nav-li-serachbar'>

    <div className={`Ishum-nav-links ${isMenuOpen ? "active" : ""}`}>
          <Link to="/store">STORE</Link>
          <Link to="/bestsellers">BESTSELLERS</Link>
          <Link to="/exclusive">ISHUM'S EXCLUSIVE</Link>
          <div className="dropdown" onMouseEnter={() => setIsRecommendationOpen(true)} onMouseLeave={() => setIsRecommendationOpen(false)}>
          <div  className='RECOMMENDATION'>ISHUM'S RECOMMENDATION <KeyboardArrowDownSharpIcon /></div>
          {isRecommendationOpen && (
        <ul className="Ishum-dropdown-menu">
        <span  className='RECOMMENDATION-dropdown-li'>
        <span className='Occasion'>
        <h2>Occasion</h2>
        <li><Link to="/Legacy ">Eid</Link></li>
        <li><Link to="/Tale">Diwali</Link></li>
        <li><Link to="/B2B-Policy">Karwa Chauth</Link></li>
        </span>

        <span  className='SALE'>
          <h2>SALE</h2>
          <li><Link to="/Legacy ">Upto 35% Off On Gulzaar Collection</Link></li>
          <li><Link to="/Tale">Upto 20% Off On Jashn e Rang Collection</Link></li>
          <li><Link to="/B2B-Policy">Diwali Offers</Link></li>
        </span>

        </span>
            </ul>
          )}
        </div>
        <div className="dropdown" onMouseEnter={() => setIsDiscoverOpen(true)} onMouseLeave={() => setIsDiscoverOpen(false)}>
          <div className='discover'>  DISCOVER <KeyboardArrowDownSharpIcon /></div> 
          {isDiscoverOpen && (
            <ul className="Ishum-dropdown-menu  ishum-discover-dropdown">
               <li><Link to="/Legacy ">Legacy </Link></li>
              <li><Link to="/Tale">Our Tale</Link></li>
              <li><Link to="/B2B-Policy">B2B Policy</Link></li>
            </ul>
          )}
        </div>
          <Link to="/review">REVIEW</Link>
        
          <button onClick={() => setShowB2BModal(true)} className="BUSINESS-TO-BUSINESS">
            BUSINESS TO BUSINESS
          </button>

        </div>
        <div className="Ishum-nav-search-wrapper">
        <input type="text" placeholder="Search" className="Ishum-nav-search-input" />
        <SearchIcon className="Ishum-nav-search-icon" />
      </div>
  

    </div>
  
      
      {showB2BModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowB2BModal(false)}>×</button>
            <RegBusiness />
          </div>
        </div>
      )}

  
        {showLoginModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <Login setShowB2UModal={setShowB2UModal} setShowLoginModal={setShowLoginModal}/>
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
    </nav>
  );
}

