import React  from 'react'
import {BrowserRouter as Router, Route,Switch, } from "react-router-dom";


import Header from "./components/Header";
import ProductList from "./components/ProductList";
import ProductDescription from './components/ProductDescription';
import Cart from "./components/Cart";
import Home from "./components/Home";
import Footer from './components/Footer';



function App() {
      
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <h1>Login</h1>
          </Route>
          <Route path="/cart">
            <Header />
           <Cart/>
          </Route>
          <Route path="/product_description/:id">
            <Header/>
            <ProductDescription/>
          </Route>
          <Route path="/product_list">
            <Header />
            <ProductList />
            <Footer/>
          </Route>
          <Route path="/">
            <Header />
            <Home />
            <Footer/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App
