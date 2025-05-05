import React, { useState } from 'react';
import '../../CSS/ManageCollection.css';

const initialCollections = [
  { name: 'Rangrez', createdAt: new Date() },
  { name: 'Noor', createdAt: new Date() },
  { name: 'Gulzzar', createdAt: new Date() },
  { name: 'Rajwada Riwaz', createdAt: new Date() },
];

const ManageCollection = () => {
  const [collections, setCollections] = useState(initialCollections);
  const [showModal, setShowModal] = useState(false);
  const [newCollection, setNewCollection] = useState('');

  const handleAddCollection = () => {
    if (!newCollection.trim()) return;

    const exists = collections.some(
      (c) => c.name.toLowerCase() === newCollection.toLowerCase()
    );
    if (exists) {
      alert('Collection already exists');
      return;
    }

    const updated = [
      ...collections,
      { name: newCollection, createdAt: new Date() },
    ];
    setCollections(updated);
    setNewCollection('');
    setShowModal(false);
  };

  const handleDelete = (name) => {
    const confirmDelete = window.confirm(`Delete "${name}" collection?`);
    if (confirmDelete) {
      setCollections(collections.filter((c) => c.name !== name));
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
              <strong>{collection.name}</strong>
              <div className="timestamp">
                Created: {collection.createdAt.toLocaleString()}
              </div>
            </div>
            <button onClick={() => handleDelete(collection.name)}>
              Remove
            </button>
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
