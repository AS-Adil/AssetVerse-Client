import { Link, NavLink, useLocation } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { ChevronDown } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
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
  LogOut
} from "lucide-react";


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


const Navbar = () => {
  const { user, logOut } = useAuth();
  // console.log(user?.photoURL);
  const { role, roleLoading } = useRole();
  console.log('role from dropdown --------------,',role);

  const links = (
    <>
      <NavLink className="px-3 font-semibold" to={"/"}>
        Home
      </NavLink>
      <NavLink className="px-3 font-semibold" to={"/employee-registration"}>
        Join as Employee
      </NavLink>
      <NavLink className="px-3 font-semibold" to={"/hr-registration"}>
        Join as HR Manager
      </NavLink>
    </>
  );

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };





  return (
    // <div className="navbar bg-base-100 shadow-sm fixed top-0 w-full z-50">
    <div className="navbar bg-secondary text-white shadow-sm top-0 w-full z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow "
          >
            {links}
          </ul>
        </div>
        <Link
          to={"/"}
          className="  hover:scale-103 text-S transition  rounded-full text-2xl font-bold"
        >
          <h1 className="text-primary">
            Asset<span className="text-accent">Verse</span>
          </h1>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-3 text-lg">{links}</ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end ">
            <div tabIndex={0} role="button" className="m-1">
              <img
                className="rounded-full w-9 h-9"
                src={user?.photoURL}
                alt=""
              />
            </div>
            {/* ----------- drop down start------------------- */}

<ul
  tabIndex={-1}
  className="
    dropdown-content
    bg-base-100
    rounded-xl
    w-72
    p-4
    shadow-lg
    border border-base-200
  "
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

{role === "hr" && (
  <>
    <NavItem to="/dashboard/asset-list" label="Asset List" icon={Boxes} />
    <NavItem to="/dashboard/add-asset" label="Add Asset" icon={PlusSquare} />
    <NavItem to="/dashboard/all-requests" label="All Requests" icon={ClipboardList} />
    <NavItem to="/dashboard/employee-list" label="Employee List" icon={Users} />
    <NavItem to="/dashboard/profile" label="Profile" icon={UserCog} />
  </>
)}


{role === "employee" && (
  <>
    <NavItem to="/dashboard/my-asset" label="My Assets" icon={Briefcase} />
    <NavItem to="/dashboard/my-team" label="My Team" icon={Users2} />
    <NavItem to="/dashboard/request-asset" label="Request Asset" icon={Send} />
    <NavItem to="/dashboard/profile" label="Profile" icon={User} />
  </>
)}

  </div>

  <div className="divider my-3"></div>

  {/* Logout */}
<button
  onClick={handleLogout}
  className="btn btn-primary text-white font-semibold btn-sm w-full flex items-center gap-2 justify-center"
>
  <LogOut size={16} />
  Logout
</button>
</ul>


            {/* ----------- drop down start------------------- */}
          </div>
        ) : (
          <div>
            <div className="">
              <button className="btn btn-primary px-8 cursor-pointer">
                <Link to={"/login"} className="  ">
                  Login
                </Link>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
