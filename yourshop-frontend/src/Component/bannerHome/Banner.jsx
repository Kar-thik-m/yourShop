import React from "react";
import sports from "../../assets/Sportsp.jpg";
import bannerStyle from "../bannerHome/Banner.module.css";
import UncontrolledExample from "../Carousel/Carousel";
import elect from '../../assets/elect.jpg';
import fash from '../../assets/fash.jpg'

const Banner = () => {
    return (
        <div className={bannerStyle.bannerContainer}>
            <div className={bannerStyle.bannerContent}>
                <h1 className={bannerStyle.bannerTitle}>Welcome to YourShop!</h1>
                <p className={bannerStyle.bannerSubtitle}>
                    Explore the best sports gear, equipment, and accessories.
                </p>
                <a href="/shop" className={bannerStyle.shopNowButton}>
                    Shop Now
                </a>
            </div>
            <div className={bannerStyle.image}>
                <UncontrolledExample img={sports} elect={elect} fash={fash} />
            </div>
        </div>
    );
};

export default Banner;
