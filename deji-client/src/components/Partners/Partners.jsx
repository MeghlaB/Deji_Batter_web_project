
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const Partners = () => {
    const testimonials = [
        {
            img: "https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg?auto=compress&cs=tinysrgb&w=600",
            title: "The General Manager of Malaysia Distributor",
            message: "Yes I am using your high capacity battery in my iPhone 8 Plus."
        },
        {
            img: "https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg?auto=compress&cs=tinysrgb&w=600",
            title: "Sales Director of Thailand Electronics",
            message: "Deji batteries have proven reliable and high-quality. I now recommend them to our entire customer base."
        },
        {
            img: "https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg?auto=compress&cs=tinysrgb&w=600",
            title: "Retail Partner in Indonesia",
            message: "After switching to Deji, customer satisfaction has improved significantly. Great value and performance."
        },
        {
            img: "https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg?auto=compress&cs=tinysrgb&w=600",
            title: "Tech Store Owner, Singapore",
            message: "I’ve tried many replacement batteries, but Deji stands out in both longevity and quality."
        },
        {
            img: "https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg?auto=compress&cs=tinysrgb&w=600",
            title: "Distributor from Vietnam",
            message: "Deji products are easy to sell due to their proven performance. Repeat purchases are common."
        },
        {
            img: "https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg?auto=compress&cs=tinysrgb&w=600",
            title: "Wholesaler, Philippines",
            message: "The support from Deji has been excellent. My business has grown since partnering with them."
        }
    ];

    return (
        <div className="my-12 px-4">
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-extrabold">
                    What Our Partners Say
                </h1>
                <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto mt-3">
                    The following are real evaluations from some of our dealers and agents.
                </p>
            </div>

            <Swiper
                slidesPerView={1}
                spaceBetween={20}
                pagination={{ clickable: true }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                    },
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {testimonials.map((data, index) => (
                    <SwiperSlide key={index}>
                        <div className="group text-center px-4 py-6 transition-colors duration-300">
                            <div className="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden">
                                <img
                                    src={data.img}
                                    alt="Partner"
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                            <p className="text-lg font-semibold text-white group-hover:text-green-600 transition-colors duration-300">
                                {data.title}
                            </p>
                            <p className="text-sm text-gray-600 italic group-hover:text-green-600 transition-colors duration-300 mt-1">
                                "{data.message}"
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Partners;
