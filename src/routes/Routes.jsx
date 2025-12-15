import { createBrowserRouter } from "react-router";
import MainLyout from "../layouts/main-layouts/MainLyout";
import Home from "../pages/home/Home";
import HrRegistration from "../pages/Registration/hr-registration/HrRegistration";
import EmployeeRegistration from "../pages/Registration/employee-registration/EmployeeRegistration";
import Login from "../pages/login/Login";
import DashboardLayout from "../layouts/main-layouts/dashboard-layout/DashboardLayout";
import App from "../App";

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
  {
    path:'dashboard',
    element:<DashboardLayout></DashboardLayout>,
    children:[
      {
        path:'app',
        Component:App
      }
    ]
  }
]);