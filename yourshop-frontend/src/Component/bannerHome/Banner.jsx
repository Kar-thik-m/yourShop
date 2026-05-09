import React from "react";
import sports from "../../assets/Sportsp.jpg";
import UncontrolledExample from "../Carousel/Carousel";
import elect from '../../assets/elect.jpg';
import fash from '../../assets/fash.jpg'

const Banner = () => {
    return (
        <div className="relative w-full h-[600px] overflow-hidden bg-neutral-900">
            {/* Background Image Container with Gradient Overlay */}
            <div className="absolute inset-0 z-0">
                <UncontrolledExample img={sports} elect={elect} fash={fash} />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
            </div>

            {/* Content Container */}
            <div className="relative z-20 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-start">
                <div className="max-w-2xl space-y-6">
                    <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
                        Elevate Your <span className="text-blue-500">Lifestyle</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-neutral-300 font-light max-w-lg">
                        Discover the finest collection of sports gear, premium electronics, and trend-setting fashion items.
                    </p>
                    <div className="flex gap-4 pt-4">
                        {/* <a 
                            href="/shop" 
                            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-900/40 flex items-center gap-2"
                        >
                            Shop Now
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </a> */}
                        {/* <button className="px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-semibold rounded-full border border-white/20 transition-all duration-300">
                            Learn More
                        </button> */}
                    </div>
                </div>
            </div>

            {/* Subtle bottom fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent z-10" />
        </div>
    );
};

export default Banner;
