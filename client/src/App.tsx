import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";
import Error from "./pages/Error";
import Layout from "./pages/Layout";

const App: React.FC<object> = () => {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <Error />,
      children: routes,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
