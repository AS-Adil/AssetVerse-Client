import { createBrowserRouter } from "react-router";
import Resgister from "../pages/Auth/register/Resgister";
import MainLyout from "../layouts/main-layouts/MainLyout";
import Home from "../pages/home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLyout,
    children:[
      {
        index:true,
        Component: Home
      },

    ]
  },
]);