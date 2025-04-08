import React, { useEffect, useRef } from "react";
import "../Tale/Tale.css";
import Header from "./Header";
import image1 from '../../images/image 6.svg';
import image2 from '../../images/image 6.svg';
import image3 from '../../images/image 6.svg';
import image4 from '../../images/image 6.svg';

const sections= [
  {
    title: "Meet the Designer: Karan Kapoor",
    description: "Karan Kapoor, the visionary behind Ishum, has dedicated his craft to redefining ethnic fashion with a modern sensibility. With years of experience in textile artistry and couture, he seamlessly blends traditional craftsmanship with contemporary silhouettes. His passion for heritage fabrics and intricate embroidery has shaped Ishum into a brand that embodies elegance, sophistication, and timeless appeal.",
    description_2:"Each creation at Ishum carries Karan's artistic touch—rooted in India’s rich textile traditions yet designed for the global fashion-forward audience. His commitment to quality and detail ensures that every ensemble is a masterpiece, crafted to celebrate individuality and grace.",
    image: image1,
  },
  {
    title: "Ishum Logo Story: A Symbol of Grace, Heritage, and Elegance",
    description: "The Ishum logo beautifully encapsulates the brand's essence—heritage craftsmanship, timeless elegance, and feminine grace. The Ishum logo is a reflection of heritage, craftsmanship, and timeless elegance. The name ISHUM, displayed in a grand golden serif font, embodies luxury, tradition, and prestige, while the deep green background signifies royalty, prosperity, and a deep-rooted connection to nature—a colour often seen in traditional Indian textiles.",
    image: image2,
    description_2:"The red and gold feather-like motif above the I is more than just an artistic embellishment; it draws inspiration from floral and paisley patterns found in intricate zardozi and resham embroidery, symbolizing the artistry of Indian ethnic wear. The motif also carries a flame-like elegance, representing the enduring legacy of Ishum, blending heritage with modernity as ethnic fashion evolves. The tagline By Karan Kapoor adds a personal touch, emphasizing the brand’s generational craftsmanship and its deep-rooted legacy in ethnic fashion. Completing the design, the golden underline swoosh subtly reinforces stability, trust, and premium quality, making the Ishum logo a true representation of a brand that celebrates the richness of India's textile heritage while embracing contemporary trends.",
    description_3:"",
  },
  {
    title: "Weaving Tradition, Crafting Elegance",
    description: "What began as a passion for fine craftsmanship has evolved into a celebrated name in ethnic fashion. ISHUM is more than just a brand—it’s a tribute to India’s rich textile heritage, blending the artistry of traditional embroidery with modern design sensibilities.",
    image: image3,
    description_2:"Our journey is one of innovation and authenticity—creating ensembles that honor age-old traditions while catering to the evolving tastes of the modern woman. With in-house designing and manufacturing, we meticulously craft collections that celebrate individuality, grace, and timeless beauty.",
    description_3:"Today, ISHUM reaches fashion lovers across India and beyond, offering an exclusive range of ethnic wear through physical stores and digital platforms. Each creation is more than just attire; it’s a story of heritage, elegance, and enduring craftsmanship.",
  },
  {
    title: "Brand Reach",
    description: "Since its inception, ISHUM has expanded its presence both nationally and internationally, becoming a prominent name in women's ethnic fashion. With flagship stores located in the heart of Chandni Chowk, Delhi, we offer our customers an immersive experience of the rich tapestry of Indian textiles and craftsmanship.",
    image:image4,
    description_2:"Understanding the evolving dynamics of the fashion industry, ISHUM has embraced digital platforms to connect with a global audience. Our online store provides a seamless shopping experience, allowing customers worldwide to explore and purchase our curated collections from the comfort of their homes.",
    description_3:"Our commitment to quality and authenticity has garnered a loyal customer base across continents. Through strategic collaborations and a robust supply chain, ISHUM ensures timely deliveries and exceptional service, reinforcing our dedication to customer satisfaction.",
  },
];

function LabsPage() {
  function SectionCard({ title, description, description_2, description_3, image, reverse }) {
    return (
      <div className={`LabPage-section-card ${reverse ? "reverse" : ""}`}>
        {!reverse && (
          <div className="LabPage-text-content">
            <h2>{title}</h2>
            <p>{description}</p>
            <p>{description_2}</p>
            <p>{description_3}</p>
          </div>
        )}
        <section className="CBSE-IMAGE-SECTION-Contains">
          <img src={image} alt={title} className="LabPage-section-image" />
        </section>
        {reverse && (
          <div className="LabPage-text-content">
            <h2>{title}</h2>
            <p>{description}</p>
            <p>{description_2}</p>
            <p>{description_3}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="LabPage-app-container">
      <Header />
      {sections.map((sec, index) => (
        <SectionCard
          key={index}
          title={sec.title}
          description={sec.description}
          description_2={sec.description_2}
          description_3={sec.description_3}
          image={sec.image}
          reverse={index % 2 !== 0}
        />
      ))}
    </div>
  );
}

export default LabsPage;

