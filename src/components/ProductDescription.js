import React, { useEffect, useState } from "react";
import StarIcon from "@material-ui/icons/Star";

import { Link, useParams } from "react-router-dom";
import "./ProductDescription.css";
import { useStateValue} from "../StateProvider";
import { db } from "../firebase";
import Quantiy from "./Quantiy";


function ProductDescription() {
     
  //hook for the basket
  const [, dispatch] = useStateValue();
  //hook for the product
  const [product, setProduct]= useState([]);
  const [quantity, setQuantity] = useState(1);
  
  //hook to get id from the url used to search the product in the db
   const {id} = useParams();

  //get Quanity
 const adjustQuantity = (qty) => {
    setQuantity(qty)
  }
  console.log(quantity)
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
        /*    //this is slower
      db.collection('products').doc(id)
          .get()
          .then(prod =>{
            if(!prod.exists) return;
            setProduct(prod.data())
          })
*/
        return () => unsubscribe;

    },[id])//dependecy to search when changed

  return (
  
    <>
      {
        product.length ? (
       <div className="productDescription__page">
       <div className="productDescription">
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
          <Link to="/product" className="productDescription__link">
            <h3
              className="productDescription__title"
              data-attribute={product[0].title}
            >
             {product[0].title}
            </h3>
          </Link>
                <span className="productDescription__seller">by
                  <Link to="/" className="productDescription__sellerLink">
                    <span className="seller">{product[0].seller}</span>
                  </Link> 
                </span>
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
          <p className="about">About the Product</p>
          <ul className="product__description">
            {product[0].description.map((desc,index)=><li key={index}>{desc}</li>)}
          </ul>
        </div>
      </div>
      <div className="product__buy">
        <h3>{product[0].price}</h3>
        <h3>arrival Date : enter date her</h3>
        <div>
          {product[0].stocked ? <h3 className="inStock">In Stock.</h3> : <h3 className="outOfStock">Out of stock.</h3> }
        </div>
        <Quantiy id={id} quantity={adjustQuantity}/>
        <button className="add__toCart" disabled={!product[0].stocked} onClick={addToCart}>
          Add to shopping cart
        </button>
        <button className="add__toWishList">Add to Wish List</button>
      </div>
      </div>
        ) : (
          <h3>No Product Selected</h3>
        )
      }
     
    </>
  );
}

export default ProductDescription ;
