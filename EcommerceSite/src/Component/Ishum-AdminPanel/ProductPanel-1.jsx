import React, { useState } from "react";
import "../../Style-CSS/Ishum-AdminPanel/ProductAdminPanel.css";

const AddProduct = () => {
  const [form, setForm] = useState({
    category: "",
    subcategory: "",
    color: "",
    price: "",
    description: "",
    size: [],
    availability: "true", 
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setForm((prev) => ({
        ...prev,
        size: [...prev.size, value],
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        size: prev.size.filter((s) => s !== value),
      }));
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("category", form.category);
    formData.append("subcategory", form.subcategory);
    formData.append("color", form.color);
    formData.append("price", form.price);
    formData.append("description", form.description);
    form.size.forEach((s) => formData.append("size[]", s));
    formData.append("image", image);
    formData.append("availability", form.availability); 

    const res = await fetch("http://localhost:4000/api/products/add", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    alert(data.message);
    if (data.success) {
      setForm({
        category: "",
        subcategory: "",
        color: "",
        price: "",
        description: "",
        size: [],
        availability: "true",
      });
      setImage(null);
      setPreview(null);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <label>Category:</label>
        <select name="category" value={form.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          <option value="Day Wear">Day Wear</option>
          <option value="Occasional Wear">Occasional Wear</option>
          <option value="Party Wear">Party Wear</option>
        </select>

        <label>Subcategory:</label>
        <select name="subcategory" value={form.subcategory} onChange={handleChange} required>
          <option value="">Select Subcategory</option>
          <option value="Anarkali">Anarkali</option>
          <option value="Sharara Suits">Sharara Suits</option>
          <option value="Indo Western">Indo Western</option>
          <option value="Fusion wear">Fusion wear</option>
          <option value="Dress">Dress</option>
          <option value="Co-ord sets">Co-ord sets</option>
        </select>

        <label>Color:</label>
        <select name="color" value={form.color} onChange={handleChange} required>
          <option value="">Select Color</option>
          <option value="#BEBEBE">Grey</option>
          <option value="#8B0000">Dark Red</option>
          <option value="#00FF7F">Green</option>
          <option value="#FF0000">Red</option>
          <option value="#FFD700">Yellow</option>
          <option value="#FF1493">Pink</option>
          <option value="#4B0082">Purple</option>
          <option value="#800000">Maroon</option>
          <option value="#00CED1">Cyan</option>
          <option value="#696969">Gray</option>
          <option value="#FA8072">Salmon</option>
          <option value="#FF8C00">Orange</option>
          <option value="#008080">Teal</option>
          <option value="#40E0D0">Turquoise</option>
          <option value="#FF0000">Bright Red</option>
          <option value="#000080">Navy</option>
          <option value="#8B4513">Brown</option>
          <option value="#006400">Dark Green</option>
          <option value="#D3D3D3">Light Grey</option>
        </select>

        <label>Image:</label>
        <input type="file" accept="image/*" onChange={handleImage} required />
        {preview && <img src={preview} alt="preview" className="image-preview" />}

        <label>Price:</label>
        <input type="number" name="price" value={form.price} onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" value={form.description} onChange={handleChange} required />

        <label>Size:</label>
        <div className="sizes-container">
          <label><input type="checkbox" value="X" onChange={handleCheckbox} checked={form.size.includes("X")} /> X</label>
          <label><input type="checkbox" value="L" onChange={handleCheckbox} checked={form.size.includes("L")} /> L</label>
          <label><input type="checkbox" value="XL" onChange={handleCheckbox} checked={form.size.includes("XL")} /> XL</label>
          <label><input type="checkbox" value="M" onChange={handleCheckbox} checked={form.size.includes("M")} /> M</label>
        </div>

        <label>Availability:</label>
        <select name="availability" value={form.availability} onChange={handleChange} required>
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;

