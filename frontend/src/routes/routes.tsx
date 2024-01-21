import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import NotFound from "../components/commons/NotFound";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [{}],
  },
]);

export default routes;
