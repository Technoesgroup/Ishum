import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { useAuth } from '../../ContextApiCart/LoginContextApi'; // 🔁 Update the path if needed
import '../../Style-CSS/ProductPage/ReviewForm.css';

const ReviewForm = ({ onClose, productId }) => {
  const { token, user, isLoggedIn } = useAuth(); // ✅ use auth context

  const [formData, setFormData] = useState({
    rating: 5,
    title: '',
    content: '',
    image: '',
    name: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setFormData((prev) => ({ ...prev, image: file }));
    },
    multiple: false,
    accept: 'image/*',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn || !token) {
      alert('You must be logged in to submit a review.');
      return;
    }

    const data = new FormData();
    data.append('rating', formData.rating);
    data.append('title', formData.title);
    data.append('content', formData.content);
    data.append('name', formData.name);
    data.append('location', formData.location);
    data.append('date', formData.date);
    data.append('productId', productId);
    data.append('userId', user?._id); // ✅ Use user from context

    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      await axios.post('http://localhost:4000/api/create-reviews', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Review submitted successfully!');
      onClose();
    } catch (err) {
      console.error('Error submitting review:', err);
      alert('Failed to submit review');
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3>Write a Review</h3>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        onChange={handleChange}
        value={formData.name}
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        onChange={handleChange}
        value={formData.location}
        required
      />
      <input
        type="text"
        name="title"
        placeholder="Review Title"
        onChange={handleChange}
        value={formData.title}
        required
      />
      <textarea
        name="content"
        placeholder="Your Review"
        onChange={handleChange}
        value={formData.content}
        required
      />

      <div {...getRootProps()} className="dropzone-container">
        <input {...getInputProps()} />
        <p>Drag & drop an image here, or click to select</p>
      </div>

      {formData.image && (
        <img
          src={URL.createObjectURL(formData.image)}
          alt="Review"
          className="image-preview"
        />
      )}

      <select name="rating" onChange={handleChange} value={formData.rating}>
        {[5, 4, 3, 2, 1].map((r) => (
          <option key={r} value={r}>
            {r} ★
          </option>
        ))}
      </select>

      <div className="form-buttons">
        <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;




