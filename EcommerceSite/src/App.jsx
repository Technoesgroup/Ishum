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
import Review from './Component/ReviewCustomer/ReviewCustomer';
import Tale from './Component/Tale/Tale';
import Legacy from './Component/Legacy/Legacy';
import MobileLogin from './Component/B-TO-C-Login/MobileLoginPage/MobileLogin';
import UserAccount from './Pages/MyProfilePage';
import IshumExclusive from './Pages/IshumExclusivePage';
import COLLECTION from './Pages/Collection';
import ViewProduct from './Pages/ViewProduct-Review';
import CollectionPage from "./Component/Collection/CollectionCom3";
import OrderConformation from "./Component/MyOrder/OrderConformation";
import OrderTracking from "./Component/MyOrder/OrderTracking";
import MobileSearch from "./Component/Landing/SearchMobileView/SearchMobile";
import ScrollToTop from './Component/ScrollTop';
import ReturnPolicy from './Component/AllPolicies/ReturnPolicy';
import PrivacyPolicy from "./Component/AllPolicies/PrivacyPolicy"; 
import TearmsServices from './Component/AllPolicies/TearmsPolicy';
import  PaymentServices from './Component/AllPolicies/PaymentStatement';



function App() {

  return (
     <Router>
        <ScrollToTop />
      <Navbar />
     <Routes>
     <Route path="/"  element={<Home />}></Route>
      <Route path="/login"  element={<Login />}></Route>
      <Route path="/bestsellers"  element={<BestSeller />}></Route>
      <Route path="/Cart"  element={<FilledCart />}></Route>
      <Route path="/MyOrder"  element={<MyOrder />}></Route>
      <Route path="/Shipping"  element={<Shipping />}></Route>
      <Route path="/addcollection"  element={<Collection />}></Route>
      <Route path="/review"  element={<Review />}></Route>
      <Route path="/Tale"  element={<Tale />}></Route>
      <Route path="/Legacy"  element={<Legacy />}></Route>
      <Route path="/Login-mobile-profile"  element={<MobileLogin />}></Route>
      <Route path="/Profile"  element={<UserAccount />}></Route>
      <Route path="/Ishum-Exclusive"  element={<IshumExclusive />}></Route>
      <Route path="/Collection" element={<COLLECTION />}></Route>
      <Route path="/co-page/:title" element={<CollectionPage />} />
      <Route path="/Viewproduct" element={<ViewProduct />} />
      <Route path="/OrderConformation"  element={<OrderConformation />}></Route>
      <Route path="/OrderTracking"  element={<OrderTracking />}></Route>
      <Route path="/search"  element={<MobileSearch/>}></Route>
      <Route path="/PrivacyPolicy"  element={<PrivacyPolicy/>}> </Route>
      <Route path="/ReturnPolicy"  element={<ReturnPolicy/>}> </Route>
      <Route path="/PaymentServices"  element={<PaymentServices/>}> </Route>
      <Route path="/TearmsServices"  element={<TearmsServices/>}> </Route>
     </Routes>
     <Footer />
     </Router>
  )
}

export default App



