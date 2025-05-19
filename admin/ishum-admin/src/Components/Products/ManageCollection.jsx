import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../CSS/ManageCollection.css';

const ManageCollection = () => {
  const [collections, setCollections] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCollection, setNewCollection] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [editingCollection, setEditingCollection] = useState(null);

  const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/get-collections`);
        setCollections(res.data);
      } catch (err) {
        console.error("Error fetching collections:", err);
      }
    };
    fetchCollections();
  }, []);

  const handleAddOrUpdateCollection = async () => {
    if (!newCollection.trim()) {
      alert("Collection name is required");
      return;
    }

    const formData = new FormData();
    formData.append("title", newCollection);
    if (imageFile) formData.append("image", imageFile);

    try {
      if (editingCollection && editingCollection._id) {
        const res = await axios.put(
          `${baseURL}/api/edit/${editingCollection._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        setCollections((prev) =>
          prev.map((col) =>
            col._id === editingCollection._id
              ? res.data.collection // use .collection based on your backend response
              : col
          )
        );
      } else {
        const res = await axios.post(`${baseURL}/api/add-collections`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setCollections((prev) => [...prev, res.data]);
      }

      // Reset state
      setNewCollection('');
      setImageFile(null);
      setEditingCollection(null);
      setShowModal(false);
    } catch (error) {
      console.error("Error saving collection:", error);
      alert("Error saving collection");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this collection?");
    if (confirmDelete) {
      try {
        await axios.delete(`${baseURL}/api/delete-collection/${id}`);
        setCollections((prev) => prev.filter((col) => col._id !== id));
      } catch (err) {
        console.error("Error deleting collection:", err);
        alert("Failed to delete");
      }
    }
  };

  const openEditModal = (collection) => {
    setNewCollection(collection.title || '');
    setImageFile(null);
    setEditingCollection(collection);
    setShowModal(true);
  };

  return (
    <div className="manage-collection-container">
      <div className="collection-header">
        <h2>Manage Collections</h2>
        <button onClick={() => {
          setNewCollection('');
          setImageFile(null);
          setEditingCollection(null);
          setShowModal(true);
        }}>
          Add Collection
        </button>
      </div>

      <div className="collection-list">
        {collections.map((collection, index) => (
          <div className="collection-item" key={collection._id || index}>
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
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => openEditModal(collection)}>Edit</button>
              <button onClick={() => handleDelete(collection._id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editingCollection ? "Edit Collection" : "Add New Collection"}</h3>
            <input
              type="text"
              placeholder="Collection Name"
              value={newCollection || ''}
              onChange={(e) => setNewCollection(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
            <div className="modal-actions">
              <button onClick={handleAddOrUpdateCollection}>
                {editingCollection ? "Update" : "Save"}
              </button>
              <button onClick={() => {
                setShowModal(false);
                setEditingCollection(null);
              }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCollection;

