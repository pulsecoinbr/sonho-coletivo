import React, { useState, useEffect, useCallback } from 'react';
import { Testimonial } from '../types';
import { ChevronLeftIcon, ChevronRightIcon, QuoteIcon } from './icons';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? testimonials.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = useCallback(() => {
    const isLastSlide = currentIndex === testimonials.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, testimonials.length]);
  
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 7000); // Change testimonial every 7 seconds
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }
  
  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="w-full max-w-3xl mx-auto relative group">
        <div className="bg-white rounded-lg shadow-lg p-8 relative min-h-[280px] flex items-center">
            <QuoteIcon className="absolute top-4 left-4 w-12 h-12 text-gray-100" />
            <div className="w-full text-center">
                <p className="text-lg italic text-gray-600 mb-4">"{currentTestimonial.quote}"</p>
                <div className="flex items-center justify-center">
                    <img src={currentTestimonial.imageUrl} alt={currentTestimonial.name} className="w-12 h-12 rounded-full mr-4 border-2 border-brand-secondary p-0.5" />
                    <div>
                        <p className="font-bold text-gray-800">{currentTestimonial.name}</p>
                        <p className="text-sm text-gray-500">Campanha: {currentTestimonial.campaignTitle}</p>
                    </div>
                </div>
            </div>
             <QuoteIcon className="absolute bottom-4 right-4 w-12 h-12 text-gray-100 transform rotate-180" />
        </div>

        <button onClick={prevSlide} className="absolute top-1/2 -left-4 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
        </button>
        <button onClick={nextSlide} className="absolute top-1/2 -right-4 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronRightIcon className="w-6 h-6 text-gray-600" />
        </button>
        
        <div className="flex justify-center mt-4">
            {testimonials.map((_, index) => (
                <button 
                    key={index} 
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2.5 h-2.5 mx-1 rounded-full transition-colors ${currentIndex === index ? 'bg-brand-primary' : 'bg-gray-300 hover:bg-gray-400'}`}
                ></button>
            ))}
        </div>
    </div>
  );
};

export default TestimonialCarousel;
