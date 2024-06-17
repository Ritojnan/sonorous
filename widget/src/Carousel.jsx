import React, { useState } from 'react';

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const slides = [
        'https://picsum.photos/800/400?random=1',
        'https://picsum.photos/800/400?random=2',
        'https://picsum.photos/800/400?random=3',
    ];

    const handlePrev = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const handleNext = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <div className="relative w-full h-96 overflow-hidden">
            <div
                className="absolute inset-0 flex transition-transform duration-700"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {slides.map((slide, index) => (
                    <div key={index} className="min-w-full h-full bg-center bg-cover" style={{ backgroundImage: `url(${slide})` }}></div>
                ))}
            </div>
            <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
                onClick={handlePrev}
            >
                <img className='h-6 w-6' src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.svg#chevron-left" alt="Previous" />
            </button>
            <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
                onClick={handleNext}
            >
                <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.svg#chevron-right" alt="Next" />
            </button>
        </div>
    );
};

export default Carousel;
