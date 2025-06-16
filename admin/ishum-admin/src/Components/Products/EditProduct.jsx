import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../CSS/EditProduct.css';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    thumbnails: [],
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [selectedThumbnails, setSelectedThumbnails] = useState([]);
  const [previewThumbnails, setPreviewThumbnails] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/products/get-product-by-id/${id}`).then((res) => {
      const { title, price, description, image, thumbnails } = res.data.product;
      setFormData({ title, price, description, image, thumbnails });
      setPreview(`http://localhost:4000/uploads/${image}`);
      if (thumbnails?.length > 0) {
        setPreviewThumbnails(thumbnails.map(t => `http://localhost:4000/uploads/${t}`));
      }
    });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleThumbnailsChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedThumbnails(files);
    setPreviewThumbnails(files.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('price', formData.price);
    data.append('description', formData.description);

    if (selectedImage) {
      data.append('image', selectedImage);
    }

    selectedThumbnails.forEach((file) => {
      data.append('thumbnails', file); // Multer will collect this as an array
    });

    try {
      await axios.put(`http://localhost:4000/api/products/update/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/manage-products');
    } catch (err) {
      console.error(err);
      alert('Update failed!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-product-form">
      <input
        name="title"
        value={formData.title || ''}
        onChange={handleChange}
        placeholder="Title"
        className="edit-product-input"
      />
      <input
        name="price"
        value={formData.price || ''}
        onChange={handleChange}
        placeholder="Price"
        className="edit-product-input"
      />
      <textarea
        name="description"
        value={formData.description || ''}
        onChange={handleChange}
        placeholder="Description"
        className="edit-product-textarea"
      />

      <div className="edit-product-image-section">
        <label>Main Image Preview:</label>
        {preview && <img src={preview} alt="Main Preview" className="edit-product-preview" />}
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>

      <div className="edit-product-image-section">
        <label>Thumbnails Preview:</label>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {previewThumbnails.map((src, i) => (
            <img key={i} src={src} alt={`thumb-${i}`} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
          ))}
        </div>
        <input type="file" accept="image/*" multiple onChange={handleThumbnailsChange} />
      </div>

      <button type="submit" className="edit-product-button">Update</button>
    </form>
  );
};

export default EditProduct;


