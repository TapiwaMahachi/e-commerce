import React, { useEffect }  from 'react'
import {BrowserRouter as Router, Route,Switch, } from "react-router-dom";


import Header from "./components/Header";
import ProductList from "./components/ProductList";
import ProductDescription from './components/ProductDescription';
import Cart from "./components/Cart";
import Home from "./components/Home";
import Footer from './components/Footer';
import Login from './components/Login';
import {auth} from './firebase';
import {useStateValue} from './StateProvider';
import CheckOut from './components/CheckOut';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

//calling the loadstripe outside so that it doesnt get recreated within the render method
const stripePromise = loadStripe(
  "pk_test_51HJoESII0yj6l4QXQX2TiROiul1OOVLhqzN372vvzqdVr5qlKtqS6RyMyHzjKoQwyJZsjXXtzxO9CQmNm5xAF0Ci00qECARoyF"
);



const  App =()=> {

  //get user
  const [{user}, dispatch] = useStateValue();

  useEffect(() =>{
    const unsubscribe = auth.onAuthStateChanged((authUser) =>{

      if(authUser){
        dispatch({
          type: "SET_USER",
          user: authUser,
        })
      }else{
        dispatch({
          type: 'SET_USER',
          user: null,
        })
      }
    });
    return () => unsubscribe();
  },[dispatch])

   console.log(user)   
  return (
    
      <Router>
        <Header/>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
              <Route path="/checkout">
                <Elements stripe={stripePromise}>
                    <CheckOut />
                </Elements>
              </Route>
            <Route path="/product_description/:id">
              <ProductDescription />
            </Route>
            <Route path="/product_list/:category">
              <ProductList />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        <Footer/>
      </Router>
   
  );
}

export default App
