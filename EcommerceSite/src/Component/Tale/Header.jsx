import React from "react";
import underline  from '../../images/Undertextline.png';

function Header() {
  return (
    <header className="Facilities-header">
      <h3>Discover / Our Tale</h3>
        <h2>OUR TALE</h2>
        <img src={underline} alt=""  className="Underline-Tale"/>
      {/* <p>
      Mount Litera Zee School Bihta proudly offers state-of-the-art facilities designed to foster
       holistic development—intellectual, physical, and creative. These resources reflect our commitment 
      to nurturing excellence, empowering students to thrive and achieve greatness in every endeavor.
      </p> */}
    </header>
  );
}

export default Header;