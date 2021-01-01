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
import SecondaryHeder from './components/SecondaryHeder';
import PrimarySearchAppBar from './components/PrimaryHeader';
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
        <div className="App">
          <Switch>
            <Route path="/login">
              <SecondaryHeder />
              <Login />
            </Route>
            <Route path="/cart">
              <Header />
              <Cart />
            </Route>
              <Route path="/checkout">
                <SecondaryHeder />
                <Elements stripe={stripePromise}>
                    <CheckOut />
                </Elements>
              </Route>
            <Route path="/product_description/:id">
              <Header />
              <ProductDescription />
            </Route>
            <Route path="/product_list/:category">
              <Header />
              <ProductList />
              <Footer />
            </Route>
            <Route path="/">
             {/*<PrimarySearchAppBar />*/} 
             <Header/>
              <Home />
              <Footer />
            </Route>
          </Switch>
        </div>
      </Router>
   
  );
}

export default App
