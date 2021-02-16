import React from 'react';
import "../css/_cart.scss";
import Subtotal from "./Subtotal";
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from '../StateProvider';
import {Link} from 'react-router-dom';


function Cart() {
    //get basket total
    const [{ basket },] = useStateValue();
    
    return (
        <section className="cart">
            <div className="cart__left">
              <h2>{`shopping cart ${basket.length ? '': 'is empty'}`}</h2>
                { basket?.length > 0 ? (
                    <div className="cart__product">
                      {basket.map(product => <CheckoutProduct  product ={product} key={product.id} /> )}
                    </div>
                ) : ( 
                    <div className="cart__btn">
                          <Link to="/" className="cart__link">
                             <button>Continue Shopping</button>
                          </Link>
                         
                     </div>  
                    ) }
            </div>
           {basket?.length > 0 &&  <Subtotal />  }
        </section>
    );
}

export default Cart;
