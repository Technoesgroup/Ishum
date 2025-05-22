import React from 'react';
import '../../Style-CSS/Landing-css/LandingCom3.css';
import img1 from '../../images/b8194d4ec00e58f0ef4a3e3719adae47aedfcd3d.jpg';
import img2 from '../../images/Screenshot2025-05-16170951.png';
import img3 from '../../images/Screenshot2025-05-16171015.png';
import img4 from '../../images/Screenshot2025-05-16171040.png';
import img5 from '../../images/Screenshot2025-05-16171129.png';
import img6 from '../../images/Screenshot2025-05-16171155.png';
import img7 from '../../images/Screenshot 2025-05-22 124052.png';
import img8 from '../../images/Screenshot 2025-05-22 123854.png';
import InstagramIcon from '@mui/icons-material/Instagram';

const users = [
  { name: 'Ishum', image: img2, link: 'https://www.instagram.com/reel/DJWjcOWz-ON/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { name: 'Ishum', image: img3, link: 'https://www.instagram.com/p/DJbApJ-TKzS/?utm_source=ig_web_copy_link' },
  { name: 'Ishum', image: img4, link: 'https://www.instagram.com/p/DJlZcF_zmz8/?utm_source=ig_web_copy_link' },
  { name: 'Ishum', image: 'https://www.instagram.com/p/DJTQWyTtU-c/media/?size=l', link: 'https://www.instagram.com/p/DJTQWyTtU-c/?utm_source=ig_web_copy_link' },
  { name: 'Ishum', image: img5, link: 'https://www.instagram.com/p/DJiyJvxzFQU/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { name: 'Ishum', image: img6, link: '#' },
  // 🆕 New Links Added Below
  {
    name: 'Ishum',
    image: img8,
    link: 'https://www.instagram.com/reel/DJ3VHWYz9jN/?utm_source=ig_web_copy_link',
  },
  {
    name: 'Ishum',
    image: img7,
    link: 'https://www.instagram.com/reel/DJ8lZRcznRR/?utm_source=ig_web_copy_link',
  },
];

const InstagramGrid = () => {
  return (
    <>
      <div className="instagram-follow">Follow To Know More ishumbykaran_official</div>
      <div className="LandingCom3-grid-container">
        {users.map((user, index) => (
          <div className="LandingCom3-card" key={index}>
            <div className="LandingCom3-card-header">
              <img loading="lazy" className="LandingCom3-avatar" src={img1} alt={user.name} />
              <span>{user.name}</span>
              <InstagramIcon className="LandingCom3-insta-icon" />
            </div>
            <a href={user.link} target="_blank" rel="noopener noreferrer">
              <img className="LandingCom3-main-image" src={user.image} alt={user.name} />
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default InstagramGrid;
