import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();

  return (
    <footer className="bg-stone-100 tracking-wider shadow-md p-6 text-center">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-700 text-lg mt-4 md:mt-0">
          &copy; {new Date().getFullYear()} FreshCart. All rights reserved.
        </p>

        <ul className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-gray-600 text-lg mt-4 md:mt-0">
          {[
            { name: "Contact Us", path: "/contact" },
            { name: "Privacy Policy", path: "/privacy" },
            { name: "Terms of Service", path: "/terms" }
          ].map((item) => (
            <Link to={item.path} key={item.name}>
              <li
                className={`active-button shadow-sm rounded-md p-2 pb-1 ${
                  location.pathname === item.path ? "active" : ""
                }`}>
                {item.name}
              </li>
            </Link>
          ))}
        </ul>

        <ul className="flex items-center gap-4 mt-4 md:mt-0">
          <li>
            <Link to="https://facebook.com/" target="_blank">
              <i className="fa-brands fa-facebook-f text-xl text-gray-700 hover:text-blue-600 border h-10 w-10 rounded-full flex items-center justify-center transition-all duration-150"></i>
            </Link>
          </li>
          <li>
            <Link to="https://instagram.com/" target="_blank">
              <i className="fa-brands fa-instagram text-xl text-gray-700 hover:text-blue-600 border h-10 w-10 rounded-full flex items-center justify-center transition-all duration-150"></i>
            </Link>
          </li>
          <li>
            <Link to="https://x.com/" target="_blank">
              <i className="fa-brands fa-twitter text-xl text-gray-700 hover:text-blue-600 border h-10 w-10 rounded-full flex items-center justify-center transition-all duration-150"></i>
            </Link>
          </li>
          <li>
            <Link to="https://youtube.com/" target="_blank">
              <i className="fa-brands fa-youtube text-xl text-gray-700 hover:text-blue-600 border h-10 w-10 rounded-full flex items-center justify-center transition-all duration-150"></i>
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
