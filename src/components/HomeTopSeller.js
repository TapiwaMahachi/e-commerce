import React from 'react'
import "./Home.css"
import {Link} from "react-router-dom"
import {TOPSELLER_IMG} from "../homedata"



function TopSellerImg({image}){
    return(
        <Link to="/">
            <img className="home__image" alt="" src={image}></img>
        </Link>
    )
}

function HomeTopSeller({data}) {
    return (
        <div className="home__topSeller">
            <div className="home__topSellers">
                <div className="topsellers__title">
                    <h3>{data.title}</h3>
                    <Link to="/">
                     <p>{data.subtitle}</p>
                    </Link>
                </div>
                <div className="home__topSellersImage">
                    {/*each link takes to product description based on id */}
                  {TOPSELLER_IMG.map((image, index) => <TopSellerImg image={image} key={index} />)}  
                    <span className="prev" >&#10094;</span>
                    <span className="next"  >&#10095;</span> 
                </div>
            </div> 
        </div>
    )
}

export default HomeTopSeller
