import React from 'react'
import {Link} from "react-router-dom";
import "./Home.css";

function HomeCategory({data}) {
    return (
        <div className="home__category">
            <Link className="category__link" to="/product_list">
                <div className="category__container">
                    <h3 className="category__header">{data.title}</h3>
                    <img className="category__img" src={data.image} alt=''></img>
                    <span className="category__footer">{data.subtitle}</span>
                </div>
            </Link>
        </div>
    )
}

export default HomeCategory
