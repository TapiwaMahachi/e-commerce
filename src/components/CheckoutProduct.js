import {Link} from "react-router-dom";
import "./CheckoutProduct.css";
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import {css, jsx } from "@emotion/core";
import Quantiy from './Quantiy';
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
      <div className="checkout__product">
        <hr></hr>
        <div className="checkout__container">
          <Link to="/product">
            <img
              className="checkout__productImage"
              src={product.image}
              alt="checkout__image"
            ></img>
          </Link>
          <div className="checkout__productInfo">
            <Link to="/product" className="checkout__productLink">
              <p className="checkout__productTitle">{product.title}</p>
            </Link>

            <div className="checkout__productPrice">
              <small>$</small>
              <span>{product.price}</span>
            </div>
            {/*  
            <span className="checkout__productRating">
              {Array(props.rating)
                .fill()
                .map((_, i) => (
                  <StarIcon key={i} className="rating__icon" />
                ))}
                </span> */}
            <Box className="checkout__productRating " component="fieldset" mb={3} borderColor="transparent">
              <Rating name="read-only" value={product.rating} readOnly />
            </Box>
            <div className="checkout__links">
              <Quantiy />
              <Link className="checkout__link" to="/cart">
                <span
                  className="checkout__delete"
                  css={css`
                    color: blue;
                  `}
                  onClick={deleteProduct}
                >
                  Remove
                </span>
              </Link>
              <Link className="checkout__link" to="/cart">
                <span
                  className="checkout__save"
                  css={css`
                    color: blue;
                  `}
                  onClick={saveProduct}
                >
                  Save for later
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
}

export default CheckoutProduct
