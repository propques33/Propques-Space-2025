import React, { useState, useEffect } from 'react';
import image from '../assets/banner/image.png';
import image2 from '../assets/banner/image2.png';
import image3 from '../assets/banner/imag3.png';
import image4 from '../assets/banner/imag4.png';

const images = [image, image2, image3, image4];

const ImageSlider = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2000); // 👈 changed from 5000 to 1000ms
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={img}
            alt={`Slide ${index}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      <h2 className='z-[10000] absolute top-1/3 left-20'>
        <span className="text-white text-6xl font-bold">Welcome to Propques!</span>
        <br />
        <br />
        <span className="text-white text-2xl ">We specialize in commercial office leasing and sales.</span>
      </h2>

      {/* Navigation Arrows */}
      {/* <button
        onClick={prevSlide}
        className="absolute z-10  left-5 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full hover:bg-opacity-75"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute z-10  right-5 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full hover:bg-opacity-75"
      >
        ❯
      </button> */}
    </div>
  );
};

export default ImageSlider;
