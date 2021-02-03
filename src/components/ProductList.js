import React , {useEffect, useState} from 'react'
import { db } from "../firebase";
import "./ProductList.css";
import { useParams, useHistory } from 'react-router-dom';
import ProductCard from './ProductCard';

function ProductList() {
    
    const [products, setProducts] = useState([]);

    const history = useHistory()

    //getting the category from the url
    const {category} = useParams();
    console.log(category)
    console.log(products)
    
    useEffect(() => {
      //searching products based on category
        const unsubscribe = db.collection('stock').onSnapshot(snapshot =>{
            setProducts(snapshot.docs.map(doc => (
                {id: doc.id, data: doc.data()}
            )).filter(prod => prod.data.category === category)
        )});
        return () =>unsubscribe;
    },[category]);
  
   const handleclick = () =>{
            history.push('/');
   }
    const productList = products.map((product) => 
            <ProductCard
                product={product.data}
                key={product.id}
                id ={product.id}
            />
            );          
    return (
        <section className="products">
            {
            products.length ?
            ( 
             <div>
                 <div className="products__department">
                     <h2>{category} Department </h2>
                       <p>Shop Laptops, Desktops,accessories and more </p> 
                 </div> 
                  <hr/>
                 <ul className="product__list"> {productList}</ul>
            </div>
              ) : (
                    <div className="no__product" >
                      <h3> Under construction........ </h3>
                       <button className="prod__list"  onClick={handleclick}> Please continue to Home Page</button>
                     </div>   
                            
                     )
            }
            
        </section>
       
    )
}

export default ProductList;
