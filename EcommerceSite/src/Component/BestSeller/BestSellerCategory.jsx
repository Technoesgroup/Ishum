import React from "react";
import '../../Style-CSS/BestSeller-css/BestSellerCom1.css';
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export default function BestSellerFilters({ openDropdown, handleToggle, selected, handleSelection }) {
  return (
    <>
      {/* Category */}
      <div className="Category-content" onClick={() => handleToggle("category")}>
        <h2>
          Category <KeyboardArrowRightIcon />
        </h2>
        {openDropdown === "category" && (
          <ul className="Catergories-dropdown">
            {["Day Wear", "Occasional Wear", "Party Wear"].map((item, index) => (
              <li key={item}>
                <input
                  type="radio"
                  id={`category-${index}`}
                  name="category"
                  checked={selected["category"] === item}
                  onChange={() => handleSelection("category", item)}
                />
                <label htmlFor={`category-${index}`}>{item}</label>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Sub Category */}
      <div className="SubCategory-content" onClick={() => handleToggle("subcategory")}>
        <h2>
          Sub Category <KeyboardArrowRightIcon />
        </h2>
        {openDropdown === "subcategory" && (
          <ul className="Catergories-dropdown">
            {["Anarkali", "Co-ord sets", "Dress", "Fusion wear", "Sharara Suits", "Indo Western"].map((item, index) => (
              <li key={item}>
                <input
                  type="radio"
                  id={`subcategory-${index}`}
                  name="subcategory"
                  checked={selected["subcategory"] === item}
                  onChange={() => handleSelection("subcategory", item)}
                />
                <label htmlFor={`subcategory-${index}`}>{item}</label>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Availability */}
      <div className="Availability-content" onClick={() => handleToggle("availability")}>
        <h2>
          Availability <KeyboardArrowRightIcon />
        </h2>
        {openDropdown === "availability" && (
          <ul className="Catergories-dropdown">
            {["In Stock", "Out of Stock"].map((item, index) => (
              <li key={item}>
                <input
                  type="radio"
                  id={`availability-${index}`}
                  name="availability"
                  checked={selected["availability"] === item}
                  onChange={() => handleSelection("availability", item)}
                />
                <label htmlFor={`availability-${index}`}>{item}</label>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
