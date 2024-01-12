import React, { useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import imagen1 from "../img/Responsive/foto2.jpeg";
import imagen2 from "../img/Responsive/foto3.jpeg";
import imagen3 from "../img/Responsive/foto4.jpg";
import imagen4 from "../img/Responsive/fotoresponsive.jpeg";
import imagen5 from "../img/Responsive/foto6.jpeg";
import imagen6 from "../img/Responsive/foto7.jpeg";
import imagen7 from "../img/Responsive/foto8.jpg";


const Carousel = () => {
  const slides = [
    {
      url: imagen1,
    },
    {
      url: imagen2,
    },
    {
        url: imagen3,
    },
    {
        url: imagen4,
    },
    {
        url: imagen5,
    },
    {
        url: imagen6,
    },
    {
        url: imagen7,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  return (
    <div className="max-w-[1300px] h-[620px] w-full m-auto relative group md:hidden xl:hidden">
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
      >
        <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] left-12 text-2xl p-2 text-black cursor-pointer">
          <BsChevronCompactLeft onClick={prevSlide} size={40} />
        </div>

        <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] right-12 text-2xl p-2 text-black cursor-pointer">
          <BsChevronCompactRight onClick={nextSlide} size={40} />
        </div>
        
      </div>
    </div>
  );
};

export default Carousel;
