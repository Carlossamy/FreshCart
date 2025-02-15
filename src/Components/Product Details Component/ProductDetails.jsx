import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import { useQuery } from "react-query";
import { ColorRing, FallingLines } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { cartContext } from "../../Context/CartContextProvider";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const [likedItems, setLikedItems] = useState({});
  const { id } = useParams();
  const [isClicked, setIsClicked] = useState(false);
  const { addProductCart, productsCart } = useContext(cartContext);

  async function handleAddProduct(productID) {
    if (productsCart.some((product) => product.product.id === productID)) {
      toast.success("Product already added!", {
        style: {
          border: "2px solid #3b82f6", //* blue-500
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
    const productsCartResult = await addProductCart(productID);
    setIsClicked(false);

    if (productsCartResult) {
      toast.success("Product added successfully to your cart!", {
        style: {
          border: "2px solid #3b82f6",
          padding: "20px",
          color: "#3b82f6"
        },
        iconTheme: {
          primary: "#3b82f6",
          secondary: "#EFF6FF"
        }
      });
    } else {
      toast.error("Product could not be added to your cart!", {
        style: {
          border: "2px solid #ef4444", //* red-500
          padding: "16px",
          color: "#ef4444" //* red-500
        },
        iconTheme: {
          primary: "#ef4444", //* red-500
          secondary: "#FEE2E2"
        }
      });
    }
  }

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["allProducts", id],
    queryFn: getProductDetails
  });

  const allProductDetails = data?.data?.data;

  if (isLoading) {
    return (
      <div className="h-screen bg-gray-300 flex items-center justify-center">
        <FallingLines
          color="#0356fc"
          width="100"
          visible={true}
          ariaLabel="falling-circles-loading"
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-96 flex items-center justify-center mt-28 mb-28">
        <div className="mx-auto p-5 rounded-md shadow-md w-1/3">
          <h2 className="text-2xl text-red-500 text-center">{error.message}</h2>
        </div>
      </div>
    );
  }

  if (allProductDetails) {
    return (
      <>
        <h2 className="text-3xl tracking-wider text-gray-500 mt-28 border-b-4 inline-block border-blue-500 pb-1 mx-4 rounded-md shadow-md p-1 bg-white ">
          Product Details
        </h2>

        <div className="md:container tracking-wider mt-4 mb-4 pb-3 flex items-center justify-between rounded-md sm:px-6">
          <div
            key={allProductDetails._id}
            className="shadow-md rounded-lg md:w-[25%] sm:w-[45%]">
            <Slider
              {...settings}
              arrows={false}
              autoplay={true}
              autoplaySpeed={3000}>
              {allProductDetails.images.map((image, index) => (
                <div key={index}>
                  <img
                    className="w-96 h-96 cursor-pointer px-2 object-center py-3 focus:outline-none rounded-md hover:scale-95 transition-all duration-500"
                    src={image}
                    alt={allProductDetails.title}
                  />
                </div>
              ))}
            </Slider>
          </div>

          <div className="md:w-[67%] sm:w-[50%]">
            <h2 className="text-2xl pb-2">
              <span className="font-bold shadow-md text-gray-500 border-b-2 rounded-md border-blue-500 p-1 leading-10">
                Title:
              </span>{" "}
              <span className="uppercase">{allProductDetails.title}</span>
            </h2>
            <p className="text-lg pt-2 pb-2">
              <span className="font-bold shadow-md border-b-2 rounded-md border-blue-500 p-1 text-gray-500 leading-9">
                Description:
              </span>{" "}
              {allProductDetails.description}
            </p>
            <h2 className="text-lg pb-3">
              <span className="font-bold shadow-md text-gray-500 border-b-2 rounded-md border-blue-500 p-1">
                Brand:
              </span>{" "}
              {allProductDetails.brand.name}
            </h2>
            <h2 className="text-lg pb-3">
              <span className="font-bold shadow-md text-gray-500 border-b-2 rounded-md border-blue-500 p-1">
                Category:
              </span>{" "}
              {allProductDetails.category?.name || "No category available"}
            </h2>
            <div className="flex items-center justify-between w-80">
              <p className="text-lg pb-2">
                <span className="font-bold shadow-md text-gray-500 border-b-2 rounded-md border-blue-500 p-1">
                  Price:
                </span>{" "}
                ${allProductDetails.price} USD
              </p>
              <p>
                <i className="fa-solid fa-star text-amber-300"></i>{" "}
                {typeof allProductDetails.ratingsAverage === "number"
                  ? allProductDetails.ratingsAverage
                  : "No rating available"}
              </p>
            </div>

            <div className="flex items-center justify-between w-80">
              <button
                className="flex items-center justify-between gap-1 font-semibold text-lg mt-3 py-2 px-12 text-gray-50 bg-blue-500 rounded-md shadow-md hover:text-blue-500 focus:outline-none border-3 border-blue-500 hover:bg-transparent hover:translate-y-1 transition duration-500"
                onClick={() => handleAddProduct(allProductDetails._id)}>
                Add To Cart
                {isClicked && (
                  <ColorRing
                    visible={true}
                    height="30"
                    width="30"
                    ariaLabel="color-ring-loading"
                    colors={[
                      "#d97706",
                      "#d97706",
                      "#d97706",
                      "#d97706",
                      "#d97706"
                    ]}
                  />
                )}
              </button>
              <p
                className="inline-block cursor-pointer transition duration-300 pt-3"
                onClick={() =>
                  setLikedItems((prev) => ({
                    ...prev,
                    [allProductDetails._id]: !prev[allProductDetails._id]
                  }))
                }>
                {likedItems[allProductDetails._id] ? (
                  <i className="fa-solid fa-heart text-red-500 text-2xl"></i>
                ) : (
                  <i className="fa-regular fa-heart text-red-500 text-2xl"></i>
                )}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}
