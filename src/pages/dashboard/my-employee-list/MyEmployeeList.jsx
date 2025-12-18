import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../component/loading/Loading";
import { CircleX, Trash, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

const MyEmployeeList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: employees =[],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-employees", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/employees?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

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
        } catch (err) {
          console.log(err);
          Swal.fire("Error", "Failed to remove employee", "error");
        }
      }
    });
  };

  // console.log(employees);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-secondary">My Employees</h1>
          <p className="text-neutral mt-1">
            Employees affiliated with your company
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
                          <p className="font-semibold text-secondary">
                            {emp.employeeName}
                          </p>
                          <p className="text-xs text-neutral">
                            {emp.companyName}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="text-neutral">{emp.employeeEmail}</td>

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
    </div>
  );
};

export default MyEmployeeList;
