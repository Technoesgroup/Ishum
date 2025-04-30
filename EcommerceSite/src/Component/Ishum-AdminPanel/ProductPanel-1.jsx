import React, { useState } from "react";
import "../../Style-CSS/Ishum-AdminPanel/ProductAdminPanel.css";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    subcategory: "",
    color: "",
    discount: "",
    price: "",
    description: "",
    size: [],
    availability: "true",
    collectionName: "",
    isBestseller: false,
    isExclusive: false,
    isIshumStore: false,
  });

  const [mainImage, setMainImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [colorImages, setColorImages] = useState([]);
  const [thumbnailImages, setThumbnailImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      size: checked ? [...prev.size, value] : prev.size.filter((s) => s !== value),
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleColorImageChange = (index, type, value) => {
    const updated = [...colorImages];
    updated[index] = { ...updated[index], [type]: value };
    setColorImages(updated);
  };

  const addColorImage = () => {
    if (colorImages.length < 4) {
      setColorImages([...colorImages, { image: null, colorName: "" }]);
    }
  };

  const handleThumbnailChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + thumbnailImages.length <= 4) {
      setThumbnailImages([...thumbnailImages, ...files]);
    } else {
      alert("Max 4 thumbnail images allowed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (Array.isArray(val)) {
        val.forEach((item) => formData.append(`${key}[]`, item));
      } else {
        formData.append(key, val);
      }
    });
    
    formData.append("image", mainImage);

    console.log("Main image:", mainImage);
    
    colorImages.forEach((ci, index) => {
      formData.append("colorImages", ci.image);       // just the image
      formData.append("colorNames", ci.colorName);    // just the name
    });
    thumbnailImages.forEach((thumb) => {
      if (thumb) formData.append("thumbnails", thumb);
    });
    

    const res = await fetch("http://localhost:4000/api/products/add", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    alert(data.message);

    if (data.success) {
      setForm({
        name: "",
        category: "",
        subcategory: "",
        color: "",
        discount: "",
        price: "",
        description: "",
        size: [],
        availability: "true",
        collectionName: "",
        isBestseller: false,
        isExclusive: false,
        isIshumStore: false,
      });
      setMainImage(null);
      setPreview(null);
      setColorImages([]);
      setThumbnailImages([]);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        {/* ... existing inputs ... */}

        <label>Collection Names:</label>
        <select name="collectionName" value={form.collectionName} onChange={handleChange} required>
          <option value="">Select Collection</option>
          <option value="GulZaar">GulZaar</option>
          <option value="Rangrez">Rangrez</option>
          <option value="Noor Edits">Noor Edits</option>
          <option value="Rajwada riwaz">Rajwada riwaz</option>
          <option value="Eid">Eid</option>
          <option value="Karwa chauth">Karwa chauth</option>
          <option value="Jashn E Rang">Jashn E Rang</option>
          <option value="Unveli Riwayat">Unveli Riwayat</option>
          <option value="Co-ord sets">Co-ord sets</option>
          <option value="Diwali">Diwali</option>
          <option value="Anarkali">Anarkali</option>
          <option value="sharara">sharara</option>
        </select>

        <label>
          <input
            type="checkbox"
            name="isBestseller"
            checked={form.isBestseller}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, isBestseller: e.target.checked }))
            }
          />
          Mark as Bestseller
        </label>

        <label>
          <input
            type="checkbox"
            name="isExclusive"
            checked={form.isExclusive}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, isExclusive: e.target.checked }))
            }
          />
          Mark as Exclusive
        </label>


        <label>
          <input
            type="checkbox"
            name="isIshumStore"
            checked={form.isIshumStore}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, isIshumStore: e.target.checked }))
            }
          />
          Mark as isIshumStore
        </label>


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

        <label>Name</label>
        <input name="name" value={form.name} onChange={handleChange} required />

        <label>Without Discount Price</label>
        <input type="number" name="discount" value={form.discount} onChange={handleChange} required />

        <label>Original Price:</label>
        <input type="number" name="price" value={form.price} onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" value={form.description} onChange={handleChange} required />

        <label>Size:</label>
        <div className="sizes-container">
          <label><input type="checkbox" value="XS" onChange={handleCheckbox} checked={form.size.includes("XS")} /> XS</label>
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

        <label>Main Image:</label>
        <input type="file" accept="image/*" onChange={handleImage} required />
        {preview && <img src={preview} alt="preview" className="image-preview" />}

        <label>Color Images (Max 4):</label>
        {colorImages.map((ci, index) => (
          <div key={index}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleColorImageChange(index, "image", e.target.files[0])
              }
              required
            />
            <input
              type="text"
              placeholder="Color Name"
              value={ci.colorName}
              onChange={(e) =>
                handleColorImageChange(index, "colorName", e.target.value)
              }
              required
            />
          </div>
        ))}
        {colorImages.length < 4 && (
          <button type="button" onClick={addColorImage}>
            + Add Color Image
          </button>
        )}

<label>Thumbnails (Exactly 4):</label>
{[0, 1, 2, 3].map((i) => (
  <input
    key={i}
    type="file"
    accept="image/*"
    onChange={(e) => {
      const updated = [...thumbnailImages];
      updated[i] = e.target.files[0];
      setThumbnailImages(updated);
    }}
    required
  />
))}

<div className="thumbnail-preview">
  {thumbnailImages.map(
    (img, idx) =>
      img && (
        <img
          key={idx}
          src={URL.createObjectURL(img)}
          alt={`thumb-${idx}`}
          className="image-preview"
        />
      )
  )}
</div>


        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;


