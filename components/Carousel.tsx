import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

interface Slide {
  imageUrl: string;
  title: string;
  subtitle: string;
}

interface CarouselProps {
  slides: Slide[];
}

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slides.length]);

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };
  
  useEffect(() => {
    if (slides.length > 1) {
        const slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
        return () => clearInterval(slideInterval);
    }
  }, [nextSlide, slides.length]);


  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <div className="w-full h-[400px] m-auto relative group mb-12">
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].imageUrl})` }}
        className="w-full h-full rounded-xl bg-center bg-cover duration-500"
      >
         <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center">
            <div className="text-center text-white p-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">{slides[currentIndex].title}</h2>
                <p className="text-lg drop-shadow-md">{slides[currentIndex].subtitle}</p>
            </div>
         </div>
      </div>
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer" onClick={prevSlide}>
        <ChevronLeftIcon className="w-6 h-6" />
      </div>
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer" onClick={nextSlide}>
        <ChevronRightIcon className="w-6 h-6" />
      </div>
      <div className="flex top-4 justify-center py-2 absolute bottom-5 left-0 right-0">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`text-2xl cursor-pointer mx-1 transition-colors ${currentIndex === slideIndex ? 'text-white' : 'text-white/50'}`}
          >
            ●
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;