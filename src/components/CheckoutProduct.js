import {Link} from "react-router-dom";
import React from 'react';
import "../css/_checkoutp.scss";
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { useStateValue } from '../StateProvider';

function CheckoutProduct({product}) {

  //hook for the context
  const [, dispatch] = useStateValue();

    const deleteProduct =(e) =>{
        dispatch({
          type: "DELETE",
          payload: product.id
        })
    }
    const saveProduct =(e)=>{
      console.log("Saved")
    }
    return (
      
        <div className="checkout-p">
          <Link to="/product">
            <img
              className="checkout-p__productImage"
              src={product.image}
              alt="checkout-p__image"
            ></img>
          </Link>
          <div className="checkout-p__productInfo">
            <Link to="/product" className="checkout__productLink">
              <p className="checkout-p__productTitle">{product.title}</p>
            </Link>

            <div className="checkout-p__productPrice">
              <small>$</small>
              <span>{product.price}</span>
            </div>
            <Box className="checkout-p__productRating " component="fieldset" mb={3} borderColor="transparent">
              <Rating name="read-only" value={product.rating} readOnly />
            </Box>
            <div className="checkout-p__links">
               <div className="product__qty">
                 <label>Qty:</label>
                 <input type="number" name="number" max="30" min="1" defaultValue="1" />
               </div>
              <Link className="checkout-p__link" to="/cart">
                <span
                  className="checkout-p__delete"
                  onClick={deleteProduct}
                >
                  Remove
                </span>
              </Link>
              <Link className="checkout-p__link" to="/cart">
                <span onClick={saveProduct}  >
                  Save for later
                </span>
              </Link>
            </div>
          </div>
        </div>
     
    );
}

export default CheckoutProduct
