//! import { Provider } from "react-redux";

import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "./Context/AuthContextProvider";
import CartContextProvider from "./Context/CartContextProvider";
import Layout from "./Components/Layout Component/Layout";
import NotFound from "./Components/NotFound Component/NotFound";
import Login from "./Components/Login Component/Login";
import Register from "./Components/Register Component/Register";
import Home from "./Components/Home Component/Home";
import Brands from "./Components/Brands Component/Brands";
import Categories from "./Components/Categories Component/Categories";
import ProtectedRoute from "./Components/Protected Route Component/ProtectedRoute";
import Products from "./Components/Products Component/Products";
import ProductDetails from "./Components/Product Details Component/ProductDetails";
import ContactUs from "./Components/Contact Us Component/Contact_Us";
import PrivacyPolicy from "./Components/Privacy Component/PrivacyPolicy";
import Cart from "./Components/Cart Component/Cart";
import PaymentComponent from "./Components/Payment Ways Component/Cash Component/Payment Methods";
import TermsOfService from "./Components/Terms Of Services Componet/TermsOfServices";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        )
      },
      {
        path: "/home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        )
      },
      {
        path: "/brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        )
      },
      {
        path: "/categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        )
      },
      {
        path: "/products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        )
      },
      {
        path: "/contact",
        element: (
          <ProtectedRoute>
            <ContactUs />
          </ProtectedRoute>
        )
      },
      //* In React Router DOM, there is Colon (:) that allows to any word after the colon it refers to Parameter, that means Variables,
      //* and I can Select that Param in the Product Details Component by useParams Hook!
      {
        path: "/productDetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        )
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        )
      },
      {
        path: "/payment",
        element: (
          <ProtectedRoute>
            <PaymentComponent />
          </ProtectedRoute>
        )
      },
      {
        path: "/privacy",
        element: (
          <ProtectedRoute>
            <PrivacyPolicy />
          </ProtectedRoute>
        )
      },
      {
        path: "/terms",
        element: (
          <ProtectedRoute>
            <TermsOfService />
          </ProtectedRoute>
        )
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
]);

const reactQueryConfig = new QueryClient();

function App() {
  return (
    <>
      <AuthContextProvider>
        <QueryClientProvider client={reactQueryConfig}>
          <CartContextProvider>
            {/* //!  <Provider store={reduxStore}> */}
            <RouterProvider router={router} />
            <Toaster />
            {/*//! </Provider> */}
          </CartContextProvider>
        </QueryClientProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
