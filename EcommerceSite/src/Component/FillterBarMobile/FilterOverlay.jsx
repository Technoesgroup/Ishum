import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import '../../Style-CSS/SortFillter.css';
import { useFilter } from '../Context-API/Fillter-Context'; 
import { colors } from '../BestSeller/ColorSection'; // ✅ adjust path if needed




const FilterOverlay = ({ onClose }) => {
  const [activeFilter, setActiveFilter] = useState('Category');
  const { selected, handleSelection } = useFilter(); 
  const [loading, setLoading] = useState(false);
  const maxPrice = 50000;

  const handleRangeChange = (e) => {
    handleSelection('price', Number(e.target.value)); // ✅ Update context
  };

  return (
    <div className="SortFillter-filter-overlay">
      <div className="SortFillter-filter-sidebar">
        <ul className="SortFillter-filter-sidebar-list">
          <li 
            className={activeFilter === 'Category' ? "SortFillter-filter-selected" : ""}
            onClick={() => setActiveFilter('Category')}
          >
            Category
          </li>
          <li 
            className={activeFilter === 'SubCategory' ? "SortFillter-filter-selected" : ""}
            onClick={() => setActiveFilter('SubCategory')}
          >
            sub-Category
          </li>
          <li 
            className={activeFilter === 'Price' ? "SortFillter-filter-selected" : ""}
            onClick={() => setActiveFilter('Price')}
          >
            Price
          </li>
     <li 
  className={activeFilter === 'Color' ? "SortFillter-filter-selected" : ""}
  onClick={() => setActiveFilter('Color')}
>
  Color
</li>

          <li>Size</li>
          <li>Customer Ratings</li>
  <li 
  className={activeFilter === 'Availability' ? "SortFillter-filter-selected" : ""}
  onClick={() => setActiveFilter('Availability')}
>
  Availability
</li>

          <li>Discount <span className="SortFillter-count">1</span></li>
        </ul>
      </div>

      <div className="SortFillter-filter-content">
        <button onClick={onClose} className="SortFillter-close-btn">
          <CloseIcon />
        </button>

     {activeFilter === 'Category' && (
  <>
    <h3>Select Category</h3>
    <ul className="SortFillter-subcategory-list">
      {["Day Wear", "Occasional Wear", "Party Wear"].map((item, index) => (
        <li key={index} onClick={() => handleSelection('category', item)}>
          {item}
        </li>
      ))}
    </ul>
  </>
)}

{activeFilter === 'SubCategory' && (
  <>
    <h3>Select Sub Category</h3>
    <ul className="SortFillter-subcategory-list">
      {["Anarkali", "Co-ord sets", "Dress", "Fusion wear", "Indo Western", "Aline Suit", "Straight Suit"].map((item, index) => (
        <li key={index} onClick={() => handleSelection('tag', item)}>
          {item}
        </li>
      ))}
    </ul>
  </>
)}

        {activeFilter === 'Price' && (
          <div className="AllPrice-of-bestseller">
            <p className="firstparagraph">
              Price <KeyboardArrowRightIcon />
            </p>
            <input
              type="range"
              min="0"
              max={maxPrice}
              value={selected.price || 0}
              onChange={handleRangeChange}
              className="bestsellers-price-range"
            />
            <div className="two-input-minimax">
              <input type="text" value={`₹ 0`} readOnly /> <h4>-</h4>
              <input type="text" value={`₹ ${selected.price || 0}`} readOnly />
            </div>
          </div>
        )}


        {activeFilter === 'Color' && (
  <>
    <h3>Select Color</h3>
    <div className="SortFillter-color-list">
      {colors.map((color, index) => (
        <div
          key={index}
          className="SortFillter-color-box"
          title={color.name}
          style={{
            backgroundColor: color.hex,
            border: selected.color === color.name ? '2px solid #000' : '1px solid #ccc',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            cursor: 'pointer',
            margin: '5px',
          }}
          onClick={() => handleSelection('color', color.name)}
        />
      ))}
    </div>
  </>
)}

<button
  className="SortFillter-apply-btn"
  onClick={() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onClose(); // Close the overlay
    }, 1000); // 1 second delay
  }}
  disabled={loading} // Prevent double-click
>
  {loading ? (
    <>
      <span className="apply-spinner"></span> Applying...
    </>
  ) : (
    "Apply"
  )}
</button>

      </div>
    </div>
  );
};

export default FilterOverlay;



