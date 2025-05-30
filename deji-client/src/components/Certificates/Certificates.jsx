import React, { useState } from "react";
import Marquee from 'react-fast-marquee';
const certificates = [
  { title: "RoHS", img: "https://www.dejibattery.com/uploadfile/2021/01/07/20210107142131yW2GUB.jpg" },
  { title: "KC", img: "https://www.dejibattery.com/uploadfile/2021/01/07/20210107142054XJtalT.jpeg" },
  { title: "CB", img: "https://www.dejibattery.com/uploadfile/2021/01/07/20210107142026jvHFlT.jpeg" },
  { title: "PSE", img: "https://www.dejibattery.com/uploadfile/2021/01/07/20210107142011k1Sx3D.jpeg" },
  { title: "CE iPhone", img: "https://www.dejibattery.com/uploadfile/2021/02/03/202102031728151NVjaz.webp" },
  { title: "CE Samsung", img: "https://www.dejibattery.com/uploadfile/2021/02/03/20210203172825prQ9Ta.webp" },
];

const CertificateGallery = () => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openModal = (index) => {
    setActiveIndex(index);
    setOpen(true);
  };

  const closeModal = () => setOpen(false);

  const next = () => setActiveIndex((prev) => (prev + 1) % certificates.length);
  const prev = () => setActiveIndex((prev) => (prev === 0 ? certificates.length - 1 : prev - 1));

  return (
    <div className="bg-white py-10 px-4 md:px-20 text-center">
      <h2 className="text-3xl font-bold mb-6">CERTIFICATES</h2>
      <div className="flex flex-wrap justify-center gap-6">
        <Marquee>
          {certificates.map((cert, i) => (
          <div
            key={i}
            className="w-60 h-auto mx-3 border-4 border-yellow-700 rounded-md shadow-md cursor-pointer hover:scale-105 transition"
            onClick={() => openModal(i)}
          >
            <img src={cert.img} alt={cert.title} className="w-full h-auto object-contain" />
          </div>
        ))}
        </Marquee>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
          <button onClick={closeModal} className="absolute top-4 right-6 text-white text-3xl font-bold">
            &times;
          </button>

          <button onClick={prev} className="absolute left-4 text-white text-4xl px-2">&#10094;</button>

          <div className="relative max-w-3xl w-full px-4 text-center">
            <img
              src={certificates[activeIndex].img}
              alt="Certificate"
              className="max-h-[80vh] mx-auto rounded-md shadow-xl"
            />
            <p className="text-white mt-4">
              {activeIndex + 1} of {certificates.length}
            </p>
          </div>

          <button onClick={next} className="absolute right-4 text-white text-4xl px-2">&#10095;</button>
        </div>
      )}
    </div>
  );
};

export default CertificateGallery;
