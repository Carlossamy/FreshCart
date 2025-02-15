// import React from "react";

import { cartContext } from "../../Context/CartContextProvider";
import { ColorRing, FallingLines } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Cart() {
  const {
    productsCart,
    totalCartPrice,
    updateQuantity,
    deleteProduct,
    clearCart,
    setIsOnline
  } = useContext(cartContext);
  //! console.log(productsCart);

  const [isCartEmpty, setIsCartEmpty] = useState(true);

  const [isClicked, setIsClicked] = useState(false);

  const [clickedButton, setClickedButton] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  async function handleUpdateCount(cartId, newCount) {
    const updatedQuantityResult = await updateQuantity(cartId, newCount);
    console.log(cartId);

    if (updatedQuantityResult) {
      //! Success Message!
      //! navigate
      toast.success("Count updated successfully!", {
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
    } else {
      //! Error Message!
      toast.error("Count could not be updated!", {
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

  useEffect(() => {
    //! console.log("Products Cart: ", productsCart);
    const isEmpty = !productsCart || productsCart.length === 0;
    setIsCartEmpty(isEmpty);
  }, [productsCart, setIsCartEmpty]);

  useEffect(() => {
    if (productsCart === null) {
      setTimeout(() => setIsLoading(false), 3000);
    } else {
      setIsLoading(false);
    }
  }, [productsCart]);

  async function handleDelete(Id) {
    setIsClicked(true);
    setClickedButton(Id);

    const resultProduct = await deleteProduct(Id);

    if (resultProduct) {
      //! Success Message!
      //! navigate
      toast.success("Item deleted successfully!", {
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
      setIsClicked(true);
    } else {
      //! Error Message!
      toast.error("Failed to delete item! Please try again.", {
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
      setIsClicked(false);
    }
  }

  function checkCount(count) {
    if (count === 1) {
      toast.error("At least 1 item is required!", {
        style: {
          border: "2px solid #ef4444", //! red-500
          padding: "16px",
          color: "#ef4444" //! red-500
        },
        iconTheme: {
          primary: "#ef4444", //! red-500
          secondary: "#FEE2E2"
        }
      });
    }
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

  async function handleClearCart() {
    setIsClicked(true);
    setClickedButton("clear-cart");
    const isCleared = await clearCart();

    if (isCleared) {
      toast.success("Cart cleared successfully!", {
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
      setIsClicked(true);
    } else {
      toast.error("Failed to clear cart! Please try again.", {
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
      setIsClicked(false);
    }
  }

  return (
    <>
      {isCartEmpty ? (
        <div className="h-96 flex items-center justify-center mt-28 mb-24 tracking-wider">
          <div className="mx-auto p-5 rounded-md shadow-md w-1/3">
            <h2 className="text-2xl text-blue-500 text-center">
              Your cart is currently empty. Start shopping now and add your
              favorite items!
            </h2>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-3xl tracking-wider text-gray-500 mt-28 border-b-4 inline-block border-blue-500 pb-1 md:mx-6 sm:mx-1 rounded-md shadow-md p-1 bg-white ">
              Products Cart
            </h2>

            <button
              onClick={handleClearCart}
              className="flex justify-between items-center gap-1 tracking-wider mt-28 md:mx-6 sm:mx-1 text-lg font-light py-1 px-4 bg-blue-500 text-gray-50 rounded-md shadow-md hover:text-blue-500 hover:bg-transparent hover:translate-y-1 focus:outline-none border-3 border-blue-500 transition duration-500">
              Clear Cart
              <div>
                {clickedButton == "clear-cart" ? (
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
              </div>
            </button>
          </div>
          <div className="mt-12 mb-12 sm:mx-1 md:mx-6 relative overflow-x-auto shadow-lg rounded-lg border-3">
            <table className=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-lg text-gray-900 uppercase border-b-2 rounded-lg">
                <tr>
                  <th scope="col" className="px-10 py-3">
                    <span className="text-xl"></span>
                  </th>
                  <th
                    scope="col"
                    className="text-md px-6 py-3 font-light tracking-wider">
                    Product
                  </th>
                  <th
                    scope="col"
                    className="text-md px-6 py-3 font-light tracking-wider">
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="text-md px-6 py-3 font-light tracking-wider">
                    Price
                  </th>
                  <th
                    scope="col"
                    className="text-md px-6 py-3 font-light tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {productsCart?.map((product) => (
                  <>
                    <tr
                      key={product._id}
                      className="border-b-2 border-gray-400 hover:bg-gray-50 hover:bg-opacity-55">
                      <td className="p-4 w-60">
                        <Link to={`/productDetails/${product.product._id}`}>
                          <img
                            src={product.product.imageCover}
                            className="md:w-48 w-full h-full rounded-md shadow-md hover:scale-95 transition-all duration-500"
                            alt={product.product.title}
                          />
                        </Link>
                      </td>
                      <td className="px-6 py-4 font-light uppercase tracking-wider sm:text-md md:text-lg text-gray-900">
                        {product.product.title
                          .split(" ")
                          .splice(0, 3)
                          .join(" ")}
                        ...{" "}
                        <span className="text-blue-500 sm:text-sm md:text-lg underline tracking-wide inline-block hover:text-blue-700 capitalize">
                          <Link to={`/productDetails/${product.product._id}`}>
                            View Product
                          </Link>
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center focus:outline-none">
                          <button
                            onClick={() => {
                              product.count === 1
                                ? checkCount(product.count)
                                : handleUpdateCount(
                                    product.product._id,
                                    product.count - 1
                                  );
                            }}
                            className="inline-flex items-center justify-center p-1 me-3 text-md font-semibold sm:h-7 sm:w-7 md:h-8 md:w-8 text-gray-900 bg-white rounded-full focus:outline-none border-2 border-blue-500 hover:border-blue-600 hover:text-blue-500 transition-all duration-200"
                            type="button">
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2">
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 1h16"
                              />
                            </svg>
                          </button>
                          <div className="relative">
                            <div className="md:w-20 h-8 sm:w-16 focus:outline-none border-2 border-blue-500 hover:border-blue-500 bg-white rounded-lg sm:px-2.5 md:px-3.5 py-1" />
                            <span className="absolute top-[6px] md:left-9 sm:left-[30px] translate-x-[-50%] text-md text-gray-900 block">
                              {product.count}
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              handleUpdateCount(
                                product.product._id,
                                product.count + 1
                              )
                            }
                            className="inline-flex items-center justify-center p-1 ms-3 text-md font-semibold sm:h-7 sm:w-7 md:h-8 md:w-8 text-gray-900 bg-white rounded-full focus:outline-none border-2 border-blue-500 hover:border-blue-600 hover:bg-transparent hover:text-blue-500 transition-all duration-200"
                            type="button">
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18">
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-light tracking-wider sm:text-md md:text-lg text-gray-900">
                        ${product.price}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDelete(product.product._id)}
                          className="flex items-center justify-between gap-2 font-light tracking-wider text-md px-4 py-2 hover:shadow-md shadow-sm hover:text-blue-500 bg-blue-500 text-gray-50 rounded-md hover:bg-transparent transition duration-300 hover:translate-y-1 focus:outline-none border-3 border-blue-500">
                          Remove
                          <span>
                            {clickedButton == product.product._id ? (
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
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
            <div className=" flex items-center justify-around w-full text-center">
              <div className="md:mt-[45px] sm:mt-[47px] border-3 border-blue-500 hover:border-blue-600 rounded-md shadow-md hover:bg-gray-50 hover:bg-opacity-55 sm:px-4 sm:py-2 md:px-5 md:py-3 text-xl tracking-wider text-gray-900">
                Total Price: ${totalCartPrice} USD
              </div>

              <div className="px-6 py-4 text-lg tracking-wider text-gray-900">
                <h2 className="mb-3 text-xl font-light text-gray-700 tracking-wider border-b-[3px] p-1 inline-block clear-both border-blue-500 hover:border-blue-600 rounded-md shadow-md">
                  Select your payment method:
                </h2>
                <div className="flex items-center">
                  <Link to={"/payment"}>
                    <button
                      onClick={() => {
                        setClickedButton == "cash";
                        setIsOnline(false);
                      }}
                      className="py-2 px-2 sm:w-38 md:w-52 hover:shadow-lg shadow-md hover:text-blue-500 bg-blue-500 text-gray-50 rounded-md hover:bg-transparent transition duration-300 hover:translate-y-1 focus:outline-none border-3 border-blue-500">
                      Cash Payment
                    </button>
                    <span>
                      {clickedButton == "cash" ? (
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
                  </Link>
                  <button
                    onClick={() => {
                      setClickedButton == "online";
                      setIsOnline(true);
                    }}
                    className="ml-4 py-2 px-2 sm:w-38 md:w-52 hover:shadow-lg shadow-md hover:text-blue-500 bg-blue-500 text-gray-50 rounded-md hover:bg-transparent transition duration-300 hover:translate-y-1 focus:outline-none border-3 border-blue-500">
                    Online Payment
                    <span>
                      {clickedButton == "online" ? (
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
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
