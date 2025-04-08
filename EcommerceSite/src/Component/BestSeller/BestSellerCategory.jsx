import React, { useState } from "react";
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
            {["Silver", "Alumu", "Jahak", "Firet"].map((item) => (
              <li key={item} onClick={() => handleSelection("category", item)}>
                <input
                  type="radio"
                  name="category"
                  checked={selected["category"] === item}
                  onChange={() => handleSelection("category", item)}
                />
                {item}
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
            {["Silver", "Alumu", "Jahak", "Firet"].map((item) => (
              <li key={item} onClick={() => handleSelection("subcategory", item)}>
                <input
                  type="radio"
                  name="subcategory"
                  checked={selected["subcategory"] === item}
                  onChange={() => handleSelection("subcategory", item)}
                />
                {item}
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
            {["In Stock", "Out of Stock"].map((item) => (
              <li key={item} onClick={() => handleSelection("availability", item)}>
                <input
                  type="radio"
                  name="availability"
                  checked={selected["availability"] === item}
                  onChange={() => handleSelection("availability", item)}
                />
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
      </>
  );
}
