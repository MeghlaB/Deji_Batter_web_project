import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Marquee from "react-fast-marquee";

const certificates = [
  {
    title: "RoHS",
    img: "https://www.dejibattery.com/uploadfile/2021/01/07/20210107142131yW2GUB.jpg",
  },
  {
    title: "KC",
    img: "https://www.dejibattery.com/uploadfile/2021/01/07/20210107142054XJtalT.jpeg",
  },
  {
    title: "CB",
    img: "https://www.dejibattery.com/uploadfile/2021/01/07/20210107142026jvHFlT.jpeg",
  },
  {
    title: "PSE",
    img: "https://www.dejibattery.com/uploadfile/2021/01/07/20210107142011k1Sx3D.jpeg",
  },
  {
    title: "CE iPhone",
    img: "https://www.dejibattery.com/uploadfile/2021/02/03/202102031728151NVjaz.webp",
  },
  {
    title: "CE Samsung",
    img: "https://www.dejibattery.com/uploadfile/2021/02/03/20210203172825prQ9Ta.webp",
  },
];

const CertificateGallery = () => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const openModal = (index) => {
    setActiveIndex(index);
    setOpen(true);
  };

  const closeModal = () => setOpen(false);

  const next = () => setActiveIndex((prev) => (prev + 1) % certificates.length);
  const prev = () =>
    setActiveIndex((prev) => (prev === 0 ? certificates.length - 1 : prev - 1));

  return (
    <div className="bg-white py-12 px-4 md:px-20 text-center max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-yellow-700">
        CERTIFICATES
      </h2>

      <Marquee pauseOnHover speed={50} gradient={false} className="mb-8">
        {certificates.map((cert, i) => (
          <div
            key={i}
            onClick={() => openModal(i)}
            className="w-48 sm:w-56 mx-3 rounded-md shadow-lg cursor-pointer transform hover:scale-105 transition duration-300 ease-in-out bg-white"
          >
            <img
              src={cert.img}
              alt={cert.title}
              className="w-full h-40 object-contain p-2"
            />
          </div>
        ))}
      </Marquee>

      {open && isHomePage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center px-4">
          <div className="relative bg-white rounded-md shadow-xl p-6 w-full max-w-xl text-center">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-600 text-3xl hover:text-red-500 focus:outline-none"
              aria-label="Close Modal"
            >
              &times;
            </button>

            {/* Previous button */}
            <button
              onClick={prev}
              className="absolute top-1/2 left-3 transform -translate-y-1/2 text-4xl text-gray-600 hover:text-yellow-500 focus:outline-none"
              aria-label="Previous Image"
            >
              &#10094;
            </button>

            {/* Image */}
            <img
              src={certificates[activeIndex].img}
              alt={certificates[activeIndex].title}
              className="max-h-[300px] mx-auto object-contain rounded"
            />
            <p className="text-gray-700 mt-4 text-lg font-semibold">
              {certificates[activeIndex].title} — {activeIndex + 1} of {certificates.length}
            </p>

            {/* Next button */}
            <button
              onClick={next}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-4xl text-gray-600 hover:text-yellow-500 focus:outline-none"
              aria-label="Next Image"
            >
              &#10095;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateGallery;
