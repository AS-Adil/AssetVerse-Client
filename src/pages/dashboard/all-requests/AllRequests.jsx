import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../component/loading/Loading";
import {
  Check,
  X,
  Clock,
  CheckCircle,
  XCircle,
  AwardIcon,
  CheckCheck,
  CircleX,
} from "lucide-react";
import Swal from "sweetalert2";

const AllRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-requests", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/requests?email=${user.email}`);
      return res.data;
    },
  });

  // const {
  //   data: userInfo,
  //   isLoading: userLoading,
  //   refetch: userRefetch,
  // } = useQuery({
  //   queryKey: ["user-info", user?.email],
  //   enabled: !!user?.email,
  //   queryFn: async () => {
  //     const res = await axiosSecure.get(`/users?email=${user.email}`);
  //     return res.data;
  //   },
  // });

  if (isLoading) return <Loading />;

  const handleApprove = (request) => {
    Swal.fire({
      title: "Approve Request ?",
      text: `Do you want ot set ${request.requesterName} as Approved`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Set",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/requests/${request._id}/approve`, {
            hrEmail: user.email,
          });

          Swal.fire({
            title: `${request.requesterName} set to Approved`,
            // text: "Your file has been deleted.",
            icon: "success",
          });

          refetch();
        } catch (error) {
          console.log(error);
          Swal.fire(
            "Error",
            `${error?.response?.data?.message || "Failed to approve request"}`,
            "error"
          );
        }
      }
    });
  };

  const handleReject = (request) => {
    Swal.fire({
      title: "Reject Request?",
      text: `Do you want ot set ${request.requesterName} as Rejected`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#64748B",
      confirmButtonText: "Reject",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/requests/${request._id}/reject`);

          Swal.fire({
            title: `${request.requesterName} set to Rejected`,
            // text: "Your file has been deleted.",
            icon: "success",
          });

          refetch();
        } catch (error) {
          console.error(error);
          Swal.fire("Error", "Failed to reject request", "error");
        }
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center">
        <h1 className="text-3xl font-bold text-secondary">
          All Asset Requests
        </h1>
        <p className="text-neutral mt-1 md:mt-0">
          Review and manage employee asset requests
        </p>
      </div>

      {/* Table */}
      <div className="card bg-base-100 border border-base-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200 text-secondary">
              <tr className="text-center">
                <th>No</th>
                <th>Employee</th>
                <th>Asset</th>
                <th>Request Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {requests.length > 0 ? (
                requests.map((req, index) => (
                  <tr key={req._id} className="text-center">
                    <td>{index + 1}</td>
                    <td className="whitespace-nowrap">{req.requesterName}</td>
                    <td className="whitespace-nowrap">{req.assetName}</td>
                    <td className="whitespace-nowrap">{new Date(req.requestDate).toLocaleDateString()}</td>

                    <td>
                      <span
                        className={`
      inline-flex items-center gap-1.5
      rounded-full
      px-3 py-1.5
      text-sm font-medium
      border
      ${
        req.requestStatus === "pending"
          ? "bg-info/10 text-info border-info"
          : req.requestStatus === "approved"
          ? "bg-success/10 text-success border-success"
          : "bg-error/10 text-error border-error"
      }
    `}
                      >
                        {req.requestStatus === "pending" && <Clock size={14} />}
                        {req.requestStatus === "approved" && (
                          <CheckCircle size={14} />
                        )}
                        {req.requestStatus === "rejected" && (
                          <XCircle size={14} />
                        )}

                        {req.requestStatus.charAt(0).toUpperCase() +
                          req.requestStatus.slice(1)}
                      </span>
                    </td>

                    <td>
                      <div className="flex justify-center gap-2">
                        {req.requestStatus === "pending" && (
                          <>
                            <button
                              className="btn btn-xs btn-success flex items-center gap-1 font-bold text-gray-100 text-center py-3.5 hover:scale-105 transition-all duration-200"
                              onClick={() => handleApprove(req)}
                              title="Approve Request"
                            >
                              <Check size={16} /> Approve
                            </button>

                            <button
                              className="btn btn-xs btn-error flex items-center gap-1 font-bold text-gray-100 text-center py-3.5 px-4 hover:scale-105 transition-all duration-200"
                              onClick={() => handleReject(req)}
                              title="Reject Request"
                            >
                              <X size={16} /> Reject
                            </button>
                          </>
                        )}

                        {req.requestStatus === "approved" && (
                          <button
                            className="btn btn-xs flex items-center gap-1 font-bold text-gray-100 text-center py-3.5 bg-green-700 cursor-default"
                            title="Request Approved"
                            disabled
                          >
                            <CheckCheck size={16} /> Approved
                          </button>
                        )}

                        {req.requestStatus === "rejected" && (
                          <button
                            className="btn btn-xs flex items-center gap-1 font-bold text-gray-100 text-center py-3.5 bg-red-600 cursor-default"
                            title="Request Rejected"
                            disabled
                          >
                            <CircleX size={16} /> Rejected
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center text-neutral font-semibold py-6"
                  >
                    No requests found
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

export default AllRequests;
