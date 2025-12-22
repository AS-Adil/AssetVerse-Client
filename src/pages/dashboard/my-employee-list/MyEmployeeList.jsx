import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../component/loading/Loading";
import { CircleX, Trash, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

const MyEmployeeList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);

  const {
    data: employees = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-employees", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/employees?email=${user.email}`);
      return res.data;
    },
  });

  const {
    data: userInfo,
    isLoading: userLoading,
    refetch: userRefetch,
  } = useQuery({
    queryKey: ["user-info", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
  });

  const { data: assetsData = {}, isLoading: assetLoading } = useQuery({
    queryKey: ["my-assets", user.email],
    enabled: showAssignModal,
    queryFn: async () => {
      const res = await axiosSecure.get(`/assets-all?email=${user.email}`);
      return res.data;
    },
  });

  const handleRmove = (emp) => {
    Swal.fire({
      title: `Remove ${emp.employeeName} From Team ? `,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Remove",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/employees/${emp.employeeEmail}/remove`, {
            hrEmail: user.email,
          });

          Swal.fire({
            title: "Removed",
            text: `${emp.employeeName} Removed From Team`,
            icon: "success",
          });
          refetch();
          userRefetch();
        } catch (err) {
          // console.log(err);
          Swal.fire("Error", "Failed to remove employee", "error");
        }
      }
    });
  };

  const handleAssignDirect = async (asset, employee) => {
    // console.log("asset------------------", asset);
    // console.log("employee------------------", employee);

    try {
      await axiosSecure.post("/assign-directly", {
        assetId: asset._id,
        employeeEmail: employee.employeeEmail,
        employeeName: employee.employeeName,
        hrEmail: user.email,
        companyName: employee.companyName,
      });

      Swal.fire("Success", "Asset assigned successfully", "success");

      setShowAssignModal(false);
      setSelectedEmployee(null);
      refetch(); // employee list
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to assign asset", "error");
    }
  };

  if (isLoading || userLoading) return <Loading />;

  // console.log(employees);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-secondary">My Employees</h1>
          <p className="text-sm text-neutral">
            Employee count:{" "}
            <span className="font-semibold text-secondary">
              {userInfo.currentEmployees}/{userInfo.packageLimit}
            </span>{" "}
            employees used
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="card bg-base-100 border border-base-200 shadow-sm rounded-xl">
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* Head */}
            <thead className="bg-base-200 text-secondary">
              <tr className="text-center">
                <th>Photo</th>
                <th>Employee</th>
                <th>Email</th>
                <th>Join Date</th>
                <th>Assets</th>
                <th>Assign Asset</th>
                <th>Action</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {employees.length > 0 ? (
                employees.map((emp) => (
                  <tr
                    key={emp._id}
                    className="text-center hover:bg-base-200/40 transition-all"
                  >
                    {/* Employee */}
                    <td>
                      <div className="avatar flex items-center justify-center gap-2">
                        <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                          <img src={emp.profileImage} alt={emp.employeeName} />
                        </div>
                      </div>
                    </td>
                    <td className="flex items-center justify-center gap-3">
                      <div>
                        <div className="text-left">
                          <p className="font-semibold whitespace-nowrap text-secondary">
                            {emp.employeeName}
                          </p>
                          <p className="text-xs text-neutral whitespace-nowrap">
                            {emp.companyName}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="text-neutral whitespace-nowrap">{emp.employeeEmail}</td>

                    {/* Join Date */}
                    <td className="text-neutral">
                      {new Date(emp.affiliationDate).toLocaleDateString()}
                    </td>

                    {/* Assets Count */}
                    <td>
                      <span className="badge badge-info badge-outline px-3">
                        {emp.assetCount}
                      </span>
                    </td>

                    <td>
                      <button
                        className="btn btn-xs btn-primary text-white hover:scale-105 transition-all"
                        onClick={() => {
                          setSelectedEmployee(emp);
                          setShowAssignModal(true);
                        }}
                      >
                        Assign Asset
                      </button>
                    </td>

                    {/* Action */}
                    <td>
                      <button
                        title="Remove This Employee From Team"
                        className="
                        btn btn-xs btn-error text-white
                        hover:scale-105 transition-all
                      "
                        onClick={() => handleRmove(emp)}
                      >
                        <CircleX size={14} />
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center text-neutral font-medium py-6"
                  >
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* -----------------------modal start-------------------- */}
      {showAssignModal && selectedEmployee && (
        <dialog open className="modal modal-middle">
          <div className="modal-box max-w-5xl bg-base-100">
            {/* ---------- Header ---------- */}
            <div className="flex flex-col items-center text-center gap-2 mb-6">
              <div className="avatar">
                <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={selectedEmployee.profileImage}
                    alt={selectedEmployee.employeeName}
                  />
                </div>
              </div>

              <h3 className="text-xl font-bold text-secondary">Assign Asset</h3>

              <p className="text-sm text-neutral">
                to{" "}
                <span className="font-semibold">
                  {selectedEmployee.employeeName}
                </span>
              </p>
            </div>

            {/* ---------- Body ---------- */}
            {assetLoading ? (
              <Loading />
            ) : (
              <div className="overflow-x-auto">
                <table className="table w-full text-center">
                  <thead className="bg-base-200 text-secondary">
                    <tr>
                      <th className="text-center">Image</th>
                      <th className="text-center">Asset</th>
                      <th className="text-center">Type</th>
                      <th className="text-center">Available</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {assetsData
                      .filter((a) => a.availableQuantity > 0)
                      .map((asset) => (
                        <tr
                          key={asset._id}
                          className="hover:bg-base-200/50 transition"
                        >
                          {/* Asset info */}

                          <td>
                            {" "}
                            <div className="avatar">
                              <div className="w-10 rounded-lg bg-base-200">
                                <img
                                  src={asset.productImage}
                                  alt={asset.productName}
                                  className="object-cover"
                                />
                              </div>
                            </div>
                          </td>

                          <td>
                            <div className="flex items-center justify-center gap-3">
                              <p className="font-medium text-secondary whitespace-nowrap">
                                {asset.productName}
                              </p>
                            </div>
                          </td>

                          {/* Type */}
                          <td>
                            <span
                              className={`badge badge-outline whitespace-nowrap px-3
                          ${
                            asset.productType === "Returnable"
                              ? "badge-info"
                              : "badge-warning"
                          }
                        `}
                            >
                              {asset.productType}
                            </span>
                          </td>

                          {/* Available */}
                          <td>
                            <span className="badge badge-success px-3">
                              {asset.availableQuantity}
                            </span>
                          </td>

                          {/* Action */}
                          <td>
                            <button
                              className="btn btn-xs btn-primary hover:scale-105 transition"
                              onClick={() =>
                                handleAssignDirect(asset, selectedEmployee)
                              }
                            >
                              Assign
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* ---------- Footer ---------- */}
            <div className="modal-action justify-center">
              <button
                className="btn btn-ghost bg-red-500 text-white"
                onClick={() => {
                  setShowAssignModal(false);
                  setSelectedEmployee(null);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* -----------------------modal end-------------------- */}
    </div>
  );
};

export default MyEmployeeList;
