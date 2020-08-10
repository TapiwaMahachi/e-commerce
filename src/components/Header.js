import React from 'react'
import { Link } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import SearchIcon from "@material-ui/icons/Search";

import "./Header.css";
import { useStateValue } from '../StateProvider';



function Header() {

  //basket
  const [{basket}]= useStateValue();

  //getting the quantity from the basket of each product
 const quantity = basket.map(prod => prod.quantity)
                        .reduce((acc, init) =>acc +init,0);

    console.log("Basket : " ,quantity)
  
    return (
      <nav className="header">
        <Link to="/"  className="nav__link">
          <div className="header__logo">
            <span>AfreX</span>
          </div>
        </Link>
        <div className="header__search">
          
          <input className="header__input" type="text"></input>
          <SearchIcon className="header__searchIcon" />
        </div>
        <div className="nav__left">
          <Link to="/login" className="nav__link">
            <div className="nav__option">
              <span className="nav__optionOne">Hello Tapiwa</span>
              <span className="nav__optionTwo">Sign in</span>
            </div>
          </Link>
          <Link to="/" className="nav__link">
            <div className="nav__option">
              <span className="nav__optionOne">Returns</span>
              <span className="nav__optionTwo">& Orders</span>
            </div>
          </Link>
          <Link to="/cart" className="nav__link">
            <div className="nav__optionShoppingCart">
              <ShoppingCartOutlinedIcon  className="nav__shoppingCart"/>
               <span className="nav__optionTotal">
                  {quantity}
               </span>
            </div>
          </Link>
        </div>
      </nav>
    );
}

export default Header
