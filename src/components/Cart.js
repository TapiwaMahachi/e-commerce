import React from 'react';
import "./Cart.css";
import Subtotal from "./Subtotal";
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from '../StateProvider';


function Cart() {
    //get basket total
    const [{ basket },] = useStateValue();
    
    return (
        <div className="cart">
            <div className="cart__left">
                {/*
          <img className="checkout__image"
            src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_45M_v2_1x._CB432458380_.jpg"
            alt="advert"
          ></img>
          */}

                { basket?.length > 0 ? (
                    <div className="cart__productInfo">
                        <h2>Your shopping cart</h2>
                        <ol className="cart__productList">
                            {basket.map(product =>
                            <CheckoutProduct 
                                product ={product}
                                key={product.id}
                             />
                             )}
                        </ol>
                    </div>
                ) : (
                        <h2>Your shopping cart is empty</h2>
                    ) }
            </div>
            <div className="cart__right">
                {basket?.length > 0 && (
                    <>
                        <Subtotal />
                        <div className="cart__sponsored">
                            <h3>Sponsored product related to your list</h3>
                            <p>List of all sponsored related products </p>
                        </div>
                    </>
                )}
                {/*must be a component*/}
            </div>
        </div>
    );
}

export default Cart;
