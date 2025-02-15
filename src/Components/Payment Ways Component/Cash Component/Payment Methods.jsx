// import React from 'react'

import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";
import { useState } from "react";
import * as yup from "yup";
import axios from "axios";
import { cartContext } from "../../../Context/CartContextProvider";

export default function PaymentComponent() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  const { cartID, isOnline } = useContext(cartContext);
  console.log("Cart ID: ", cartID, "Is Online Payment: ", isOnline);

  function detectAndCall(values) {
    if (isOnline) {
      onlinePayment(values, cartID);
    } else {
      cashPayment(values);
    }
  }

  async function onlinePayment(onlineValues, cartID) {
    console.log("Initiating online payment with cartID:", cartID);
    setIsClicked(true);
    const shippingInfo = { shippingAddress: onlineValues };

    await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}`,
        shippingInfo,
        {
          headers: { token: localStorage.getItem("userToken") }
        },
        {
          params: {
            url: "http://localhost:5173"
          }
        }
      )
      .then((response) => {
        // console.log(values);
        paymentFormik.resetForm();
        setIsClicked(false);
        setIsSuccess(response.data.message);

        window.open(response.data.session.url, "_self");
      })
      .catch((error) => {
        // console.log(error.response.data.message);
        setErrorMessage(error.response.data.message);
        setIsClicked(false);
        setErrorMessage(null);
        paymentFormik.resetForm();
      });
  }

  async function cashPayment(cashValues, cartID) {
    console.log("Initiating cash payment with cartID:", cartID);

    // try {
    //   const { data } = await axios.post(
    //     "https://ecommerce.routemisr.com/api/v1/auth/signup",
    //     user
    //   );
    //   console.log(data);
    // } catch (error) {
    //   const data = error.response.data;
    //   console.log("Error registering user:", data.message);
    // }

    setIsClicked(true);
    const shippingInfo = { shippingAddress: cashValues };

    await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartID}`,
        shippingInfo,
        {
          headers: { token: localStorage.getItem("userToken") }
        }
      )
      .then((values) => {
        // console.log(values);
        paymentFormik.resetForm();
        setIsClicked(false);
        setIsSuccess(values.data.message);
      })
      .catch((error) => {
        // console.log(error.response.data.message);
        setErrorMessage(error.response.data.message);
        setIsClicked(false);
        setTimeout(() => setErrorMessage(null), 1000);
        paymentFormik.resetForm();
      });
  }

  useEffect(() => {
    console.log("Cart ID in PaymentComponent:", cartID);
  }, [cartID]);

  const paymentFormik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: ""
    },

    onSubmit: detectAndCall,

    validationSchema: yup.object().shape({
      details: yup.string().required("Message are required"),
      phone: yup
        .string()
        .matches(/^(\+20-)?01[0125][0-9]{8}$/, "Invalid phone number")
        .required("Phone is required"),
      city: yup
        .string()
        .min(5, "Address too short")
        .required("Address is required")
    })
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Operation completed successfully!", {
        style: {
          border: "2px solid #3b82f6", //!1 blue-500
          padding: "16px",
          color: "#3b82f6" //! blue-500
        },
        iconTheme: {
          primary: "#3b82f6", //! blue-500
          secondary: "#EFF6FF"
        }
      });
    }

    if (errorMessage) {
      toast.error("An error occurred, please try again!", {
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
  }, [isSuccess, errorMessage]);

  return (
    <>
      <form
        onSubmit={(e) => {
          paymentFormik.handleSubmit(e);
        }}
        className="max-w-2xl mx-auto mt-36 bg-transparent p-8 shadow-lg rounded-2xl md:w-full sm:w-3/4 mb-14">
        <h2 className="text-center text-2xl p-1 tracking-wider font-light text-gray-600 mb-6 border-b-4 border-blue-500 rounded-md shadow-md inline-block relative left-[50%] translate-x-[-50%]">
          Go cash now
        </h2>

        <div className="relative w-full mb-5">
          <input
            value={paymentFormik.values.city}
            onChange={paymentFormik.handleChange}
            onBlur={paymentFormik.handleBlur}
            type="text"
            name="city"
            id="city"
            className="block w-full px-4 py-3 tracking-wider text-md text-sm text-gray-800 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="* Enter your address!"
            required
          />
          {paymentFormik.touched.city && paymentFormik.errors.city ? (
            <div className="text-red-500 text-md tracking-wider mt-1">
              {paymentFormik.errors.city}
            </div>
          ) : null}
        </div>

        <div className="relative w-full mb-5">
          <input
            value={paymentFormik.values.phone}
            onChange={paymentFormik.handleChange}
            onBlur={paymentFormik.handleBlur}
            type="tel"
            name="phone"
            id="phone"
            className="block w-full px-4 py-3 tracking-wider text-md text-sm text-gray-800 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="* Enter your phone!"
            required
          />
          {paymentFormik.touched.phone && paymentFormik.errors.phone ? (
            <div className="text-red-500 text-md tracking-wider mt-1">
              {paymentFormik.errors.phone}
            </div>
          ) : null}
        </div>

        <div className="relative w-full mb-5">
          <textarea
            rows={3}
            value={paymentFormik.values.details}
            onChange={paymentFormik.handleChange}
            onBlur={paymentFormik.handleBlur}
            type="text"
            name="details"
            id="details"
            className="resize-none block w-full px-4 py-3 tracking-wider text-md text-gray-800 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="* Leave your message here!"
            required
          />
          {paymentFormik.touched.details && paymentFormik.errors.details ? (
            <div className="text-red-500 text-md tracking-wider mt-1">
              {paymentFormik.errors.details}
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          className="flex justify-center text-lg tracking-wider items-center gap-1 w-1/2 mx-auto py-3 hover:text-blue-500 bg-blue-500 text-gray-50 rounded-md hover:bg-transparent transition duration-300 hover:translate-y-1 focus:outline-none border-3 border-blue-500">
          Send Now
          {isClicked !== true ? (
            ""
          ) : (
            <ColorRing
              visible={true}
              height="30"
              width="30"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["#d97706", "#d97706", "#d97706", "#d97706", "#d97706"]}
            />
          )}
        </button>
      </form>
    </>
  );
}
