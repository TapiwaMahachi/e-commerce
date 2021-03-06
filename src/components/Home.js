import React from 'react'
import "../css/_home.scss"
import HomeCategory from './HomeCategory';
import {CATEGORY_DATA} from "../homedata";
//import HomeTopSeller from './HomeTopSeller';
import Carousel from "./Carousel";
import { images } from '../homedata'



function Home() {
    return (
      <div className="home">
        <Carousel slides={images} autoPlay={5} />
        <div className="home__categories">
          {CATEGORY_DATA.map((val, index) => (
            <HomeCategory data={val} key={index} />
          ))}
        </div>
      </div>
    );
}

export default Home
