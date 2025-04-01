import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const ImageCarousel = ({ images = [] }) => {
  const [current, setCurrent] = useState(0);

  const nextImage = () => setCurrent((current + 1) % images.length);
  const prevImage = () => setCurrent((current - 1 + images.length) % images.length);
  const selectImage = (index) => setCurrent(index);

  if (images.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main Image Display */}
      <div className="relative">
        <img
          src={images[current]}
          alt={`Slide ${current + 1}`}
          className="w-full h-[450px] object-cover rounded-lg"
        />

        {/* Left Arrow */}
        <button
          onClick={prevImage}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextImage}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md"
        >
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Slide Count */}
        <div className="absolute bottom-2 left-4 text-white bg-black/60 px-2 py-1 rounded text-sm">
          {current + 1} of {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex justify-center gap-3 mt-4">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            onClick={() => selectImage(index)}
            alt={`Thumbnail ${index + 1}`}
            className={`h-16 w-24 object-cover rounded cursor-pointer transition-all duration-200 ${
              index === current ? 'opacity-100 ring-2 ring-red-500' : 'opacity-50 hover:opacity-80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
