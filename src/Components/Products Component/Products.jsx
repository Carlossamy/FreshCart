import { useContext, useState } from "react";
import axios from "axios";
import { ColorRing, FallingLines } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { cartContext } from "../../Context/CartContextProvider";

export default function Products() {
  const [likedItems, setLikedItems] = useState({});

  const [isClicked, setIsClicked] = useState(false);

  const [activeButton, setActiveButton] = useState(null);

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

    setActiveButton(productID);
    setIsClicked(true);
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

  const { isError, isLoading, data, error } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProducts
  });

  if (isError) {
    return (
      <div className="h-96 flex items-center justify-center mt-28 mb-28">
        <div className="mx-auto p-5 rounded-md shadow-md w-1/3">
          <h2 className="text-2xl text-red-500 text-center">{error.message}</h2>
        </div>
      </div>
    );
  }

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

  const productDetails = data.data.data;

  if (productDetails) {
    return (
      <>
        <h2 className="text-3xl tracking-wider text-gray-500 mt-28 border-b-4 inline-block border-blue-500 pb-1 mx-4 rounded-md shadow-md p-1">
          All Products
        </h2>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 mx-4 py-10 ">
          {productDetails.map((product) => (
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
              <h2 className="pt-2 font-semibold tracking-wider uppercase">
                {product.title
                  .split(" ")
                  .splice(0, 1)
                  .concat(
                    <span>
                      ...{" "}
                      <span className="text-blue-500 text-lg underline tracking-wide inline-block hover:text-blue-700 capitalize">
                        <Link to={`/productDetails/${product._id}`}>
                          More Details
                        </Link>
                      </span>
                    </span>
                  )}
              </h2>

              <div className="flex items-center justify-between pt-2 pb-2">
                <div className="flex items-center gap-2">
                  <span>
                    {" "}
                    <span className="text-lg">
                      <span className="tracking-wide">Price:</span> $
                    </span>
                    {product.price}
                  </span>
                  {product.priceAfterDiscount && (
                    <span className="relative">
                      {product.priceAfterDiscount}
                      <span className="absolute top-1/2 left-0 w-full h-[2px] bg-red-500 rotate-[-15deg]"></span>
                    </span>
                  )}
                </div>
                <p className="flex items-center gap-1">
                  <i className="fa-solid fa-star text-amber-300"></i>
                  {product.ratingsAverage}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleAddProduct(product._id)}
                  className="flex items-center justify-between gap-2 font-medium text-md py-1 px-4 bg-blue-500 text-gray-50 rounded-md shadow-md hover:text-blue-500 hover:bg-transparent hover:translate-y-1 focus:outline-none border-3 border-blue-500 transition duration-500">
                  Add To Cart
                  <span>
                    {activeButton == product._id ? (
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
          ))}
        </div>
      </>
    );
  }
}
