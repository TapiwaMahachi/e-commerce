import React , {useEffect, useState} from 'react'
import { db } from "../firebase";
import '../css/_products.scss';
import { useParams, useHistory } from 'react-router-dom';
import ProductCard from './ProductCard';

function ProductList() {
    //adding state 
    const [products, setProducts] = useState([]);
    
    //getting the category from the url
    const {category} = useParams();
    const history = useHistory();

    useEffect(() => {
      //searching products based on category
        const unsubscribe = db.collection('stock').where('category','==',category)
        .onSnapshot(snapshot =>{
            setProducts(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()}))
            
        )});
        return () =>unsubscribe;
    },[category]);
                     
    return (
        <section className="products">
            {products.length > 0 ? 
                <div>
                    <div className="products__department">
                        <h2>{category} Department </h2>
                        <p>Shop Laptops, Desktops,accessories and more </p> 
                    </div> 
                    <ul className="product__list">
                        {products.map((product) =>
                         <ProductCard 
                            product={product.data} 
                            key={product.id} 
                            id ={product.id}
                        />)}
                    </ul>
               </div> 
              : <Loading history={history}/>      
            }  
        </section> 
    )
}

export default ProductList;


function Loading(props){
    const {history} = props;
    return(
      <div className="no__product" >
        <h1> Loading....... </h1>
       {/* The button needs to be removed once all categories have data */}
        <button 
            className="prod__list"  
            onClick={e=> history.push('/')}
        >
                Please continue to Home Page
        </button>
     </div>
    )
}