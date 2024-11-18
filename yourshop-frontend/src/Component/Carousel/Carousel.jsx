import React from "react";
import Carousel from "react-bootstrap/Carousel";

function UncontrolledExample({ img, elect, fash }) {
    return (
        <Carousel>
            <Carousel.Item>

                <img src={img} alt="First slide" className="d-block w-100" />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>

                <img src={elect} alt="Second slide" className="d-block w-100" />
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img src={fash} alt="Third slide" className="d-block w-100" />
                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default UncontrolledExample;
