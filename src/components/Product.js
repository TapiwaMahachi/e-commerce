import React from 'react'
import StarIcon from '@material-ui/icons/Star';

import "./Product.css";
import { Link } from 'react-router-dom';


function Product({product, id}) {
      

    return (
      <div  className="product">
        <div className="product__imageContainer">
          <Link to={`/product_description/${id}`} className="product__link" >
            <img src={product.image} alt={product.image} className="product__image"></img>
          </Link>
        </div>
        <div className="product__info">
          <Link to={`/product_description/${id}`} className="product__link">
            <p className="product__title" data-attribute={product.title}>
              {product.title}
            </p>
          </Link>
          <span className="product__seller">{`by ${product.seller}`}</span>
          <div className="product__price">
            <small>{`$`}</small>
            <span >{product.price}</span>
          </div>
          <span className="product__rating">
            {Array(product.rating)
              .fill()
              .map((_, i) => (
                <StarIcon key={i} className="rating__icon" />
              ))}
          </span>
        </div>
      </div>
    );
}

export default Product
