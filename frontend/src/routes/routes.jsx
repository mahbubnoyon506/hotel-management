import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import NotFound from "../components/commons/NotFound";
import Home from "../pages/home/Home";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import MyHotels from "../pages/my-hotels/MyHotels";
import ImageUpload from "../pages/image-upload/ImageUpload";
import PrivateRoute from "../components/PrivateRoute";
import AddHotel from "../pages/add-hotel/AddHotel";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/my-hotels",
        element: (
          // <PrivateRoute>
          <MyHotels />
          // </PrivateRoute>
        ),
      },
      {
        path: "/add-hotel",
        element: <AddHotel />,
      },
      {
        path: "/image-upload",
        element: <ImageUpload />,
      },
    ],
  },
]);

export default routes;
