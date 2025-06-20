import Comp1 from "../Component/ProductPage/ViewProduct";
import Comp2 from "../Component/ProductPage/UserReview";
import Comp3 from "../Component/ProductPage/UserReviewlist";
import Comp4 from "../Component/ProductPage/AllProducts";
const Collection = () => {

  
  
    return (
        <div className="Landing-Components">
         
      
            <Comp1 />

        <Comp4 />
         
            <Comp2 />
     
            <Comp3 />

       
     
       
        </div>
    );
  };
  
  export default Collection;