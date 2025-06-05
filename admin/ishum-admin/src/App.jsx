import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrdersDashboard from './Components/Orders/Orders';
import Sidebar from './Components/Basics/Sidebar';
// import Header from './Components/Basics/Header';
import './CSS/Styles.css';
import ManageCollection from './Components/Products/ManageCollection';
import AddProduct from './Components/Products/AddProduct'; 


const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          {/* <Header /> */}
          <Routes>
            <Route path="/" element={<OrdersDashboard />} />
            <Route path="/manage-collection" element={<ManageCollection />} />
            <Route path="/products/add-product" element={<AddProduct />} /> 


          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
