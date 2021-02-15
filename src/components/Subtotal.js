import React from 'react';
import "../css/subtotsl.scss";
import CurrencyFormat from "react-currency-format";
import {getBasketTotal} from "../reducer";
import { useStateValue } from '../StateProvider';
import { useHistory } from 'react-router-dom';

function Subtotal() {

    const [{basket},] = useStateValue();
    const history = useHistory();

    //getting the quantity from the basket of each product and adding them together
    const quantity = basket.map(prod => prod.quantity)
                         .reduce((acc, init) =>acc +init, 0);
  
    return (
      <div className="subtotal">
        <CurrencyFormat
          renderText={(value) => (
            <>
              <p>
                Subtotal ({quantity} items):<strong>{`${value}`}</strong>
              </p>
              <div className="subtotal__gift">
                <input type="checkbox"></input>
                <span>This order contains a gift</span>
              </div>
            </>
          )}
          decimalScale={2}
          value={getBasketTotal(basket)}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        ></CurrencyFormat>
        <button 
          className="subtotal__proceed"
          onClick={()=>history.push('/checkout')}
        >
          proceed to checkout
        </button>
      </div>
    );
}

export default Subtotal
