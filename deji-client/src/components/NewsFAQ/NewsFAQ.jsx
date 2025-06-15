import React from 'react';
import News from './News';
import FAQ from './FAQ';

const NewsFAQ = () => {
    return (
        <div className='grid grid-cols-1 gap-3 container mx-auto md:grid-cols-2 items-start'>
            <News></News>
            <FAQ></FAQ>
        </div>
    );
};

export default NewsFAQ;