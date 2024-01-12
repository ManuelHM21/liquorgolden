import React, { useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import imagen1 from "../img/Buchanns_Video_new.jpg";
import imagen2 from "../img/bg-hero-two-souls.jpg";
import imagen3 from "../img/Vhivas.jpg";
import "animate.css/animate.min.css";

const Carousel = () => {
  const slides = [
    {
      url: "https://quillandpad.com/wp-content/uploads/2018/04/Johnnie-Walker-Blue-Label-Ghost-and-Rare-advert.jpg",
    },
    {
      url: "https://www.budweiser.co/sites/g/files/seuoyk1191/files/2023-10/Banners2.jpg.webp",
    },
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
      url: "https://www.heineken.com/media-la/pmdddloe/brand-hero.jpg?anchor=center&mode=crop&width=2560&height=1440&quality=85"
    }
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
    <div className="animate__animated animate__slideInUp h-[620px] w-full relative group hidden md:block">
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
