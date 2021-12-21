import React from "react";
import { Carousel } from "react-bootstrap";
import Img1Mobile from "../../Assets/1-mobile.jpg";
import Img1 from "../../Assets/1.jpg";
import Img2 from "../../Assets/2.jpg";
import Img3 from "../../Assets/3.jpg";
import Img2Mobile from "../../Assets/2-mobile.jpg";
import Img3Mobile from "../../Assets/3-mobile.jpg";
import "./Carousel.css";
function HomeCarousel() {
    return (
        <Carousel className="carouselWrapper container mt-2">
            <Carousel.Item className="carouselItem">
                <picture>
                    <source media="(min-width:480px)" srcSet={Img1} />
                    <img
                        className="d-block w-100"
                        src={Img1Mobile}
                        alt="Laptop"
                    />
                </picture>
            </Carousel.Item>
            <Carousel.Item className="carouselItem">
                <picture>
                    <source media="(min-width:480px)" srcSet={Img2} />
                    <img
                        className="d-block w-100"
                        src={Img2Mobile}
                        alt="Shopping"
                    />
                </picture>
            </Carousel.Item>
            <Carousel.Item className="carouselItem">
                <picture>
                    <source media="(min-width:480px)" srcSet={Img3} />
                    <img
                        className="d-block w-100"
                        src={Img3Mobile}
                        alt="Shopping"
                    />
                </picture>
            </Carousel.Item>
        </Carousel>
    );
}

export default HomeCarousel;
