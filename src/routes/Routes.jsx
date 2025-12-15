import { createBrowserRouter } from "react-router";
import MainLyout from "../layouts/main-layouts/MainLyout";
import Home from "../pages/home/Home";
import HrRegistration from "../pages/Registration/hr-registration/HrRegistration";
import EmployeeRegistration from "../pages/Registration/employee-registration/EmployeeRegistration";
import Login from "../pages/login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLyout,
    children:[
      {
        index:true,
        Component: Home
      },
      {
        path:'hr-registration',
        Component: HrRegistration
      },
      {
        path:'employee-registration',
        Component:EmployeeRegistration
      },
      {
        path:'login',
        Component:Login
      }

    ]
  },
]);