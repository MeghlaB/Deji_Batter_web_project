import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./AutoPlay.css"; 

function AutoPlay() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 1000,
    cssEase: "linear",
  };

  const images = [
    "https://www.dejibattery.com/uploadfile/2023/06/27/20230627162150AunQbN.jpg",
    "https://www.dejibattery.com/uploadfile/2023/06/27/20230627162150AunQbN.jpg",
    "https://www.dejibattery.com/uploadfile/2023/06/27/20230627162150AunQbN.jpg",
    "https://www.dejibattery.com/uploadfile/2023/06/27/20230627162150AunQbN.jpg",
    "https://www.dejibattery.com/uploadfile/2023/06/27/20230627162150AunQbN.jpg",
    "https://www.dejibattery.com/uploadfile/2023/06/27/20230627162150AunQbN.jpg",
  ];

  return (
    <div className="slider-container" style={{ margin: "50px" }}>
      <Slider {...settings}>
        {images.map((imgUrl, index) => (
          <div key={index}>
            <div className="image-wrapper">
              <img src={imgUrl} alt={`Slide ${index + 1}`} className="zoom-image" />
              <p className="text-center mt-3 font-semibold hover:text-green-600">DEJI CLEAN ROOM</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default AutoPlay;
