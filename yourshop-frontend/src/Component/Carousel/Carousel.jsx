import React from "react";
import Carousel from "react-bootstrap/Carousel";

function UncontrolledExample({ img, elect, fash }) {
    return (
        <Carousel fade indicators={false} controls={false} interval={5000} className="h-full">
            <Carousel.Item className="h-[600px]">
                <img 
                    src={img} 
                    alt="First slide" 
                    className="w-full h-full object-cover" 
                />
            </Carousel.Item>

            <Carousel.Item className="h-[600px]">
                <img 
                    src={elect} 
                    alt="Second slide" 
                    className="w-full h-full object-cover" 
                />
            </Carousel.Item>

            <Carousel.Item className="h-[600px]">
                <img 
                    src={fash} 
                    alt="Third slide" 
                    className="w-full h-full object-cover" 
                />
            </Carousel.Item>
        </Carousel>
    );
}

export default UncontrolledExample;
