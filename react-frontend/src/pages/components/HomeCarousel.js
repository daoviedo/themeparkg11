import React, { Component } from "react";
import { Carousel } from 'react-bootstrap';

import '../css/HomeCarousel.css';
import image1 from '../images/image3.jpg';
import image2 from '../images/image2.jpg';
import image3 from '../images/image1.jpg';


export default class HomeCarousel extends Component {
    render() {
        return (
            <div>
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="picture"
                            src={image1}
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3 style={{color: "#2A2A31"}}>Reach New Heights!</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="picture"
                            src={image2}
                            alt="Second slide"
                        />

                        <Carousel.Caption>
                            <h3>Explore the Nights!</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item >
                        <img
                            className="picture"
                            src={image3}
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3 style={{color: "#2A2A31"}}>Purchase your Tickets Today!</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        );
    }
}