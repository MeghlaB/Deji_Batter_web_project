import React from 'react';
import "../AutoCarosule/AutoPlay.css";

const GlobalExhibition = () => {
    const exhibitions = [
        {
            image: 'https://www.dejibattery.com/uploadfile/2024/05/11/20240511115338Qkslyd.jpg',
            text: 'CSE Exhibition'
        },
        {
            image: 'https://www.dejibattery.com/uploadfile/2023/06/16/20230616113652SC3xku.jpg',
            text: 'Hong Kong Exhibition'
        },
        {
            image: 'https://www.dejibattery.com/uploadfile/2024/01/25/20240125104729HF7Jjp.jpg',
            text: 'German Exhibition'
        },
    ]
    return (
        <div className='px-4 md:px-8 lg:px-16'>
            <div className='text-center mb-6'>
                <h1 className='text-2xl md:text-3xl font-bold'>Global Exhibition</h1>
                <p className='text-gray-500 text-sm md:text-base max-w-2xl mx-auto'>
                    We actively participate in exhibitions around the world to promote the DEJI brand. We are becoming a famous brand globally.
                </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {exhibitions.map((item, index) => (
                    <div key={index} className='text-center hover:text-green-600'>
                        <img
                            className='zoom-image2 mx-auto'
                            src={item.image}
                            alt='Exhibition'
                        />
                        <p className='text-xl mt-2 font-semibold'>{item.text}</p>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default GlobalExhibition;