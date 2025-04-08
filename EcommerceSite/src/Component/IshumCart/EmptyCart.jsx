import React from "react";
import Img1 from '../../images/CartImageshop.svg';
import '../../Style-CSS/IshumCart-css/EmptyCart.css'
import { useNavigate } from "react-router-dom";

const EmptyCart = ()=>{
   const navigate = useNavigate();

    return(
        <div className="EmptyCart-Container">
             <div className="EmptyCart-Content">
                <h2>Your Cart Is Empty</h2>
                  <img src={Img1} alt="" />
                  <p>Take a moment to unwind while we bring you the finest cultural attire</p>
                  <button className="Start-Shopping"  onClick={() => navigate("/AddCart")}>Start Shopping</button>
             </div>
        </div>
    )
}
export default EmptyCart;