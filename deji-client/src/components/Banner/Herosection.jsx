import { useCallback, useEffect, useState } from "react";

import image1 from '../../assets/banner-battery.jpeg';
import image2 from '../../assets/banner-battery.jpg';
import image3 from '../../assets/banner_battery.jpeg';

export default function Banner() {
  const [currentSlider, setCurrentSlider] = useState(0);

  const carouselImages = [
    {
      image: image1,
      title: "Power That Lasts",
      description: "Experience longer usage with our high-capacity mobile batteries designed for all-day performance."
    },
    {
      image: image2,
      title: "Fast. Safe. Reliable.",
      description: "Our premium batteries charge faster, last longer, and come with built-in safety technology."
    },
    {
      image: image3,
      title: "Your Power, Our Battery",
      description: "Trusted by millions, our mobile phone batteries are built to keep you connected, always."
    }
  ];

  const prevSlider = () =>
    setCurrentSlider(currentSlider === 0 ? carouselImages.length - 1 : currentSlider - 1);

  const nextSlider = useCallback(() =>
    setCurrentSlider(currentSlider === carouselImages.length - 1 ? 0 : currentSlider + 1), [carouselImages.length]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlider();
    }, 4000);
    return () => clearInterval(intervalId);
  }, [nextSlider]);

  return (
    <div className="relative w-full h-[550px] overflow-hidden">
      {/* Slider Images */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlider * 100}%)` }}
      >
        {carouselImages.map((slide, idx) => (
          <div key={idx} className="min-w-full h-full relative">
            <img
              src={slide.image}
              alt={`Slide ${idx + 1}`}
              className="w-full h-full object-cover"
            />
           
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
        ))}
      </div>

      {/* Text Content */}
      <div className="absolute top-0 left-0 z-20 h-full w-full flex items-center justify-between px-6 md:px-20">
        {/* Left Text Side */}
        <div className="text-white max-w-xl space-y-5">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-green-400">
            {carouselImages[currentSlider].title}
          </h2>
          <p className="text-sm md:text-lg">
            {carouselImages[currentSlider].description}
          </p>
          <button className="mt-3 px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full shadow">
            Learn More
          </button>
        </div>

        {/* Right Image Side */}
        <div className="hidden md:block relative w-[300px] lg:w-[400px]">
          <div className="absolute inset-0 rounded-full blur-2xl bg-purple-400/30"></div>
          <img
            src={carouselImages[currentSlider].image}
            alt="Battery"
            className="relative z-10 rounded-xl w-full object-cover shadow-lg"
          />
        </div>
      </div>

      {/* Dots Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {carouselImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlider(idx)}
            className={`w-3 h-3 rounded-full ${currentSlider === idx ? "bg-white" : "bg-white/50"}`}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <button onClick={prevSlider} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white text-black p-2 rounded-full z-30 shadow">
        ‹
      </button>
      <button onClick={nextSlider} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white text-black p-2 rounded-full z-30 shadow">
        ›
      </button>
    </div>
  );
}
