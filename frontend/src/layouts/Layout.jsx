import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "../components/commons/Header";
import Footer from "../components/commons/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="max-w-7xl mx-auto">
        <Outlet />
      </div>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Layout;
