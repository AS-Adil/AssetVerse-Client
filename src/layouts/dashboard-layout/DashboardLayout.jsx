import React, { useContext } from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
  Boxes,
  PlusSquare,
  ClipboardList,
  Users,
  UserCog,
  Briefcase,
  Users2,
  Send,
  User,
  Home,
  Package,
  BarChart3,
  FileText,
  Info,
} from "lucide-react";
import useRole from "../../hooks/useRole";
import { Toaster } from "react-hot-toast";
import ThemeToggle from "../../component/theme-toggle/ThemeToggle";
import { AuthContext } from "../../context/AuthContext/AuthContext";

const NavItem = ({ to, label, icon: Icon }) => (
  <Link
    to={to}
    className="
      flex items-center gap-3
      px-3 py-2 rounded-lg
      text-secondary font-medium
      hover:bg-base-200 hover:text-primary
      transition
    "
  >
    <Icon className="w-4 h-4 opacity-80" />
    <span>{label}</span>
  </Link>
);

const SidebarItem = ({ to, label, icon: Icon }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `
      flex items-center gap-3
      px-4 py-2 rounded-lg
      transition font-medium
      ${
        isActive
          ? "bg-primary/10 text-primary"
          : "text-secondary hover:bg-primary/7 hover:text-primary"
      }
      `
    }
  >
    <Icon className="w-5 h-5" />
    <span className="is-drawer-close:hidden">{label}</span>
  </NavLink>
);

const DashboardLayout = () => {
  const { role } = useRole();
  const { user } = useContext(AuthContext);

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-base-200  flex justify-between">
            <div className="flex items-center">
              <label
                htmlFor="my-drawer-4"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                {/* Sidebar toggle icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                  <path d="M9 4v16"></path>
                  <path d="M14 10l2 2l-2 2"></path>
                </svg>
              </label>
              <div className="px-4 font-semibold text-secondary">Dashboard</div>
            </div>

            <div className="flex items-center mr-2">
              <ThemeToggle></ThemeToggle>
              <div className="dropdown dropdown-end ">
                <div tabIndex={0} role="button" className="m-1">
                  <img
                    className="rounded-full w-9 h-9 cursor-pointer"
                    src={user?.photoURL}
                    alt=""
                  />
                </div>

                {/* ----------- drop down start------------------- */}

                <ul
                  tabIndex={-1}
                  className=" dropdown-content bg-base-100 rounded-xl w-72 p-4 shadow-lg border border-base-200 "
                >
                  {/* Profile */}
                  <div className="text-center mb-4">
                    <img
                      className="mx-auto w-14 h-14 rounded-full ring-2 ring-primary/30"
                      src={user?.photoURL}
                      alt=""
                    />
                    <p className="text-sm text-neutral mt-2">{user?.email}</p>
                    <h2 className="font-semibold text-secondary">
                      {user?.displayName}
                    </h2>

                    <span className="inline-block mt-1 text-xs font-semibold text-primary uppercase">
                      {role === "hr" ? "HR Manager" : "Employee"}
                    </span>
                  </div>

                  <div className="divider my-2"></div>

                  {/* Role based navigation */}
                  <div className="space-y-1">
                    <NavItem to="/" label="Home" icon={Home} />
                    <NavItem to="/about-us" label="About Us" icon={Info} />
                    <NavItem
                      to="/privacy"
                      label="Privacy Plicy"
                      icon={FileText}
                    />
                    {role === "hr" && (
                      <>
                        <NavItem
                          to="/dashboard/profile"
                          label="Profile"
                          icon={UserCog}
                        />
                      </>
                    )}

                    {role === "employee" && (
                      <>
                        <NavItem
                          to="/dashboard/profile"
                          label="Profile"
                          icon={User}
                        />
                      </>
                    )}
                  </div>
                </ul>

                {/* ----------- drop down start------------------- */}
              </div>
            </div>
          </nav>
          {/* Page content here */}
          {/* <div className="p-4">Page Content</div> */}
          <Outlet></Outlet>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          {/* <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64"> */}
          <div
            className="
  flex min-h-full flex-col
  bg-base-200

  shadow-sm
"
          >
            {/* Sidebar content here */}
            <ul className="menu w-full grow px-2 py-4 space-y-1">
              {/* Home */}
              <li>
                <SidebarItem to="/" label="Home" icon={Home} />
              </li>

              {/* List item */}

              {/* ================= HR MENU ================= */}
              {role === "hr" && (
                <>
                  <li>
                    <SidebarItem
                      to="/dashboard/asset-list"
                      label="Asset List"
                      icon={Boxes}
                    />
                  </li>

                  <li>
                    <SidebarItem
                      to="/dashboard/add-asset"
                      label="Add Asset"
                      icon={PlusSquare}
                    />
                  </li>

                  <li>
                    <SidebarItem
                      to="/dashboard/all-requests"
                      label="All Requests"
                      icon={ClipboardList}
                    />
                  </li>

                  <li>
                    <SidebarItem
                      to="/dashboard/my-employee-list"
                      label="My Employee List"
                      icon={Users}
                    />
                  </li>

                  <li>
                    <SidebarItem
                      to="/dashboard/analytics"
                      label="Analytics"
                      icon={BarChart3}
                    />
                  </li>
                  <li>
                    <SidebarItem
                      to="/dashboard/packages"
                      label="Upgrade Package"
                      icon={Package}
                    />
                  </li>

                  <li>
                    <SidebarItem
                      to="/dashboard/profile"
                      label="Profile"
                      icon={UserCog}
                    />
                  </li>
                </>
              )}

              {/* ================= EMPLOYEE MENU ================= */}
              {role === "employee" && (
                <>
                  <li>
                    <SidebarItem
                      to="/dashboard/my-assets"
                      label="My Assets"
                      icon={Briefcase}
                    />
                  </li>

                  <li>
                    <SidebarItem
                      to="/dashboard/my-team"
                      label="My Team"
                      icon={Users2}
                    />
                  </li>

                  <li>
                    <SidebarItem
                      to="/dashboard/request-asset"
                      label="Request Asset"
                      icon={Send}
                    />
                  </li>

                  <li>
                    <SidebarItem
                      to="/dashboard/profile"
                      label="Profile"
                      icon={User}
                    />
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
      <Toaster position="top-center-center" reverseOrder={false} />
    </div>
  );
};

export default DashboardLayout;
