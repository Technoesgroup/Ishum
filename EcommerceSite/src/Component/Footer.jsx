import React from "react";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PinterestIcon from '@mui/icons-material/Pinterest';
import "../Style-CSS/Footer.css";
import Logo from '../images/IshumLogo1.svg';
import { Link } from 'react-router-dom';
import { useModal } from './ModelContext/ModelContext';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const Footer = () => {
     const {
        showB2BModal, setShowB2BModal,
      } = useModal();

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-top">
          {/* Newsletter Section */}
       <div  className="Emailsection-brand">
       <div className="newsletter-section">
       <div className="newsletter-section-h4"><h4>
       Sign up for our newsletter to receive exclusive offers, <br />
       new collections, and insider news!
       </h4>
       </div>
            <div className="newsletter-input"> 
              <input
                type="email"
                placeholder="Enter your email here to subscribe."
                className="email-input"
              />
            <ArrowOutwardIcon  className="subscribe-button"/>
            </div>
          </div>

      
      <div className="footer-brand-links">
          <div className="brand-section">
        <div>  
            <img src={Logo} alt="Logo" className="footer-logo" />
        </div>
         <div  className="brand-section-p">  
             <p className="brand-tagline">"Reviving the traditional opulence of a bygone era."</p>
            <p className="brand-address">A-6, Block, Sector 6, Noida, UP 201301</p>
            <p className="brand-contact">info@ishum.in | marketing.ishumdesigns@gmail.com</p>
            <p className="brand-phone">+91- 8130299443</p></div>
          </div>
        </div>
       </div>

        {/* Links Section */}
        <div className="footer-links">
          <div>
            <h3>Fresh Launches</h3>
            <ul>
              <li><a href="/co-page/Rangrez">Rangrez</a></li>
              <li><a href="/co-page/SAWARIYA">Sawariya</a></li>
              <li><a href="/co-page/NOOR">Noor Edits</a></li>
            </ul>
          </div>
          <div>
            <h3>Information</h3>
            <ul>
              <li><a href="/Tale">About Us</a></li>
              <li    onClick={() => setShowB2BModal(true)}>Appointment / Get In Touch</li>
            </ul>
          </div>

          <div>
            <h3>Legal</h3>
            <ul>
            <li><Link to="/PrivacyPolicy">Privacy Policy</Link></li>
            <li><Link to="/TearmsServices">Terms & Conditions</Link></li>
            <li><Link to="/PaymentServices">Refund Policy</Link></li>
            <li><Link to="/ReturnPolicy">Exchanges & Returns</Link></li>
            </ul>
          </div>
          </div>
         
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>© 2025 All Rights Reserved</p>
          <div className="footer-terms">
            <span><Link to="/TearmsServices">Terms </Link></span>
            <span><Link to="/PrivacyPolicy">Privacy Policy</Link></span>
          </div>
          <div className="footer-social">
         <a href="https://www.facebook.com/Ishumbykaran/"><FacebookOutlinedIcon /></a>
          <a href="https://www.instagram.com/ishumbykaran_official?igsh=Y3J6d3JmMDMxa2cw">  <InstagramIcon /></a>
         <a href="https://www.youtube.com/@ishumdesigns1982"><YouTubeIcon /></a>
         <a href="https://in.pinterest.com/ishumdesigns/"><PinterestIcon /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;