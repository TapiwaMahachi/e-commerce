import React, { useEffect, useState } from "react";
import StarIcon from "@material-ui/icons/Star";

import { Link, useParams } from "react-router-dom";
import "../css/_productDesc.scss";
import { useStateValue} from "../StateProvider";
import { db } from "../firebase";
import facebook from '../img/icons8-facebook.svg';
import twitter from '../img/icons8-twitter.svg';


function ProductDescription() {
     
  //hook for the basket
  const [, dispatch] = useStateValue();
  //hook for the product
  const [product, setProduct]= useState([]);
  const [quantity, setQuantity] = useState(1);
  
  //hook to get id from the url used to search the product in the db
   const {id} = useParams();

//need to fix all products in the db must have quantity
    //function for adding to cart
    function addToCart(){
       dispatch({
         type: "ADD_TO_CART",
         payload: 
            { ...product[0], quantity: quantity },   
              
       });
    }
   
    //search the product in the database based on id passed to the router
    useEffect(() =>{
      //search the product
      //this method is faster
     const unsubscribe = db.collection('stock').onSnapshot(snapshot =>
        setProduct(snapshot.docs.map(doc => 
            ({id: doc.id, ...doc.data()}))
            .filter(data => id ===data.id)));
     
        return () => unsubscribe;

    },[id])//dependecy to search when changed

  return (
  
    <section>
      { product.length && (
     
      <div className="productDescription">
        <div className="productDescription__page flex-c">
          <div className="productDescription__top flex-r">
            <div className="productDescription__image">
              <Link to="/product" className="productDescription__link">
                <img
                  src={product[0].image}
                  alt="me"
                  className="image"
                ></img>
              </Link>
            </div>
            <div className="productDescription__info">
                <h2
                  className="productDescription__title"
                  data-attribute={product[0].title}
                >
                {product[0].title}
                </h2>
                <div className="productDescription__seller">
                  <span>by</span>
                      <Link to="/" className="productDescription__sellerLink">
                        <span className="seller">{product[0].seller}</span>
                      </Link> 
                  </div>     
                <div className="productDescription__price">
                  <small>{`$`}</small>
                  <span>{product[0].price}</span>
                </div>
                <span className="productDescription__rating">
                  {Array(product[0].rating)
                    .fill()
                    .map((_, i) => (
                      <StarIcon key={i} className="rating__icon" />
                    ))}
                </span>
            </div>
          </div>
            <div className="productDescription__bottom">
              <h2 className="about">About the Product</h2>
              <ul className="product__description">
                {product[0].description.map((desc,index)=><li key={index}>{desc}</li>)}
              </ul>
            </div>
          </div>
          <div className="right flex-c">
            <div className="product__buy">
                <div>
                  <small>{`$`}</small>
                  <span>{product[0].price}</span>
                </div>
                <h3>Arrival Date : enter date her</h3>
                <div>
                  {product[0].stocked ? <h3 className="inStock">In Stock.</h3> : <h3 className="outOfStock">Out of stock.</h3> }
                </div>
            {/* <Quantiy id={id} quantity={adjustQuantity}/> needs revis */}
               <div className="product__qty">
                 <label>Qty:</label>
                 <input type="number" name="number" max="30" min="1" defaultValue="1" />
               </div>
               <div className="btns">
                  <button className="add__toCart" disabled={!product[0].stocked} onClick={addToCart}>
                    Add to shopping cart
                  </button>
                  <button className="add__toWishList">Add to Wish List</button>
               </div>
                
            </div>
            <div className="share flex-r">
              <a href='home'>Share</a>
              <a href="facebook">
                <img src={facebook} alt="facebook"></img>
              </a>
              <a href="twitter">
                <img src={twitter} alt="twitter"></img>
              </a>
            </div>
          </div>
          
      </div>
      )}
    </section>
  );
}

export default ProductDescription ;
