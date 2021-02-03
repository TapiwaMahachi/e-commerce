import React from 'react'
import {Link} from "react-router-dom";
import "../css/_home.scss";

function HomeCategory({data}) {
    return (
        <div className="category">
            <Link className="category__link" to={`/product_list/${data.title}`}>
                <div className="category__container">
                    <h2 className="category__header">{data.title}</h2>
                    <img className="category__img" src={data.image} alt=''></img>
                    <p className="category__footer">{data.subtitle}</p>
                </div>
            </Link>
        </div>
    )
}

export default HomeCategory
