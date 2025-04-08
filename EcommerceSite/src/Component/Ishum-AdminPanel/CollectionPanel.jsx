import React, { useState, useEffect } from "react";
import "../../Style-CSS/Ishum-AdminPanel/CollectionPanel.css";
import axios from "axios";
import { toast } from "react-toastify";

const AdminPanel = () => {
    const [collections1, setCollections1] = useState([]);
    const [collections2, setCollections2] = useState([]);

    const [formData1, setFormData1] = useState({ title: "", image: null });
    const [formData2, setFormData2] = useState({ title: "", image: null });

    useEffect(() => {
        fetchCollections1();
        fetchCollections2();
    }, []);

    // Fetch collections from API 1
    const fetchCollections1 = async () => {
        try {
            const response = await axios.get("http://localhost:4000/collections");
            setCollections1(response.data);
        } catch (error) {
            console.error("Error fetching collections", error);
        }
    };

    // Fetch collections from API 2
    const fetchCollections2 = async () => {
        try {
            const response = await axios.get("http://localhost:4000/collectionsSec");
            setCollections2(response.data);
        } catch (error) {
            console.error("Error fetching collections", error);
        }
    };

    // Handle input change for Collection 1
    const handleChange1 = (event) => {
        const { name, value } = event.target;
        setFormData1({ ...formData1, [name]: value });
    };

    // Handle input change for Collection 2
    const handleChange2 = (event) => {
        const { name, value } = event.target;
        setFormData2({ ...formData2, [name]: value });
    };

    // Handle file upload for Collection 1
    const handleImageChange1 = (event) => {
        setFormData1({ ...formData1, image: event.target.files[0] });
    };

    // Handle file upload for Collection 2
    const handleImageChange2 = (event) => {
        setFormData2({ ...formData2, image: event.target.files[0] });
    };

    // Submit form for Collection 1
    const handleSubmit1 = async (event) => {
        event.preventDefault();
        const form = new FormData();
        Object.keys(formData1).forEach((key) => form.append(key, formData1[key]));

        try {
            await axios.post("http://localhost:4000/collections", form);
            toast.success("Collection 1 added successfully");
            fetchCollections1();
            setFormData1({ title: "", image: null });
        } catch (error) {
            console.error(error);
            toast.error("Failed to add Collection 1");
        }
    };

    // Submit form for Collection 2
    const handleSubmit2 = async (event) => {
        event.preventDefault();
        const form = new FormData();
        Object.keys(formData2).forEach((key) => form.append(key, formData2[key]));

        try {
            await axios.post("http://localhost:4000/collectionsSec", form);
            toast.success("Collection 2 added successfully");
            fetchCollections2();
            setFormData2({ title: "", image: null });
        } catch (error) {
            console.error(error);
            toast.error("Failed to add Collection 2");
        }
    };

    return (
        <div className="Collection-admin-panel">
            <h2>Collection List - 1</h2>
            <form onSubmit={handleSubmit1} className="Collection-add-form">
                <input type="text" name="title" value={formData1.title} onChange={handleChange1} placeholder="Collection Title" required />
                <input type="file" onChange={handleImageChange1} required />
                <button type="submit">Add Collection 1</button>
            </form>

            <h3>Collections - 1</h3>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {collections1.map((collection) => (
                        <tr key={collection._id}>
                            <td>{collection.title}</td>
                            <td>
                                <img src={`http://localhost:4000${collection.image}`} alt={collection.title} width="50" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Collection List - 2</h2>
            <form onSubmit={handleSubmit2} className="Collection-add-form">
                <input type="text" name="title" value={formData2.title} onChange={handleChange2} placeholder="Collection Title" required />
                <input type="file" onChange={handleImageChange2} required />
                <button type="submit">Add Collection 2</button>
            </form>

            <h3>Collections - 2</h3>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {collections2.map((collection) => (
                        <tr key={collection._id}>
                            <td>{collection.title}</td>
                            <td>
                                <img src={`http://localhost:4000${collection.image}`} alt={collection.title} width="50" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPanel;
