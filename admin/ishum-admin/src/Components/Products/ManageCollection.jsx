import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../CSS/ManageCollection.css';

const ManageCollection = () => {
  const [collections, setCollections] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCollection, setNewCollection] = useState('');
  const [imageFile, setImageFile] = useState(null);


  // src/utils/api.js
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';


    useEffect(() => {
      const fetchCollections = async () => {
        try {
          const res = await axios.get(`${baseURL}/api/get-collections`);
          setCollections(res.data); // Make sure API returns array of { title, image, createdAt }
        } catch (err) {
          console.error("Error fetching collections:", err);
        }
      };
  
      fetchCollections();
    }, []);


    
  const handleAddCollection = async () => {
    if (!newCollection.trim() || !imageFile) {
      alert("Collection name and image are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", newCollection);
    formData.append("image", imageFile);

    try {
      const res = await axios.post(`${baseURL}/api/add-collections`,  formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      setCollections(prev => [...prev, res.data]); // Assuming backend returns the new collection
      setNewCollection('');
      setImageFile(null);
      setShowModal(false);
    } catch (error) {
      console.error("Error adding collection:", error);
      alert("Error adding collection");
    }
  };

  const handleDelete = (name) => {
    const confirmDelete = window.confirm(`Delete "${name}" collection?`);
    if (confirmDelete) {
      setCollections(collections.filter((c) => c.title !== name));
    }
  };

  return (
    <div className="manage-collection-container">
      <div className="collection-header">
        <h2>Manage Collections</h2>
        <button onClick={() => setShowModal(true)}>Add Collection</button>
      </div>

      <div className="collection-list">
        {collections.map((collection, index) => (
          <div className="collection-item" key={index}>
            <div>
            <strong>{collection.title || "No Title"}</strong>
     {collection.image && (
      <img
        src={`${baseURL}${collection.image}`}
        alt={collection.title}
        style={{ width: "80px", marginTop: "8px" }}
       />
       )}

            </div>
            <button onClick={() => handleDelete(collection.title)}>Remove</button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Collection</h3>
            <input
              type="text"
              placeholder="Collection Name"
              value={newCollection}
              onChange={(e) => setNewCollection(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
            <div className="modal-actions">
              <button onClick={handleAddCollection}>Save</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCollection;
