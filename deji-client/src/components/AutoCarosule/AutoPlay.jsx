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

  const categories = [
    {
      image: "https://www.dejibattery.com/uploadfile/2024/05/11/20240511113048MYmrge.jpg",
      title: "DEJI PCBA SMT Production Line",
    },
    {
      image: "https://www.dejibattery.com/uploadfile/2024/05/11/20240511113048MYmrge.jpg",
      title: "DEJI PCBA SMT Production Line",
    },
    {
      image: "https://www.dejibattery.com/uploadfile/2023/06/27/20230627162150AunQbN.jpg",
      title: "DEJI Industrial Park",
    },
    {
      image: "https://www.dejibattery.com/uploadfile/2023/06/27/20230627162651euQaBt.jpg",
      title: "The Reception",
    },
    {
      image: "https://www.dejibattery.com/uploadfile/2023/06/27/20230627162509pEd80r.jpg",
      title: "QR Testing",
    },
    {
      image: "https://www.dejibattery.com/uploadfile/2023/06/27/20230627163017aTL0sj.jpg",
      title: "Qulity Inspection",
    },
    {
      image: "https://www.dejibattery.com/uploadfile/2023/06/27/20230627162852fup1CH.jpg",
      title: "StoreHouse",
    },
    {
      image: "https://www.dejibattery.com/uploadfile/2024/05/11/20240511112940NXnk2U.jpg",
      title: "DEJI Clean Room",
    },
  ];

  return (
    <div className="slider-container" style={{ margin: "50px" }}>
      <Slider {...settings}>
        {categories.map((item, index) => (
          <div key={index}>
            <div className="image-wrapper">
              <img src={item.image} alt={`Slide ${index + 1}`} className="zoom-image" />
              <p className="text-center mt-3 font-semibold hover:text-green-600">{item.title}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default AutoPlay;
