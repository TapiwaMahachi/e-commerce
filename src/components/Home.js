import React from 'react'
import "./Home.css";
import HomeCategory from './HomeCategory';
import {CATEGORY_DATA, TOPSELLER_DATA} from "../homedata";
import HomeTopSeller from './HomeTopSeller';
import Carousel from "./Carousel";
import Slider from "./Slider"
import { images } from '../homedata'


function Home() {
    return (
      <div className="home">
        {/*  <div className="home__corousel">
                <img src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Computers_1x._CB432469755_.jpg" alt="couresel-1"></img>
            </div>*
            <Carousel slides={images} autoPlay={4} />
   */}
        <Carousel slides={images} autoPlay={4} />
        <div className="home__categories">
          {CATEGORY_DATA.map((val, index) => (
            <HomeCategory data={val} key={index} />
          ))}
        </div>
        <div className="home__topsellers">
          {TOPSELLER_DATA.map((val, index) => (
            <HomeTopSeller data={val} key={index} />
          ))}
        </div>
      </div>
    );
}

export default Home
