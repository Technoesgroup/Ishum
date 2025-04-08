import React, { useState } from 'react';
import '../Style-CSS/AdminPannel.css';
import asset from '../images/Upload-Icon-Image-Transparent-Image.png';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Suits"
    });

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const changeHandle = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("price", Number(data.price));
        formData.append("image", image);

        try {
            const response = await axios.post("http://localhost:4000/AddCards", formData);
            if (response.data.success) {
                setData({ name: "", description: "", price: "", category: "suit" });
                setImage(null);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error){
            console.error(error);
            toast.error("Failed to add product");
        }
    };

    return (
        <div className="add">
            <form onSubmit={onSubmitHandler} className="flex-col">
                <div className="add-img-upload flex-col">
                    <p>Upload image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : asset.upload_area} alt='' />
                    </label>
                    <input type="file" id="image" onChange={handleImageChange}  required />
                </div>
                <div className="add-product-name ">
                    <p>Product name</p>
                    <input type="text" onChange={changeHandle} value={data.name} name="name" placeholder="Type here" required />
                </div>
                <div className="add-product-description ">
                    <p>Product description</p>
                    <textarea name="description" onChange={changeHandle} value={data.description} rows="6" placeholder="Write content here" required />
                </div>
                <div className="add-category-price">
                    <div className="add-category ">
                        <p>Product category</p>
                        <select onChange={changeHandle} name="category" id="category" value={data.category}>
                            <option value="Suits">Suits</option>
                            <option value="Anarkali Suits">Anarkali Suits</option>
                            <option value="Sharara Suits">Sharara Suits</option>
                            <option value="Kaftan">Kaftan</option>
                            <option value="Co-ord Set">Co-ord Set</option>
                            <option value="blouse">blouse</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product price</p>
                        <input type="number" onChange={changeHandle} value={data.price} name="price" placeholder="₹20" />
                    </div>
                </div>
                <button type="submit" className="add-btn">Add</button>
            </form>
        </div>
    );
};

export default Add;

