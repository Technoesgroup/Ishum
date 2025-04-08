import React from "react";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import "../Style-CSS/Footer.css";
import Logo from '../images/Ishum Logo 1.svg';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const Footer = () => {
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
              <li>Rangrez</li>
              <li>Gulzaar</li>
              <li>Noor Edits</li>
            </ul>
          </div>
          <div>
            <h3>Information</h3>
            <ul>
              <li>About Us</li>
              <li>Appointment / Get In Touch</li>
              <li>Shipping & Delivery</li>
              <li>FAQ</li>
              <li>Blog</li>
            </ul>
          </div>

          <div>
            <h3>Legal</h3>
            <ul>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Cancellation Policy</li>
              <li>Refund Policy</li>
              <li>Exchanges & Returns</li>
            </ul>
          </div>
          </div>
         
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>© 2025 All Rights Reserved</p>
          <div className="footer-terms">
            <span>Terms</span>
            <span>Privacy</span>
            <span>Cookies</span>
          </div>
          <div className="footer-social">
            <FacebookOutlinedIcon />
            <TwitterIcon />
            <InstagramIcon />
            <YouTubeIcon />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;