// import React from "react";
// import { useEffect } from "react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ColorRing, FallingLines } from "react-loader-spinner";
import SimpleSlider from "./HomeSlider";
import CategoriesSlider from "./CategoriesSlider";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { cartContext } from "../../Context/CartContextProvider";

export default function Products() {
  const [likedItems, setLikedItems] = useState({});

  const [uniqeButton, setUniqeButton] = useState(null);

  const [isClicked, setIsClicked] = useState(false);

  const { addProductCart, productsCart } = useContext(cartContext);

  async function handleAddProduct(productID) {
    if (productsCart.some((product) => product.product.id === productID)) {
      toast.success("Product already added!", {
        style: {
          border: "1px solid #3b82f6", //* blue-500
          padding: "16px",
          color: "#3b82f6" //* blue-500
        },
        iconTheme: {
          primary: "#3b82f6", //* blue-500
          secondary: "#EFF6FF"
        }
      });
      return;
    }

    setIsClicked(true);
    setUniqeButton(productID);
    const productsCartResult = await addProductCart(productID);
    //! console.log("Product Results", productsCartResult);

    if (productsCartResult) {
      //! Success Message!
      //! navigate
      toast.success("Product added successfully to your cart!", {
        style: {
          border: "1px solid #3b82f6", //* blue-500
          padding: "16px",
          color: "#3b82f6" //* blue-500
        },
        iconTheme: {
          primary: "#3b82f6", //* blue-500
          secondary: "#EFF6FF"
        }
      });
      setIsClicked(false);
    } else {
      //! Error Message!
      toast.error("Product could not be added to your cart!", {
        style: {
          border: "1px solid #ef4444", //* red-500
          padding: "16px",
          color: "#ef4444" //* red-500
        },
        iconTheme: {
          primary: "#ef4444", //* red-500
          secondary: "#FEE2E2"
        }
      });

      setIsClicked(false);
    }
  }

  function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProducts

    //? Another options is available, I can configure the useQuery with:
    //! retryOnMount: true,
    //* By default the retryOnMount Property is set to (true), and its role to Re-fetching the data after
    //* the Function is in Mounted Phase, and take Boolean value (True or False)!

    //! refetchInterval: 3000,
    //* By default the refetchInterval Property is set to (0 second), and its role to Re-fetch the data after
    //* the Time I set it, like (refetchInterval: 3000,) that means every single (3 seconds) the data will be fetched immediately!

    //! retry: 5,
    //* By default the retry Property is set to (0 times) on Real Server, but in Virtual Server is set to (3 times),
    //* and its role to Re-fetching the data if there's any error during
    //* the fetch data, (retry: 5,) => In that case I define the number of times, (5 times) to retry to re-fetch the data,
    //* after that number of times, it will stop Retrying, to re-fetch the data!

    //! retryDelay: 1000 * 60,
    //* By default the retryDelay Property is set to (0 seconds),
    //* and its role is to Deley the process of the retrying between every single process of retrying!
    //* Like (retryDelay: 1000 * 60,), that means between every single process of the retrying, it will deley the process of the retrying
    //* (1 Minute => 1000 second * 60 seconds), it should be in seconds, so we will multiply the seconds I want to delay the process
    //* with 60 seconds, that means 1 Minute, (5 Minutes => 5000 * 60)!

    //! cacheTime: 3000 * 60,
    //* By default the cacheTime Property is set to (5 Minutes), and its role is to Cache the Data, that fetched, just during the time
    //* that I set, after the Time is up, the data will be deleted form the caching!
    //* The Time will be in Countdown, Once the user leaves the Component!

    //! refetchOnWindowFocus: true,
    //* By default the refetchOnWindowFocus Property is set to (true), and its role is to Re-fetch the data, Once the user foucused on
    //* any Component in the Web, that means the user click on the window, or left web, in that case the data will be Re-feched,
    //* and when the user back again to the Web, the data will be Re-feched, and also when click on any component again!

    //! staleTime: 5000,
    //* By default the staleTime Property is set to (0 seconds), and it works with refetchOnWindowFocus Property,
    //* and its role is to know the refetchOnWindowFocus Property, after the Time
    //* I set to the staleTime Property, you can consider the data is stale, so you should to Re-fetch it after that Time,
    //* but before that time I set to the staleTime Property don't Re-fetch it!

    //! placeholderData: keepPreviousData,
    //* This property is Special one, cuz its value depends on value from React Query Library, and that value is keepPreviousData,
    //* and it works with React Query Version 5,
    //* and the role of placeholderData is to Keep Previous Data to show in the UI, in case happened error during fetching the data,
    //* and also I did't handle the message of the error!

    //! enabled: true,
    //* By default the enabled property is set to (true), and its role is stop fetching data by default once User is logged in,
    //* instead of that, I will do button and I want the fetching happens, once the user clicked on the button,
    //* there's method called refetch that can handle that process, first make enabled with false value,
    //* and destructing the refetch method from the useQuery, and use it with onClick={refetch} enside the button!
  });

  useEffect(() => {
    const toastTimer = setTimeout(() => {
      toast("Welcome! Browse & Buy", {
        duration: 3000, //! the time that the toast will be shown!
        position: "top-center",
        icon: "🛒",
        style: {
          border: "2px solid #3b82f6",
          padding: "16px",
          color: "#3b82f6",
          letterSpacing: "2px"
        }
      });
    }, 3000); //! Delay after loading the Products Component!

    return () => clearTimeout(toastTimer);
  }, []);

  // console.log(data?.data?.data);

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

  const allProducts = data?.data?.data;

  if (allProducts) {
    return (
      <>
        {allProducts ? (
          <>
            <SimpleSlider />
            <CategoriesSlider />
            <h2 className="text-3xl tracking-wider text-gray-500 mt-20 border-b-4 inline-block border-blue-500 pb-1 mx-4 rounded-md shadow-md p-1 bg-white ">
              Popular Products
            </h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 mx-4 py-10">
              {allProducts.map((product) => (
                <>
                  <div
                    key={product._id}
                    className="product-card p-3 shadow-md rounded-md">
                    <div className="md:h-64 bg-white w-full">
                      <Link to={`/productDetails/${product._id}`}>
                        <img
                          src={product.imageCover}
                          alt={product.title}
                          className="md:object-cover sm:object-fill mix-blend-multiply mx-auto w-full sm:h-full md:h-64 rounded-md hover:scale-95 transition-all duration-500 cursor-pointer"
                        />
                      </Link>
                    </div>

                    <h3 className="pt-3 pb-2 text-blue-500 text-lg tracking-wider">
                      {product.category.name}
                    </h3>
                    <h2 className="pt-2 font-semibold uppercase tracking-wider">
                      {product.title
                        .split(" ")
                        .splice(0, 1)
                        .concat(
                          <span className="">
                            ...{" "}
                            <span className="text-blue-500 text-lg tracking-wide underline inline-block hover:text-blue-700 capitalize">
                              <Link to={`/productDetails/${product._id}`}>
                                {" "}
                                More Details
                              </Link>
                            </span>
                          </span>
                        )}
                    </h2>
                    <div className="flex items-center justify-between pt-2 pb-2">
                      <div className="flex items-center gap-2">
                        <span>
                          <span className="text-lg">
                            <span className="tracking-wide">Price:</span> $
                          </span>
                          {product.price}
                        </span>
                        <span className="relative">
                          {product.priceAfterDiscount}
                          <span className="absolute top-1/2 left-0 w-full h-[2px] bg-red-500 rotate-[-15deg]"></span>
                        </span>
                      </div>
                      <p className="flex items-center gap-1">
                        <i className="fa-solid fa-star text-amber-300"></i>
                        {product.ratingsAverage}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        className="flex items-center justify-between gap-2 font-medium text-md py-1 px-4 bg-blue-500 text-gray-50 rounded-md shadow-md hover:text-blue-500 hover:bg-transparent hover:translate-y-1 focus:outline-none border-3 border-blue-500 transition duration-500"
                        onClick={() => handleAddProduct(product._id)}>
                        Add To Cart
                        <span>
                          {uniqeButton == product._id ? (
                            isClicked !== true ? (
                              ""
                            ) : (
                              <ColorRing
                                visible={true}
                                height="30"
                                width="30"
                                ariaLabel="color-ring-loading"
                                wrapperStyle={{}}
                                wrapperClass="color-ring-wrapper"
                                colors={[
                                  "#d97706",
                                  "#d97706",
                                  "#d97706",
                                  "#d97706",
                                  "#d97706"
                                ]}
                              />
                            )
                          ) : null}
                        </span>
                      </button>
                      <p
                        className="inline-block cursor-pointer transition duration-300"
                        onClick={() =>
                          setLikedItems((prev) => ({
                            ...prev,
                            [product._id]: !prev[product._id]
                          }))
                        }>
                        {likedItems[product._id] ? (
                          <i className="fa-solid fa-heart text-red-500 text-2xl"></i>
                        ) : (
                          <i className="fa-regular fa-heart text-red-500 text-2xl"></i>
                        )}
                      </p>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </>
        ) : null}
      </>
    );
  }
}
