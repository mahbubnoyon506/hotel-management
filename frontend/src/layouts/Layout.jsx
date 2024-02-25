import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "../components/commons/Header";
import Footer from "../components/commons/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Outlet />
      <Footer />
      <Toaster />
    </div>
  );
};

export default Layout;
