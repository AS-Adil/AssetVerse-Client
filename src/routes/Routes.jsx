import { createBrowserRouter } from "react-router";
import MainLyout from "../layouts/main-layouts/MainLyout";
import Home from "../pages/home/Home";
import HrRegistration from "../pages/Registration/hr-registration/HrRegistration";
import EmployeeRegistration from "../pages/Registration/employee-registration/EmployeeRegistration";
import Login from "../pages/login/Login";
import DashboardLayout from "../layouts/dashboard-layout/DashboardLayout";
import App from "../App";
import Error404 from "../pages/erro-page/Error404";
import DashboardHome from "../pages/dashboard/dashboard-home/DashboardHome";
import HrRoute from "./HrRoute";
import AddAssets from "../pages/dashboard/add-assets/AddAssets";
import PrivateRoute from "./PrivateRoute";
import AssetList from "../pages/dashboard/asset-list/AssetList";
import EmployeeRoute from "./EmployeeRoute";
import RequestAsset from "../pages/dashboard/request-asset/RequestAsset";
import AllRequests from "../pages/dashboard/all-requests/AllRequests";
import MyEmployeeList from "../pages/dashboard/my-employee-list/MyEmployeeList";
import MyAsset from "../pages/dashboard/my-asset/MyAsset";

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
      },
      {
        path: "*",
        Component: Error404
      }

    ]
  },
  {
    path:'dashboard',
    element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children:[
      {
        index:true,
        Component:DashboardHome
      },
      {
        path:'add-asset',
        element:<HrRoute><AddAssets></AddAssets></HrRoute>
      },
      {
        path:'asset-list',
        element:<HrRoute><AssetList></AssetList></HrRoute>
      },
      {
        path: "*",
        Component: Error404
      },
      {
        path: 'request-asset',
        element:<EmployeeRoute><RequestAsset></RequestAsset></EmployeeRoute>
      },
      {
        path:'all-requests',
        element:<HrRoute><AllRequests></AllRequests></HrRoute>
      },
      {
        path:'my-employee-list',
        element:<HrRoute><MyEmployeeList></MyEmployeeList></HrRoute>
      },
      {
        path:'my-assets',
        element:<EmployeeRoute><MyAsset></MyAsset></EmployeeRoute>
      }
    ]
  }

]);