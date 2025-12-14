import { Link, NavLink, useLocation } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { ChevronDown } from "lucide-react";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  // console.log(user?.photoURL);

  const location = useLocation();
  // console.log('route is',location.pathname);

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
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="m-1">
              <img
                className="rounded-full w-9 h-9"
                src={user?.photoURL}
                alt=""
              />
            </div>

            <ul
              tabIndex="-1"
              className="dropdown-content menu bg-base-200 rounded-box z-1 w-[280px] p-2 shadow-sm "
            >
              <img
                className="mx-auto shadow rounded-full w-15 h-15"
                src={user?.photoURL}
                alt=""
              />

              <p className="text-xs text-center mt-1 font-thin text-base-content">
                {user?.email}
              </p>
              <h1 className="text-lg text-base-content font-semibold text-center ">
                {user?.displayName}
              </h1>

              <div className=" mx-auto mt-2 rounded-xl  p-2 flex">
                <Link
                  className={`text-base-content border border-gray-300 shadow-xl rounded-l-xl py-1.5 px-2  hover:scale-102 transition duration-150 ${
                    location.pathname === "/model-purchase" &&
                    "bg-secondary text-white"
                  }`}
                  to={"/model-purchase"}
                >
                  Model Purchase
                </Link>

                <Link
                  className={`text-base-content border border-gray-300 shadow-xl border-l-0 rounded-r-xl px-3 py-1.5  hover:scale-102 transition duration-150 ${
                    location.pathname === "/my-models" &&
                    "bg-secondary text-white"
                  }`}
                  to={"/my-models"}
                >
                  My Models
                </Link>
              </div>

              <button
                onClick={handleLogout}
          //       className="bg-secondary shadow-xl mb-2 rounded-2xl cursor-pointer text-white font-semibold
          //       py-1.5 w-[80%] mt-4 mx-auto shadow
          //  hover:scale-102 transition duration-150"
          className="btn btn-primary w-2/3 mx-auto cursor-pointer"
           
              >
                Logout
              </button>
            </ul>
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
