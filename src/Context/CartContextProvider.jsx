// import React from 'react'

import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  const [isOnline, setIsOnline] = useState(false);

  const [productsCart, setProductsCart] = useState(null);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [cartID, setCartID] = useState(null);

  async function addProductCart(productID) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: productID
        },
        { headers: { token: localStorage.getItem("userToken") } }
      )
      .then((response) => {
        //* setNumOfCartItems(response.data.numOfCartItems);
        //* setTotalCartPrice(response.data.data.totalCartPrice);
        //* setProductsCart(response.data.data.products);

        console.log(response);
        getUsersCart();
        //! I called getUsersCart here, cuz in case addProductCart the product will be called as String instead of object
        //! and so, the data in the cart could't be looped through data of string, so the imageCart and the Title will not be shown
        //! after the user adds the product, but in case getUsersCart the backend developer returns the data as an object,
        //! so we could loop through the data, but this case works when the getUsersCart entered in componentDidMount phase,
        //! means after the user does Refresh the browser!
        //* so we could call getUsersCart(); function in then method of addProductCart function, cuz it will returen the product as an object
        //* although that will load the data, cuz it will call the Same API, but this the current solution to solve the problem,
        //* so the addProductCart function will call Two APIs, the first for POST and the second for GET
        //* it should the backend developer return the data as an object in case addProductCart functhion,

        //! console.log(response);
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

  async function getUsersCart() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token: localStorage.getItem("userToken") }
      })
      .then((response) => {
        setNumOfCartItems(response.data.numOfCartItems);
        setTotalCartPrice(response.data.data.totalCartPrice);
        setProductsCart(response.data.data.products);

        setCartID(response.data.data.cartOwner);
        //! console.log(cartID);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // useEffect(() => {
  //   getUsersCart();
  // }, []);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      getUsersCart(); //! When the user refresh the browser or the user logged in, the getUsersCart function will re-invoved
      //! after the component is in the componentDidMount phase!
    }
  }, [localStorage.getItem("userToken")]); //! To Re-update the user token!

  async function updateQuantity(countID, newCount) {
    // console.log(countID);
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${countID}`,
        {
          count: newCount
        },
        { headers: { token: localStorage.getItem("userToken") } }
      )
      .then((response) => {
        setNumOfCartItems(response.data.numOfCartItems);
        setTotalCartPrice(response.data.data.totalCartPrice);
        setProductsCart(response.data.data.products);

        return true; //! For handling toast message!
      })
      .catch((error) => {
        console.log(error.message);

        return false; //! For handling toast message!
      });
  }

  async function deleteProduct(productID) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productID}`, {
        headers: { token: localStorage.getItem("userToken") }
      })
      .then((response) => {
        setNumOfCartItems(response.data.numOfCartItems);
        setTotalCartPrice(response.data.data.totalCartPrice);
        setProductsCart(response.data.data.products);

        return true; //! For handling toast message!
      })
      .catch((error) => {
        console.log(error.message);

        return false; //! For handling toast message!
      });
  }

  async function clearCart() {
    return axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart/", {
        headers: {
          token: localStorage.getItem("userToken")
        }
      })
      .then(() => {
        setNumOfCartItems(0);
        setTotalCartPrice(0);
        setProductsCart([]);

        return true; //! For handling toast message!
      })
      .catch((error) => {
        console.log(error.message);

        return false; //! For handling toast message!
      });
  }

  return (
    <>
      <cartContext.Provider
        value={{
          addProductCart,
          productsCart,
          numOfCartItems,
          totalCartPrice,
          getUsersCart,
          updateQuantity,
          deleteProduct,
          clearCart,
          cartID,
          isOnline,
          setIsOnline
        }}>
        {children}
      </cartContext.Provider>
    </>
  );
}
