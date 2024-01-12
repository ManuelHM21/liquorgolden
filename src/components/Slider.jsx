import React from "react";
import "animate.css/animate.min.css";

const Slider = () => {
  return (
    <div className="animate__animated animate__fadeInRight backdrop-blur-md w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
        <li>
          <img
            src="https://www.johnniewalker.com/inc/images/global/JohnnieWalkerFooter.svg"
            alt="logo"
            className="w-50"
          />
        </li>
        <li>
          <img
            src="https://www.oldparr.co/assets/img/favicon.png"
            alt="logo"
            className="w-40"
          />
        </li>
        <li>
          <img
            src="https://www.buchanansmexico.com/assets//img/template/logo-footer.png"
            alt="logo"
            className="w-32"
          />
        </li>
        <li>
          <img
            src="https://www.cervezacorona.co/sites/g/files/seuoyk1576/files/logo%20%281%29_1_0.png"
            alt="logo"
            className="w-32"
          />
        </li>
        <li>
          <img
            src="https://www.heineken.com/media-la/1svj0bvv/heineken-logo.svg"
            alt="logo"
            className="w-32"
          />
        </li>
        <li>
          <img
            src="https://www.budweiser.co/sites/g/files/seuoyk1191/files/Logo%20bud%20nuevo%201%20%281%29%20%281%29.png.webp"
            alt="logo"
            className="w-44"
          />
        </li>
        
      </ul>
      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
        <li>
          <img
            src="https://www.johnniewalker.com/inc/images/global/JohnnieWalkerFooter.svg"
            alt="logo"
            className="w-50"
          />
        </li>
        <li>
          <img
            src="https://www.oldparr.co/assets/img/favicon.png"
            alt="logo"
            className="w-40"
          />
        </li>
        <li>
          <img
            src="https://www.buchanansmexico.com/assets//img/template/logo-footer.png"
            alt="logo"
            className="w-32"
          />
        </li>
        <li>
          <img
            src="https://www.cervezacorona.co/sites/g/files/seuoyk1576/files/logo%20%281%29_1_0.png"
            alt="logo"
            className="w-32"
          />
        </li>
        <li>
          <img
            src="https://www.heineken.com/media-la/1svj0bvv/heineken-logo.svg"
            alt="logo"
            className="w-32"
          />
        </li>
        <li>
          <img
            src="https://www.budweiser.co/sites/g/files/seuoyk1191/files/Logo%20bud%20nuevo%201%20%281%29%20%281%29.png.webp"
            alt="logo"
            className="w-44"
          />
        </li>
        
      </ul>
    </div>
  );
};

export default Slider;
