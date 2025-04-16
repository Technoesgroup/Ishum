import React from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import FilledCart from './Component/IshumCart/FilledCart';
import Navbar from './Component/Navbar';
import Home from './Pages/LandingPage';
import './App.css'
import Footer from './Component/Footer';
import Login from "./Component/B-TO-C-Login/LoginUser"; 
import BestSeller from "./Component/BestSeller/BestSellerCom1"; 
import Cart from './Component/IshumCart/EmptyCart';
import MyOrder from './Component/MyOrder/MyOrder';
import Shipping from './Component/IshumCart/ShippingCartCom1';
import Collection from './Component/Ishum-AdminPanel/CollectionPanel';
import Product from './Component/Ishum-AdminPanel/ProductPanel-1';
import Review from './Component/ReviewCustomer/ReviewCustomer';
import Tale from './Component/Tale/Tale';
import Legacy from './Component/Legacy/Legacy';
import SearchBar from './Component/Landing/SearchMobileView/SearchMobile';
import MobileLogin from './Component/B-TO-C-Login/MobileLoginPage/MobileLogin';


function App() {

  return (
     <Router>
      <Navbar />
     <Routes>
     <Route path="/"  element={<Home />}></Route>
      <Route path="/login"  element={<Login />}></Route>
      <Route path="/bestsellers"  element={<BestSeller />}></Route>
      <Route path="/AddCart"  element={<FilledCart />}></Route>
      <Route path="/Cart"  element={<Cart />}></Route>
      <Route path="/MyOrder"  element={<MyOrder />}></Route>
      <Route path="/Shipping"  element={<Shipping />}></Route>
      <Route path="/collection"  element={<Collection />}></Route>
      <Route path="/product"  element={<Product />}></Route>
      <Route path="/review"  element={<Review />}></Route>
      <Route path="/Tale"  element={<Tale />}></Route>
      <Route path="/Legacy"  element={<Legacy />}></Route>
      <Route path="/Search-Bar"  element={<SearchBar />}></Route>
      <Route path="/Login-mobile-profile"  element={<MobileLogin />}></Route>
     </Routes>
     <Footer />
     </Router>
   
       
  
  )
}

export default App
