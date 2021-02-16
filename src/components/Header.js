import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import SearchIcon from "@material-ui/icons/Search";
import logo from '../img/logo.png'
import '../css/_header.scss';
import { useStateValue } from '../StateProvider';
import {auth} from '../firebase';



function Header() {

  //basket context
  const [{basket, user}]= useStateValue();
  const inputFocus = useRef();
  const [isFocus, setFocus] = useState(false);
  //getting the quantity from the basket of each product
 const quantity = basket.map(prod => prod.quantity)
                        .reduce((qty, init) =>qty +init,0);

    useEffect(()=>{
      if(isFocus){
        inputFocus.current.focus();
      }
    }, [isFocus]);

    return (
      <nav className="nav flex-r">
         <div className="nav__logo">
            <Link to="/">
               <h2>Afrex</h2>
            </Link>
          </div>
        <form className="search">
          <div className="nav__search" ref={inputFocus} tabIndex ="-1" >
            <input className="input" type="text" onClick={()=>setFocus(!isFocus)}></input>
            <div className="header__searchRight">
              <SearchIcon className="searchIcon"  />
            </div> 
          </div>
        </form>
        <div className="nav__left flex-r">
          <div className="nav__option" onClick={!!user ? () =>auth.signOut() : ()=>{}}>
            <Link to={!!user ? '/': "/login"} className="nav__link ">
              <div>
                 <span className="nav__optionOne">Hello, {user?.displayName || user?.email }</span>
                 <span className="nav__optionTwo">{!!user ?'Sign out': 'Sign in'}</span>
              </div>
            </Link>
          </div>
          <div className="nav__option">
            <Link to="/" className="nav__link ">
              <div>
                <span className="nav__optionOne">Returns</span>
                <span className="nav__optionTwo">& Orders</span>
              </div>
               
            </Link>
          </div>
          <div className="nav__optionShoppingCart">
            <Link to="/cart" className="nav__link">
                <ShoppingCartOutlinedIcon className="nav__shoppingCart" />
                <span className="nav__optionTotal">
                  {quantity}
                </span>
            </Link>
           </div>
        </div>
      </nav>
    );
}

export default Header
