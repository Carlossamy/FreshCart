// import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { FallingLines } from "react-loader-spinner";

export default function Brands() {
  function getAllBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["allBrands"],
    queryFn: getAllBrands
  });

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

  const allBrands = data?.data?.data;

  return (
    <>
      <h2 className="text-3xl tracking-wider text-gray-500 mt-28 border-b-4 inline-block border-blue-500 pb-1 mx-4 rounded-md shadow-md p-1">
        All Brands
      </h2>
      <div className="container py-10">
        <div className="grid grid-cols-5 gap-3 mx-1">
          {allBrands?.map((brand) => (
            <div
              key={brand._id}
              className="rounded-md shadow-md p-2 mx-auto hover:text-blue-600 transition-all duration-150 text-blue-500">
              <img
                className="h-64 w-64 hover:scale-95 transition-all duration-500 cursor-pointer rounded-md"
                src={brand.image}
                alt={brand.name}
              />
              <h2 className="text-center text-xl tracking-wider p-3">
                {brand.name}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
