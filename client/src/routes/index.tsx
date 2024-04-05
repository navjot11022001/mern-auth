import React from "react";
import PATH_CONTANTS from "./pathContants";
import ProtectedRoutes from "../components/ProtectedRoutes";

const Home = React.lazy(() => import("../pages/Home"));
const About = React.lazy(() => import("../pages/About"));
const Signin = React.lazy(() => import("../pages/SignIn"));
const Signup = React.lazy(() => import("../pages/Signup"));
const Profile = React.lazy(() => import("../pages/Profile"));

export const routes = [
  {
    path: PATH_CONTANTS.HOME,
    element: <Home />,
  },
  {
    path: PATH_CONTANTS.SIGNIN,
    element: <Signin />,
  },
  {
    path: PATH_CONTANTS.SIGNUP,
    element: <Signup />,
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: PATH_CONTANTS.ABOUT,
        element: <About />,
      },
      {
        path: PATH_CONTANTS.PROFILE,
        element: <Profile />,
      },
    ],
  },
];

export default routes;
