import React from 'react';
import '../../Style-CSS/Landing-css/LandingCom3.css';
import  img1  from '../../images/b8194d4ec00e58f0ef4a3e3719adae47aedfcd3d.jpg'
import  img2  from '../../images/Screenshot 2025-05-16 170951.png'
import  img3  from '../../images/Screenshot 2025-05-16 171015.png'
import  img4  from '../../images/Screenshot 2025-05-16 171040.png'
import  img5  from '../../images/Screenshot 2025-05-16 171129.png'
import  img6  from '../../images/Screenshot 2025-05-16 171155.png'



const users = [
  { name: 'Ishum', image: img2, link: 'https://www.instagram.com/p/DJlZcF_zmz8/?utm_source=ig_web_copy_link' },
  { name: 'Ishum', image: img3, link: 'https://www.instagram.com/p/DJbApJ-TKzS/?utm_source=ig_web_copy_link' },
  { name: 'Ishum', image: img4, link: 'https://www.instagram.com/reel/DJWjcOWz-ON/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { name: 'Ishum', image: 'https://www.instagram.com/p/DJTQWyTtU-c/media/?size=l', link: 'https://www.instagram.com/p/DJTQWyTtU-c/?utm_source=ig_web_copy_link' },
  { name: 'Ishum', image: img5, link: 'https://www.instagram.com/p/DJiyJvxzFQU/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { name: 'Ishum', image: img6, link: '#' },
];

const InstagramGrid = () => {
  return (

  <>
      <div  className='instagram-follow'>Follow To Know More ishumbykaran_official</div>
    <div className="LandingCom3-grid-container">
      {users.map((user, index) => (
        <div className="LandingCom3-card" key={index}>
          <div className="LandingCom3-card-header">
            <img      loading="lazy" className="LandingCom3-avatar" src={img1} alt={user.name} />
            <span>{user.name}</span>
            <img      loading="lazy" className="LandingCom3-insta-icon" src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" />
          </div>
          <a href={user.link} target="_blank" rel="noopener noreferrer">
            <img className="LandingCom3-main-image" src={user.image} alt={user.name} />
          </a>
          <div className="LandingCom3-card-footer">
            <img      loading="lazy" src="https://img.icons8.com/ios-glyphs/30/like--v1.png" alt="Like" />
            <img      loading="lazy" src="https://img.icons8.com/ios-glyphs/30/speech-bubble--v1.png" alt="Comment" />
            <img      loading="lazy" src="https://img.icons8.com/ios-glyphs/30/share--v1.png" alt="Share" />
          </div>
        </div>
      ))}
    </div>
  </>
  );
};

export default InstagramGrid;