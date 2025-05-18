import React, { useRef } from 'react';
import '../../Style-CSS/Landing-css/LandingCom11.css';

import img1 from  '../../images/1746602724601-578390326.jpg'
import img2 from  '../../images/1746608536944-880351628.jpg'
import img3 from  '../../images/1746608662829-298754532.jpg'
import img4 from  '../../images/1746615607071-494434453.jpg'
import img5 from  '../../images/1746685994043-507831531.jpg'
import img6 from  '../../images/WhatsAppImage2025-05-12at12.49.21a44493b6.jpg'

const articles = [

  {
    img: img2,
    title: 'Noor Heritage: Royal Beige Sharara Style',
    desc: 'Grace meets grandeur in this traditional sharara set, tailored to make you shine at every celebration with effortless style.'
  },
  {
    img: img3,
    title: 'Sawariya Signature: Maroon Floral Charm Suit',
    desc: 'A blend of rich maroon hues and delicate floral motifs that bring warmth and grace to any festive affair.'
  },

    {
    img: img1,
    title: 'Sawariya Luxe Edition: Midnight Velvet Kurti Set',
    desc: 'Indulge in the charm of timeless elegance with this deep-toned velvet ensemble, perfect for evening gatherings and festive nights.'
  }, 

  {
    img: img4,
    title: 'Noor Classic: Pistachio Green Anarkali',
    desc: 'A flowy Anarkali in serene green tones that reflects calm confidence and timeless tradition for every graceful move.'
  },
  {
    img: img5,
    title: 'Sawariya Couture: Coral Modern Fusion Wear',
    desc: 'Designed for the bold and beautiful, this coral fusion set fuses ethnic elegance with modern flair for contemporary divas.'
  },
  {
    img: img6,
    title: 'Noor Elegance: Blush Pink Zari Work Kurta',
    desc: 'Soft tones and intricate detailing come together to create this statement piece perfect for weddings and family functions.'
  },
];


const Articles = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="articles-wrapper">
      <h2 className="articles-title">Current Articles From Sawariya And Noor</h2>
      <p className="articles-subtitle">Cardigan helvetica sriracha, portland celiac truffaut</p>

      <div className="scroll-arrows">
        <button className="arrow-btn" onClick={() => scroll('left')}>&larr;</button>
        <button className="arrow-btn" onClick={() => scroll('right')}>&rarr;</button>
      </div>

      <div className="articles-container" ref={scrollRef}>
        {articles.map((a, i) => (
          <div className="article-card" key={i}>
            <img loading="lazy" src={a.img} alt="Article" className="article-image" />
            <div className="article-content">
              <div className="article-title">{a.title}</div>
              <div className="article-desc">{a.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;