import React , {useEffect, useState} from 'react'
import { db } from "../firebase";
import '../css/_products.scss';
import { useParams, useHistory } from 'react-router-dom';
import ProductCard from './ProductCard';

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
            )).filter(prod => prod.data.category === category)
        )});
        return () =>unsubscribe;
    },[category]);

    const productList = products.map((product) => 
            <ProductCard
                product={product.data}
                key={product.id}
                id ={product.id}
            />
            ); 
                     
    return (
        <section className="products">
            {products.length ?
            ( 
             <div>
                 <div className="products__department">
                    <h2>{category} Department </h2>
                    <p>Shop Laptops, Desktops,accessories and more </p> 
                 </div> 
                 <ul className="product__list"> {productList}</ul>
            </div>
              ) : (
             <div className="no__product" >
                <h1> Under construction....... </h1>
                <button 
                    className="prod__list"  
                    onClick={e=> history.push('/')}
                >
                     Please continue to Home Page
                </button>
            </div>   
                    
                     )
            }
            
        </section>
       
    )
}

export default ProductList;
