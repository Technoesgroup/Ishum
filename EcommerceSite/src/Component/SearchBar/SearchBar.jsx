import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "../../Style-CSS/SearchBar.css";
import img1 from '../../images/Col-3.svg'
import img2 from '../../images/Col-3.svg'
import img3 from '../../images/Col-3.svg'
import img4 from '../../images/Col-3.svg'

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setShowDropdown(e.target.value.trim().length > 0);
  };

  const suggestions = [
    "anarkali",
    "yellow viscose anarkali",
    "coffee brown viscose anarkali",
    "peacock blue viscose anarkali",
  ];

  const products = [
    {
      name: "Yellow Viscose Anarkali with Tulip Pant - Swara Collection",
      price: "10,656.00",
      image:img1 ,
    },
    {
      name: "Rajwada Riwaaz: Embrace Royalty with Cobalt Blue Anarkali Suit",
      price: "13,522.00",
      image: img2,
    },
    {
      name: "Rajwada Riwaaz: Embrace Royalty with Pink Anarkali Suit",
      price: "13,522.00",
      image:img3,
    },
    {
      name: "Peacock Blue Viscose Anarkali with Dhoti Pant - Swara Collection",
      price: "12,960.00",
      image: img4,
    },
  ];

  const filteredSuggestions = suggestions.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="Ishum-nav-search-wrapper">
      <input
        type="text"
        placeholder="Search"
        className="Ishum-nav-search-input"
        value={query}
        onChange={handleInputChange}
      />
      <SearchIcon className="Ishum-nav-search-icon" />

      {showDropdown && (
        <div className="search-dropdown">
          <div className="suggestions-section">
            <strong>SUGGESTIONS</strong>
            {filteredSuggestions.map((suggestion, idx) => (
              <div key={idx} className="suggestion-item">
                {suggestion}
              </div>
            ))}
          </div>

          <div className="products-section">
            <strong>PRODUCTS</strong>
            {filteredProducts.map((product, idx) => (
              <div key={idx} className="product-result">
                <img src={product.image} alt={product.name} />
                <div className="product-result-details">
                  <div>{product.name}</div>
                  <div>Rs. {product.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

