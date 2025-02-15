import { Outlet } from "react-router-dom";
import Footer from "../Footer Component/Footer";
import Navbar from "../Navbar Component/Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
