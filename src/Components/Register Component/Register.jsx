import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { authContext } from "../../Context/AuthContextProvider";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(authContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  async function registeredUser(user) {
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

    setIsClicked(true); //* set isClicked to true when user is clicked on the button
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", user)
      .then((result) => {
        // console.log(result);
        setIsSuccess(result.data.message);
        setIsClicked(false);
        setTimeout(() => setToken(result.data.token), 1000);
        setTimeout(() => navigate("/home"), 1000);
        myRegisterFormik.resetForm();
      })
      .catch((error) => {
        // console.log(error.response.data.message);
        setErrorMessage(error.response.data.message);
        setIsClicked(false);
        setTimeout(() => setErrorMessage(null), 2000);
        myRegisterFormik.resetForm();
      });
  }

  const myRegisterFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: ""
    },

    onSubmit: registeredUser,

    // validate: (inputValues) => {
    //   const errors = {};
    //   const nameRegex = /^[A-Za-z\s'-]{4,25}$/;
    //   const phoneRegex = /^(\+20-)?01[0125][0-9]{8}$/;
    //   const emailRegex = /^\w+@\w+\.\w{2,}$/;
    //   const passwordRegex =
    //     /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[\w!@#$%^&*]{6,20}$/;
    //   if (!nameRegex.test(inputValues.name)) {
    //     errors.name = "You must enter from 4 to 25 characters!";
    //   }
    //   if (!emailRegex.test(inputValues.email)) {
    //     errors.email = "You must enter a valid email address!";
    //   }
    //   if (!phoneRegex.test(inputValues.phone)) {
    //     errors.phone = "You must enter a valid phone number!";
    //   }
    //   if (!passwordRegex.test(inputValues.password)) {
    //     errors.password =
    //       "Password must be 6-20 characters long and include at least one uppercase letter, one lowercase letter, and one number.";
    //   }
    //   if (inputValues.password !== inputValues.rePassword) {
    //     errors.rePassword = "Passwords must match";
    //   }
    //   return errors;
    // }

    validationSchema: yup.object().shape({
      name: yup
        .string()
        .min(3, "Min characters is 3")
        .max(25, "Max Charechters is 25")
        .required("Full Name is Required"),
      email: yup.string().email("Invalid email").required("Email is Required"),
      phone: yup
        .string()
        .required("Phone is Required")
        .matches(/^(\+20-)?01[0125][0-9]{8}$/, "Invalid phone number"),
      password: yup
        .string()
        .required("Password is Required")
        .min(6, "Min characters is 6")
        .max(20, "Max characters is 20")
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[\w!@#$%^&*]{6,20}$/,
          "Invalid password"
        ),
      rePassword: yup
        .string()
        .required("Confirm Password is Required")
        .oneOf([yup.ref("password")], "Passwords must match")
    })
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Account created successfully!", {
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
    }

    if (errorMessage) {
      toast.error("Account already exists! Try logging in.", {
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
        onSubmit={myRegisterFormik.handleSubmit}
        className="max-w-2xl mx-auto mt-32 p-8 shadow-lg rounded-2xl md:w-full sm:w-3/4 mb-12">
        <h2 className="text-center p-1 text-2xl tracking-wider font-light text-gray-600 mb-6 border-b-4 border-blue-500 rounded-md shadow-md inline-block relative left-[50%] translate-x-[-50%]">
          Register Now
        </h2>

        <div className="relative w-full mb-5">
          <input
            value={myRegisterFormik.values.name}
            onChange={myRegisterFormik.handleChange}
            onBlur={myRegisterFormik.handleBlur}
            type="text"
            name="name"
            id="name"
            className="block w-full px-4 py-3 tracking-wider text-md text-gray-800 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="* Full Name"
            required
          />
          {myRegisterFormik.touched.name && myRegisterFormik.errors.name ? (
            <div className="text-red-500 text-sm mt-1">
              {myRegisterFormik.errors.name}
            </div>
          ) : null}
        </div>

        <div className="relative w-full mb-5">
          <input
            value={myRegisterFormik.values.email}
            onChange={myRegisterFormik.handleChange}
            onBlur={myRegisterFormik.handleBlur}
            type="email"
            name="email"
            id="email"
            className="block w-full px-4 py-3 tracking-wider text-md text-gray-800 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="* Email Address"
            required
          />
          {myRegisterFormik.touched.email && myRegisterFormik.errors.email ? (
            <div className="text-red-500 text-sm mt-1">
              {myRegisterFormik.errors.email}
            </div>
          ) : null}
        </div>

        <div className="relative w-full mb-5">
          <input
            value={myRegisterFormik.values.phone}
            onChange={myRegisterFormik.handleChange}
            onBlur={myRegisterFormik.handleBlur}
            type="tel"
            name="phone"
            id="phone"
            className="block w-full px-4 py-3 tracking-wider text-md text-gray-800 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="* Phone Number"
            required
          />
          {myRegisterFormik.touched.phone && myRegisterFormik.errors.phone ? (
            <div className="text-red-500 text-sm mt-1">
              {myRegisterFormik.errors.phone}
            </div>
          ) : null}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative w-full mb-5">
            <input
              value={myRegisterFormik.values.password}
              onChange={myRegisterFormik.handleChange}
              onBlur={myRegisterFormik.handleBlur}
              type="password"
              name="password"
              id="password"
              className="block w-full px-4 py-3 tracking-wider text-md text-gray-800 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="* Password"
              required
            />
            {myRegisterFormik.touched.password &&
            myRegisterFormik.errors.password ? (
              <div className="text-red-500 text-sm mt-1">
                {myRegisterFormik.errors.password}
              </div>
            ) : null}
          </div>

          <div className="relative w-full mb-5">
            <input
              value={myRegisterFormik.values.rePassword}
              onChange={myRegisterFormik.handleChange}
              onBlur={myRegisterFormik.handleBlur}
              type="password"
              name="rePassword"
              id="rePassword"
              className="block w-full px-4 py-3 tracking-wider text-md text-gray-800 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="* Confirm Password"
              required
            />
            {myRegisterFormik.touched.rePassword &&
            myRegisterFormik.errors.rePassword ? (
              <div className="text-red-500 text-sm mt-1">
                {myRegisterFormik.errors.rePassword}
              </div>
            ) : null}
          </div>
        </div>

        <button
          type="submit"
          className="flex justify-center text-lg tracking-wider items-center gap-1 w-1/2 mx-auto py-3 hover:text-blue-500 bg-blue-500 text-gray-50 rounded-md hover:bg-transparent transition duration-500 hover:translate-y-1 focus:outline-none border-3 border-blue-500">
          Register
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
};

export default Register;
