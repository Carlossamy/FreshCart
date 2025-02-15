import { useState, useContext, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { authContext } from "../../Context/AuthContextProvider";
import { cartContext } from "../../Context/CartContextProvider";
import toast from "react-hot-toast";

const Login = () => {
  const { setToken } = useContext(authContext);
  const { getUsersCart } = useContext(cartContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  async function loginUser(user) {
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
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", user)
      .then((result) => {
        // console.log(result);
        localStorage.setItem("userToken", result.data.token);
        myRegisterFormik.resetForm();
        setIsClicked(false);
        setIsSuccess(result.data.message);
        setTimeout(() => setToken(result.data.token), 1000);
        setTimeout(() => navigate("/home"), 1000);
        getUsersCart(); //! When the user logged in all the data about thee cart will be invoked by this function, "getUsersCart()"!!
        //!If there's no any data in the cart once user is logged in, the message in the catch method will be displayed!!
      })
      .catch((error) => {
        // console.log(error.response.data.message);
        setErrorMessage(error.response.data.message);
        setIsClicked(false);
        setTimeout(() => setErrorMessage(null), 1000);
        myRegisterFormik.resetForm();
      });
  }

  const myRegisterFormik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },

    onSubmit: loginUser,

    // validate: (inputValues) => {
    //   const errors = {};
    //   const emailRegex = /^\w+@\w+\.\w{2,}$/;
    //   const passwordRegex =
    //     /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[\w!@#$%^&*]{6,20}$/;
    //   if (!emailRegex.test(inputValues.email)) {
    //     errors.email = "You must enter a valid email address!";
    //   }
    //   if (!passwordRegex.test(inputValues.password)) {
    //     errors.password =
    //       "Password must be 6-20 characters long and include at least one uppercase letter, one lowercase letter, and one number.";
    //   }
    //   return errors;
    // }

    validationSchema: yup.object().shape({
      email: yup.string().email("Invalid email").required("Email is Required"),
      password: yup
        .string()
        .required("Password is Required")
        .min(6, "Min characters is 6")
        .max(20, "Max characters is 20")
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[\w!@#$%^&*]{6,20}$/,
          "Invalid password"
        )
    })
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login successful! Welcome back.", {
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
      toast.error("Login failed! Please try again.", {
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
        className="max-w-2xl mx-auto mt-36 bg-transparent p-8 shadow-lg rounded-2xl md:w-full sm:w-3/4 mb-14">
        <h2 className="text-center p-1 text-2xl tracking-wider font-light text-gray-600 mb-6 border-b-4 border-blue-500 rounded-md shadow-md inline-block relative left-[50%] translate-x-[-50%]">
          Login Now
        </h2>

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
            <div className="text-red-500 text-md tracking-wider mt-1">
              {myRegisterFormik.errors.email}
            </div>
          ) : null}
        </div>

        <div className="relative w-full mb-5">
          <input
            value={myRegisterFormik.values.password}
            onChange={myRegisterFormik.handleChange}
            onBlur={myRegisterFormik.handleBlur}
            type="password"
            name="password"
            id="password"
            className="block w-full px-4 py-3 tracking-wider text-md text-sm text-gray-800 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="* Password"
            required
          />
          {myRegisterFormik.touched.password &&
          myRegisterFormik.errors.password ? (
            <div className="text-red-500 text-md tracking-wider mt-1">
              {myRegisterFormik.errors.password}
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          className="flex justify-center text-lg tracking-wider items-center gap-1 w-1/2 mx-auto py-3 hover:text-blue-500 bg-blue-500 text-gray-50 rounded-md hover:bg-transparent transition duration-300 hover:translate-y-1 focus:outline-none border-3 border-blue-500">
          Login
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

export default Login;
