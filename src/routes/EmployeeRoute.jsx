import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Loading from "../component/loading/Loading";

const EmployeeRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <Loading />;
  }

  if (role !== "employee") {
    return (
      <h1 className="text-3xl text-center text-secondary font-semibold">
        Forbidden Access
      </h1>
    );
  }

  return children;
};

export default EmployeeRoute;
