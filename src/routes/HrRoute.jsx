import React from "react";

import Loading from "../component/loading/Loading";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const HrRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return (
    <Loading />
    );
  }

  if (role !== "hr") {
    return (
      <h1 className="text-3xl text-center text-secondary font-semibold">
        Forbidden Access
      </h1>
    );
  }

  return children;
};

export default HrRoute;

