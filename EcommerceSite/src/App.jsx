import React from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import FilledCart from './Component/IshumCart/FilledCart';
import Navbar from './Component/Navbar';
import Home from './Pages/LandingPage';
import './App.css'
import Footer from './Component/Footer';
import Login from "./Component/B-TO-C-Login/LoginUser"; 
import BestSeller from "./Component/BestSeller/BestSellerCom1"; 
import MyOrder from './Component/MyOrder/MyOrder';
import Shipping from './Component/IshumCart/ShippingCartCom1';
import Collection from './Component/Ishum-AdminPanel/CollectionPanel';
import Product from './Component/Ishum-AdminPanel/ProductPanel-1';
import Review from './Component/ReviewCustomer/ReviewCustomer';
import Tale from './Component/Tale/Tale';
import Legacy from './Component/Legacy/Legacy';
import SearchBar from './Component/Landing/SearchMobileView/SearchMobile';
import MobileLogin from './Component/B-TO-C-Login/MobileLoginPage/MobileLogin';
import UserAccount from './Pages/MyProfilePage';
import IshumExclusive from './Pages/IshumExclusivePage';
import GULZAAR from './Component/IshumExclusive/IshumExclusiveCom2';
import RANGREZ from './Component/IshumExclusive/IshumExclusiveCom3';
import UNVEILRIWAYAT from './Component/IshumExclusive/IshumExclusiveCom5';
import NOOREDITS from './Component/IshumExclusive/IshumExclusiveCom4';
import COLLECTION from './Pages/Collection';
import ViewProduct from './Pages/ViewProduct-Review';
import CollectionPage from "./Component/Collection/CollectionCom3";
import OnlineOrders from "./Pages/Admin/OnlineOrders"

import OrderConformation from "./Component/MyOrder/OrderConformation";
import OrderTracking from "./Component/MyOrder/OrderTracking";
import DHOTI from './Component/BestSeller/Btn-Comp-Bestseller/Dhoti';
import SUITS from './Component/BestSeller/Btn-Comp-Bestseller/Suits';
import ANARKALIS from './Component/BestSeller/Btn-Comp-Bestseller/Anarkali';
import CORDSETS from './Component/BestSeller/Btn-Comp-Bestseller/Co-ordset';



function App() {

  return (
     <Router>
      <Navbar />
     <Routes>
     <Route path="/"  element={<Home />}></Route>
      <Route path="/login"  element={<Login />}></Route>
      <Route path="/bestsellers"  element={<BestSeller />}></Route>
      <Route path="/Cart"  element={<FilledCart />}></Route>
      <Route path="/MyOrder"  element={<MyOrder />}></Route>
      <Route path="/Shipping"  element={<Shipping />}></Route>
      <Route path="/addcollection"  element={<Collection />}></Route>
      <Route path="/product"  element={<Product />}></Route>
      <Route path="/addproduct"  element={<Product />}></Route>
      <Route path="/review"  element={<Review />}></Route>
      <Route path="/Tale"  element={<Tale />}></Route>
      <Route path="/Legacy"  element={<Legacy />}></Route>
      <Route path="/Search-Bar"  element={<SearchBar />}></Route>
      <Route path="/Login-mobile-profile"  element={<MobileLogin />}></Route>
      <Route path="/Profile"  element={<UserAccount />}></Route>
      <Route path="/Ishum-Exclusive"  element={<IshumExclusive />}></Route>
      <Route path="/Ishum-Exclusive-Gulzar"  element={<GULZAAR />}></Route>
      <Route path="/Ishum-Exclusive-Rangrez"  element={<RANGREZ />}></Route>
      <Route path="/Ishum-Exclusive-Noor-Edits"  element={<NOOREDITS />}></Route>
      <Route path="/Ishum-Exclusive-Unveil-Riwayat"  element={<UNVEILRIWAYAT />}></Route>
      <Route path="/Collection" element={<COLLECTION />}></Route>
      <Route path="/co-page/:title" element={<CollectionPage />} />
      <Route path="/Viewproduct" element={<ViewProduct />} />
      <Route path="/Admin/online-orders" element={<OnlineOrders />} />

      
      {/* <Route path="/Ishum-Bestseller-Dhoti"  element={<DHOTI />}></Route>
      <Route path="/Ishum-Bestseller-Suits"  element={<SUITS />}></Route>
      <Route path="/Ishum-Bestseller-Cordsets"  element={<CORDSETS />}></Route>
      <Route path="/Ishum-Bestseller-Anarkali"  element={<ANARKALIS />}></Route> */}

     </Routes>
     <Footer />
     </Router>
  )
}

export default App



