import React,{useEffect, useState} from 'react'
import Product from "./Product"
import { db } from "../firebase";
import "./ProductList.css";

function ProductList() {

    const [products, setProducts] = useState([]);

    //Display All Products
    useEffect(() => {
      //effect - accessing the db for all the products
        db.collection('products').onSnapshot(snapshot =>{
            setProducts(snapshot.docs.map(doc => (
                {id: doc.id, data: doc.data()}
            )));
        });
    },[]);//empty arrayy thats the depency array to run only once upon initializing
   
    const productList = products.map((product) => 
            <Product
                product={product.data}
                key={product.id}
                id ={product.id}
            />
            );

    return (
        <div>
            <div className="main">
               <h2>Electronics Department </h2>
            </div>
            <ul className="product__list">
                {productList}
            </ul>
        </div>
       
    )
}

export default ProductList;
