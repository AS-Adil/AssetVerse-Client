import React from "react";
import { Link } from "react-router";

const Error404 = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-secondary mb-4">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold text-neutral mb-2">
          Page Not Found
        </h2>
        <p className="text-neutral mb-6">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="inline-block btn btn-primary text-white px-6 py-3  hover:shadow-lg transition"
        >
          Go Back Home
        </Link>


      </div>
    </div>
  );
};

export default Error404;
