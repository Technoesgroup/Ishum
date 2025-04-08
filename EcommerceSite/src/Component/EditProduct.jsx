import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import '../Style-CSS/Editproduct.css'

const EditProduct = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { product } = location.state || {};

    const [editedProduct, setEditedProduct] = useState(product);

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:4000/EditCard/${editedProduct._id}`, editedProduct);
            navigate("/"); // Redirect back to product list
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    return (
        <div  className="editproduct">
            <h3>Edit Product</h3>
            <input
                type="text"
                value={editedProduct.name}
                onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
            />
            <textarea
                type="text" cols="22" rows="8"
                value={editedProduct.description}
                onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
            />
            <input
                type="text"
                value={editedProduct.category}
                onChange={(e) => setEditedProduct({ ...editedProduct, category: e.target.value })}
            />
            <input
                type="text"
                value={editedProduct.price}
                onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
            />
            <button className="Updatebutton-Product" onClick={handleUpdate}>Update</button>
        </div>
    );
};

export default EditProduct;
