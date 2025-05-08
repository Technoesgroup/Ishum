import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';  // Importing react-dropzone
import '../../Style-CSS/ProductPage/ReviewForm.css'; // optional for styling

const ReviewForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    rating: 5,
    title: '',
    content: '',
    image: '',
    name: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
  });

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Dropzone functionality for image upload
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0]; // Taking the first image
      const fileUrl = URL.createObjectURL(file);  // Create an object URL for the image
      setFormData((prev) => ({ ...prev, image: file })); // Storing the image file in the form data
    },
    multiple: false, // Only allowing one image at a time
    accept: 'image/*', // Accepting only images
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create FormData instance
    const data = new FormData();
    data.append('rating', formData.rating);
    data.append('title', formData.title);
    data.append('content', formData.content);
    data.append('name', formData.name);
    data.append('location', formData.location);
    data.append('date', formData.date);
    
    if (formData.image) {
      // Append image as file
      const file = formData.image;
      data.append('image', file);
    }

    try {
      await axios.post('http://localhost:4000/api/create-reviews', data, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure correct content type
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
      <input type="text" name="name" placeholder="Your Name" onChange={handleChange} required />
      <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
      <input type="text" name="title" placeholder="Review Title" onChange={handleChange} required />
      <textarea name="content" placeholder="Your Review" onChange={handleChange} required />
      
      {/* Dropzone for image upload */}
      <div {...getRootProps()} className="dropzone-container">
        <input {...getInputProps()} />
        <p>Drag & drop an image here, or click to select</p>
      </div>
      
      {/* Show selected image preview */}
      {formData.image && <img src={URL.createObjectURL(formData.image)} alt="Review" className="image-preview" />}
      
      <select name="rating" onChange={handleChange} value={formData.rating}>
        {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} ★</option>)}
      </select>

      <div className="form-buttons">
        <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
};

export default ReviewForm;


