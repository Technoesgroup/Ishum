import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style-CSS/Category.css";
import img1 from '../images/banarshi-2a.webp';
import img2 from '../images/Co-ord_set_Logo.webp'
import img3 from '../images/Sharara_Logo.webp'
import img4 from '../images/Suits_Logo.webp'
import img5 from '../images/Suits_Logo.webp'
import axios from "axios";
// import Cards from "../Component/ShowFrontend";

const categories = [
    { name: "Suits", image: img1 },
    { name: "Anarkali Suits", image: img2 },
    { name: "Sharara Suits", image:img3},
    { name: "Kaftan", image: img4},
    { name: "Co-ord Set", image: img5}
];

const Categories = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:4000/GetCards");
            if (response.data.success) {
                setData(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <>
        <div className="categories-container">
            <h2>Our Categories</h2>
            <div className="categories-grid">
                {categories.map((category) => (
                    <div  key={category.name} className="category-card" onClick={() => navigate(`/category/${category.name.toLowerCase()}`)}
                    >
                        <img src={category.image} alt={category.name} />
                        <p>{category.name} →</p>
                    </div>
                ))}
            </div>
        </div>


        <div className="cards-container">
            {data.map((item, index) => (
                <div key={index} className="card">
                    <img src={`http://localhost:4000${item.image}`} alt={item.name} className="card-image" />
                    <h2 className="card-title">{item.name}</h2>
                    <p className="card-description">{item.description}</p>
                    <p className="card-price">Price: {item.price}</p>
                </div>
            ))}
        </div>
 
        </> 
    );
};

export default Categories;
