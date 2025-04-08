// ColorSection.js
import React, { useState } from "react";
import '../../Style-CSS/BestSeller-css/BestSellerCom1.css';
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const colors = [
  { name: "Grey", hex: "#BEBEBE" },
  { name: "Dark Red", hex: "#8B0000" },
  { name: "Green", hex: "#00FF7F" },
  { name: "Red", hex: "#FF0000" },
  { name: "Yellow", hex: "#FFD700" },
  { name: "Pink", hex: "#FF1493" },
  { name: "Purple", hex: "#4B0082" },
  { name: "Maroon", hex: "#800000" },
  { name: "Cyan", hex: "#00CED1" },
  { name: "Gray", hex: "#696969" },
  { name: "Salmon", hex: "#FA8072" },
  { name: "Orange", hex: "#FF8C00" },
  { name: "Teal", hex: "#008080" },
  { name: "Turquoise", hex: "#40E0D0" },
  { name: "Bright Red", hex: "#FF0000" },
  { name: "Navy", hex: "#000080" },
  { name: "Brown", hex: "#8B4513" },
  { name: "Dark Green", hex: "#006400" },
  { name: "Light Grey", hex: "#D3D3D3" },
];

export default function ColorSection({ openDropdown, handleToggle }) {
  const [hoveredColor, setHoveredColor] = useState("Grey");

  return (
    <div className="Color-content" onClick={() => handleToggle("color")}>
      <h2>
        Color <KeyboardArrowRightIcon />
      </h2>
      {openDropdown === "color" && (
        <span className="bestSeller-Color-Container">
          <div className="bestSeller-Color-hover-box">{hoveredColor}</div>
          <div className="bestSeller-color-grid">
            {colors.map((color, index) => (
              <div
                key={index}
                className="bestSeller-color-circle"
                style={{ backgroundColor: color.hex }}
                onMouseEnter={() => setHoveredColor(color.name)}
              ></div>
            ))}
          </div>
        </span>
      )}
    </div>
  );
}