// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useQuery } from "react-query";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FallingLines } from "react-loader-spinner";
import useAllCategories from "../Custom Hooks/useAllCategories";

export default function CategoriesSlider() {
  // const [allCategoriesSlider, setAllCategoriesSlider] = useState(null);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2
  };

  // async function getCatategories() {
  //   axios
  //     .get("https://ecommerce.routemisr.com/api/v1/categories")
  //     .then((response) => {
  //       setAllCategoriesSlider(response.data.data);
  //     })
  //     .catch((error) => {
  //       setAllCategoriesSlider(error);
  //     });
  // }

  // useEffect(() => {
  //   getCatategories();
  // }, []);

  const { data, isError, isLoading, error } = useAllCategories();

  if (isError) {
    return (
      <>
        <div className="h-96 flex items-center justify-center mt-28 mb-28">
          <div className=" mx-auto p-5 rounded-md shadow-md w-1/3">
            <h2 className="text-2xl text-red-500 text-center">
              {error.message}
            </h2>
          </div>
        </div>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <div className="h-screen bg-gray-300 flex items-center justify-center">
          <FallingLines
            color="#0356fc"
            width="100"
            visible={true}
            ariaLabel="falling-circles-loading"
          />
        </div>
      </>
    );
  }

  const allCategories = data?.data?.data;

  if (allCategories) {
    return (
      <>
        <h2 className="text-3xl tracking-wider text-gray-500 mt-20 border-b-4 inline-block border-blue-500 pb-1 mb-5 mx-4 rounded-md shadow-md p-1 bg-white">
          Featured Categories
        </h2>

        {allCategories.length > 0 ? (
          <Slider
            {...settings}
            arrows={false}
            autoplay={true}
            autoplaySpeed={3000}
            className="">
            {allCategories.map((category) => (
              <React.Fragment key={category._id}>
                <div className=" mx-2 rounded-md shadow-sm hover:scale-95 transition-all duration-500 cursor-pointer hover:text-blue-500">
                  <img
                    className="w-full h-64 object-cover cursor-pointer p-2 rounded-md "
                    src={category.image}
                    alt={category.name}
                  />
                  <h3 className="mt-4 mb-4 text-lg tracking-wider text-center pb-2 bg-white">
                    {category.name}
                  </h3>
                </div>
              </React.Fragment>
            ))}
          </Slider>
        ) : null}
      </>
    );
  }
}
