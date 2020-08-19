import {useEffect, useState} from 'react'
import Product from "./Product"
import { db } from "../firebase";
import "./ProductList.css";
import { useParams, useHistory } from 'react-router-dom';
/**@jsx jsx */
import {css , jsx} from '@emotion/core';

function ProductList() {
    
    const [products, setProducts] = useState([]);

    const history = useHistory()

    //getting the category from the url
    const {category} = useParams();
    
    useEffect(() => {
      //searching products based on category
        const unsubscribe = db.collection('stock').onSnapshot(snapshot =>{
            setProducts(snapshot.docs.map(doc => (
                {id: doc.id, data: doc.data()}
            )).filter(prod => prod.data.category === category));
        });
        return () =>unsubscribe;
    },[category]);
    
   const ht = window.innerHeight;
   const handleclick = () =>{
            history.push('/');
   }
    const productList = products.map((product) => 
            <Product
                product={product.data}
                key={product.id}
                id ={product.id}
            />
            );          
    return (
        <div>
            {products.length ?( 
                <div>
                <div className="main">
                    <h2>{category} Department </h2>
                </div> 
                <hr/>
                       <ul className="product__list">
                         {productList}
                        </ul> </div>) : (
                            <div css={
                                css`
                                height: ${ht}px;
                                `
                            } >
                                <div
                                css={
                                    css`
                                     justify-content: center;
                                     margin:  0 40em;
                                     margin-top: 15em;
                                     position: relative
                                     padding: 0 2em;
                                     
                                    `
                                }
                                >
                            <h3> Under construction........ </h3>
                            <button className="prod__list"  onClick={handleclick}> Please continue to Home Page</button>
                                </div>
                                
                            </div>
                            
                        )
            }
            
        </div>
       
    )
}

export default ProductList;
