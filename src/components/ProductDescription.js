import React, { useEffect, useState } from "react";
import StarIcon from "@material-ui/icons/Star";

import { Link, useHistory, useParams } from "react-router-dom";
import "../css/_productDesc.scss";
import { useStateValue} from "../StateProvider";
import { db } from "../firebase";
import facebook from '../img/icons8-facebook.svg';
import twitter from '../img/icons8-twitter.svg';
import { button } from "@material-ui/core";



function ProductDescription() {
     
  //hook for the basket - from the context 
  const [{user}, dispatch] = useStateValue();
  //hook for adding state 
  const [data, setData]= useState({
    product: {},
    isLoading: true,
  });

  //assignment destructuring
  const {product , isLoading} = data;

  //hook to get id from the url and use the id to search the product in the db
   const {id} = useParams();
   //hook to redirect if user is not logged in
   const history = useHistory();

    //adding to cart if user is logged in or redirect to login page
    function addToCart(){
      if(user){
         dispatch({
          type: "ADD_TO_CART",
          payload: {...product, quantity: 1 },   
         });
      }else{
       history.push('/login')
      } 
    }
   
    //search the product in the database based on id passed via url
    useEffect(() =>{
      db.collection('stock').doc(id).get()
      .then(res => setData({isLoading: false, product: res.data()}))
    },[id])

  return(
    <section className="productDescription">
      {isLoading ? <Loading/> : <ViewProduct product={product} addToCart={addToCart}/>}
    </section>
  )
}

export default ProductDescription ;



 //product description component
function ViewProduct(props){

  const {product, addToCart} = props;

  return(
      <>
        <div className="productDescription__page flex-c">
          <div className="productDescription__top flex-r">
            <div className="productDescription__image">
              <Link to="/product" className="productDescription__link">
                <img
                  src={product.image}
                  alt="me"
                  className="image"
                ></img>
              </Link>
            </div>
            <div className="productDescription__info">
                <h2
                  className="productDescription__title"
                  data-attribute={product.title}
                >
                {product.title}
                </h2>
                <div className="productDescription__seller">
                  <span>by</span>
                      <Link to="/" className="productDescription__sellerLink">
                        <span className="seller">{product.seller}</span>
                      </Link> 
                  </div>     
                <div className="productDescription__price">
                  <small>$</small>
                  <span>{product.price}</span>
                </div>
                <span className="productDescription__rating">
                  {Array(product.rating)
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
                {product.description.map((desc,index)=><li key={index}>{desc}</li>)}
              </ul>
            </div>
          </div>
          <div className="right flex-c">
            <div className="product__buy">
                <div>
                  <small>{`$`}</small>
                  <span>{product.price}</span>
                </div>
                <h3>{`Arrival Date: ${new Date().getDate()}`}</h3>
                <div>
                  {product.stocked ? <h3 className="inStock">In Stock.</h3> : <h3 className="outOfStock">Out of stock.</h3> }
                </div>
               <div className="product__qty">
                 <label>Qty:</label>
                 <input type="number" name="number" max="30" min="1" defaultValue="1" />
               </div>
               <div className="btns">
                  <button
                    variant="contained"
                    color="primary" 
                    className="add__toCart"
                    disabled={!product.stocked}
                    onClick={addToCart}
                  >
                    Add to shopping cart
                  </button>
                  <button 
                  variant="contained"
                  color="primary"
                  type="submit"
                  >Add to Wish List</button>
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
      </>
    )
}
  //temmplate displayed when data is getting fetched from the db
function Loading(){
  return(
    <div 
      className="loading" 
      style={{width: "100%", height:"100%", textAlign:"center", marginTop: "2em"}}
    >
      <h2>Loading please wait.....</h2>
    </div>
   )
 }