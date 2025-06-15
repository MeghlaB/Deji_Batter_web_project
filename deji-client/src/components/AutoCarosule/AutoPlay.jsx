import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./AutoPlay.css";

function AutoPlay() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3, // ডেক্সটপে ৩ ছবি
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2500,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024, // ট্যাবলেট
        settings: {
          slidesToShow: 2, // ২ ছবি দেখাবে
        },
      },
      {
        breakpoint: 640, // মোবাইল
        settings: {
          slidesToShow: 1, // একবারে ১ ছবি দেখাবে
        },
      },
    ],
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
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Slider {...settings}>
        {categories.map((item, index) => (
          <div key={index} className="px-2">
            <div className="image-wrapper bg-white rounded-lg shadow-md p-4 h-full flex flex-col items-center">
              <img
                src={item.image}
                alt={`Slide ${index + 1}`}
                className="zoom-image w-full h-56 object-cover rounded-md"
              />
              <p className="text-center mt-3 font-semibold hover:text-green-600 transition duration-300">
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default AutoPlay;
