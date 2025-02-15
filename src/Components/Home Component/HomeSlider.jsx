// import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Casual from "../../assets/Home Slider/Casual.jpg";
import Bags from "../../assets/Home Slider/Bags.jpg";
import Fruits from "../../assets/Home Slider/Fruits.jpg";
import Sale from "../../assets/Home Slider/Sale.jpg";
import Glasses from "../../assets/Home Slider/Glasses.jpg";
import Cart from "../../assets/Home Slider/Cart.jpg";
import Electronics from "../../assets/Home Slider/Electronics.png";
import BeautyHealth from "../../assets/Home Slider/Beauty & Health.png";

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1
  };

  return (
    <>
      <div className=" mx-4 py-5 mt-20 flex shadow-sm rounded-lg">
        <div className="w-3/4 bg-white">
          <Slider
            {...settings}
            arrows={false}
            autoplay={true}
            autoplaySpeed={3000}>
            <div>
              <img
                className="w-full h-96 object-center cursor-pointer "
                src={Casual}
                alt=""
              />
            </div>
            <div>
              <img
                className="w-full h-96 object-center cursor-pointer"
                src={Bags}
                alt=""
              />
            </div>
            <div>
              <img
                className="w-full h-96 object-center cursor-pointer"
                src={Fruits}
                alt=""
              />
            </div>
            <div>
              <img
                className="w-full h-96 object-center cursor-pointer"
                src={Sale}
                alt=""
              />
            </div>
            <div>
              <img
                className="w-full h-96 object-center cursor-pointer"
                src={Glasses}
                alt=""
              />
            </div>
            <div>
              <img
                className="w-full h-96 object-center cursor-pointer"
                src={Cart}
                alt=""
              />
            </div>
          </Slider>
        </div>
        <div className="w-1/4 bg-white">
          <div>
            <img
              className="w-full h-48 object-center cursor-pointer"
              src={Electronics}
              alt=""
            />
          </div>
          <div>
            <img
              className="w-full h-48 object-center cursor-pointer"
              src={BeautyHealth}
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}
