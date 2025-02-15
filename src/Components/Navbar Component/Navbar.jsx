import { useState, useContext } from "react";
import FreshLogo from "../../assets/freshcart-logo-cart-blue-final-fixed.svg";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { authContext } from "../../Context/AuthContextProvider";
import { cartContext } from "./../../Context/CartContextProvider";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { Token, setToken } = useContext(authContext);
  const { numOfCartItems } = useContext(cartContext);

  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/login");
  }

  return (
    <nav className="bg-stone-100 gap-60 shadow-md flex items-center md:justify-evenly sm:justify-between px-6 py-3 md:px-10 fixed top-0 w-full z-50">
      {Token ? (
        <div className="flex items-center gap-4">
          <Link to="/">
            <img className="w-32 md:w-44" src={FreshLogo} alt="Fresh Cart" />
          </Link>
          <ul className="hidden md:flex items-center gap-6 text-xl tracking-wider text-gray-600">
            {[
              { name: "Home", path: "/home" },
              { name: "Products", path: "/products" },
              { name: "Brands", path: "/brands" },
              { name: "Categories", path: "/categories" }
            ].map((item) => (
              <Link to={item.path} key={item.name}>
                <li
                  className={`active-button shadow-sm rounded-md p-2 pb-1
                    ${location.pathname === item.path ? "active" : ""}
                    `}>
                  {item.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      ) : (
        <Link to="/">
          <img className="w-32 md:w-44" src={FreshLogo} alt="Fresh Cart" />
        </Link>
      )}

      <div className="hidden md:flex items-center gap-5">
        <ul className="flex items-center gap-4 text-xl text-gray-700">
          {Token && (
            <Link to="/cart">
              <i
                onClick={() => {
                  setMenuOpen(false);
                }}
                className="relative fa-solid fa-cart-shopping hover:text-blue-600 shadow-md h-14 w-14 rounded-full pl-3 pt-4 pr-[1px] flex items-center justify-center transition-all duration-150">
                <div className="absolute top-3 left-0 text-sm font-light h-8 w-8 text-center bg-transparent rounded-full">
                  {numOfCartItems}
                </div>
              </i>
            </Link>
          )}
        </ul>

        <ul className="flex items-center gap-4 text-xl tracking-wider text-gray-600">
          {Token ? (
            <li>
              <span
                className="cursor-pointer shadow-sm rounded-md p-2"
                onClick={handleLogout}>
                Logout
              </span>
            </li>
          ) : (
            <>
              {[
                { name: "Register", path: "/register" },
                { name: "Login", path: "/login" }
              ].map((item) => (
                <Link to={item.path} key={item.name}>
                  <li
                    className={`active-button shadow-sm rounded-md p-2 ${
                      location.pathname === item.path ? "active" : ""
                    }`}>
                    {item.name}
                  </li>
                </Link>
              ))}
            </>
          )}
        </ul>
      </div>

      {/******************************* Hamburger Menu Button with  (Mobile) *****************************/}
      <div className="md:hidden flex items-center justify-between gap-5">
        {Token && (
          <Link to="/cart">
            <i
              onClick={() => {
                setMenuOpen(false);
              }}
              className="relative fa-solid fa-cart-shopping hover:text-blue-500 shadow-md h-14 w-14 rounded-full pl-3 pt-4 pr-[1px] flex items-center justify-center transition-all duration-150">
              <div className="absolute top-3 left-0 text-sm font-light h-8 w-8 text-center bg-transparent rounded-full">
                {numOfCartItems}
              </div>
            </i>
          </Link>
        )}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}>
          <i className="fa-solid fa-bars p-2 rounded-md shadow-md hover:text-blue-500 transition-all duration-500"></i>
        </button>
      </div>

      {/**************************************** Mobile Menu *****************************************/}
      <div
        className={`z-10 absolute top-[88px] right-0 w-1/2 bg-stone-100 shadow-md flex flex-col items-center gap-4 py-6 text-xl tracking-wider text-center transition-all duration-300 ${
          menuOpen ? "block" : "hidden"
        } md:hidden`}>
        {Token && (
          <>
            {[
              { name: "Home", path: "/home" },
              { name: "Products", path: "/products" },
              { name: "Brands", path: "/brands" },
              { name: "Categories", path: "/categories" }
            ].map((item) => (
              <Link
                to={item.path}
                key={item.name}
                onClick={() => {
                  setMenuOpen(false);
                }}
                className={`active-button shadow-sm rounded-md p-2 ${
                  location.pathname === item.path ? "active" : ""
                }`}>
                {item.name}
              </Link>
            ))}
          </>
        )}

        <div className="flex flex-col gap-4">
          {Token ? (
            <span
              onClick={handleLogout}
              className="cursor-pointer shadow-sm rounded-md p-2">
              Logout
            </span>
          ) : (
            <>
              {[
                { name: "Register", path: "/register" },
                { name: "Login", path: "/login" }
              ].map((item) => (
                <NavLink
                  to={item.path}
                  key={item.name}
                  onClick={() => {
                    setMenuOpen(false);
                  }}
                  className={`active-button shadow-sm rounded-md p-2 ${
                    location.pathname === item.path ? "active" : ""
                  }`}>
                  {item.name}
                </NavLink>
              ))}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
