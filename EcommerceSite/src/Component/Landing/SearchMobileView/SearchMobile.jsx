
import React, { useState, useEffect } from "react";
import "../../../Style-CSS/Landing-css/SearchMobileView/SearchMobile.css";
import { useLocation, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import Fillter from '../../../images/settings-sliders.png';
import Img1 from '../../../images/Col-2.svg';
import Img2 from '../../../images/Col-3.svg';
import Img3 from '../../../images/Col-4.svg';
import axios from 'axios';
import { useProduct } from "../../../ContextApiCart/ProductContextApi";

const MobileView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [recent, setRecent] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { setSelectedProduct } = useProduct();


  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const queryFromURL = new URLSearchParams(location.search).get('query');
    if (queryFromURL) {
      setSearchQuery(queryFromURL);
    }
  }, [location.search]);

  // Load recent searches
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    setRecent(history);
  }, []);

  // Fetch search results from backend
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim()) {
      axios.get(`${baseURL}/api/products/search?q=${searchQuery}`)
          .then(res => {
            if (Array.isArray(res.data)) {
              setResults(res.data);
            } else if (Array.isArray(res.data.products)) {
              setResults(res.data.products);
            } else {
              console.error("Unexpected response:", res.data);
              setResults([]);
            }
          })
          .catch(err => {
            console.error(err);
            setResults([]);
          });
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleSearch = (term) => {
    let history = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    history = [term, ...history.filter(t => t !== term)].slice(0, 5);
    localStorage.setItem('recentSearches', JSON.stringify(history));
    navigate(`/search?query=${term}`);
  };

  const removeRecent = (term) => {
    const updated = recent.filter(t => t !== term);
    setRecent(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const clearAllRecent = () => {
    setRecent([]);
    localStorage.removeItem('recentSearches');
  };

  return (
    <div className="Ishum-mobile-container">
      {/* Search Bar */}
      <div className="Ishum-mobile-search-wrapper">
        <input
          type="text"
          placeholder="Search"
          className="Ishum-mobile-search-input"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <SearchIcon
          className="Ishum-mobile-search-icon"
          onClick={() => handleSearch(searchQuery)}
        />
        <button className="Ishum-mobile-filter-btn">
          <div className="Ishum-mobile-Search-icon-div">
            <img src={Fillter} alt="" className="Ishum-mobile-Search-icon" />
          </div>
        </button>
      </div>

      {/* Recent Searches */}
      <div className="Ishum-mobile-recent-searches">
        <div className="Ishum-mobile-recent-header">
          <p>Recent Searches</p>
          <DeleteIcon className="Ishum-mobile-icon-small" onClick={clearAllRecent} />
        </div>
        <div className="Ishum-mobile-tags">
          {recent.map((term) => (
            <div key={term} className="Ishum-mobile-tag">
              <span onClick={() => handleSearch(term)}>{term}</span>
              <CloseIcon className="Ishum-mobile-icon-x" onClick={() => removeRecent(term)} />
            </div>
          ))}
        </div>
      </div>

      {/* Search Results */}
      {searchQuery.trim() && (
    <div className="Ishum-mobile-search-results">
    {results.length ? results.map((item) => (
      <div key={item._id} className="Ishum-mobile-search-item"    onClick={() => {
        setSelectedProduct(item); // store in context
        localStorage.setItem("selectedProduct", JSON.stringify(item)); // store in localStorage
        navigate("/Viewproduct"); // navigate to view page
      }}>
        <img
  loading="lazy"
  src={`${baseURL}/uploads/${item.image}`}
  alt={item.name}
  className="Ishum-mobile-popular-img"
/>
        <div className="Ishum-mobile-popular-info">
          <p  className="Name-of-product-serach">{item.name}</p>
          <p className="Ishum-mobile-text-muted">starting ₹{item.price}</p>
        </div>
      </div>
    )) : <p>No results found</p>}
  </div>
  
      )}

      {/* Popular this week */}
      <h2 className="Ishum-mobile-popular-heading">Popular this week</h2>
      <div className="Ishum-mobile-popular-scroll">
        {[{
          title: "Anarkalis",
          price: "@2999",
          img: Img1,
        }, {
          title: "Co-ord sets",
          price: "@2999",
          img: Img2,
        }, {
          title: "Suits",
          price: "@2999",
          img: Img3,
        }].map((item) => (
          <div key={item.title} className="Ishum-mobile-popular-card">
            <img src={item.img} alt={item.title} className="Ishum-mobile-popular-img" />
            <div className="Ishum-mobile-popular-info">
              <p>{item.title}</p>
              <p className="Ishum-mobile-text-muted">starting {item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileView;

