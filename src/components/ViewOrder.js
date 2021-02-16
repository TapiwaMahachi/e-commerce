import React from 'react'
import Grid from '@material-ui/core/Grid';
import {useStateValue} from '../StateProvider';
import { useState } from 'react';
import { useEffect } from 'react';
import '../css/_viewOrder.scss';
import { useHistory } from 'react-router-dom';



function ViewOrder() {
    //getting basket
    const [{basket}] = useStateValue();
    //variable to render components  based on basket if empty of not
    const [isEmpty ,setIsEmpty] = useState(true);
    //getting the history from the url
    const history = useHistory();

    const redirect= e=>{
        //redirect to home page
        console.log('clicked button redirecting to homepage')
        history.push('/');
    }
    useEffect(()=>{
        if(basket.length > 0){
            setIsEmpty(false);
        }else{
            const btn = document.querySelector('.next')
        }
    },[basket])

    return (!isEmpty  ? <div className="order-summary"> 
                            <Grid container spacing={2}>
                                {basket.map(product => <Product product={product} key={product.id} /> )}
                            </Grid>
                        </div>
                     : <div className="order-empty">
                         <button onClick={redirect}>Basket Empty Continue Shopping</button>
                      </div>
    )
        
    
}

export default ViewOrder

const Product = ({product}) =>{
     
    return(
    
        <div className= "order-summary__product">
            <img src={product.image} alt='product_img'/> 
            <div className='order-summary__info'> 
                  <h3>{product.title}</h3>
                  <div className="cost">
                     <span>R</span>
                     <span >{product.price}</span>
                  </div>
                
            </div>
        </div>
    )
}
