import React from "react";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../component/loading/Loading";

const PackagesPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: packages = [], isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/packages");
      return res.data;
    },
  });

  const { data: userInfo, isLoading: userLoading } = useQuery({
    queryKey: ["user-info", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
  });

  const { data: payments = [], isLoading: paymentLoading } = useQuery({
    queryKey: ["payment-history", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  // current package from user
  const currentPackage = userInfo?.subscription || "Basic";
  // console.log(currentPackage);

  const handlePayment = async (pkg) => {
    // console.log(pkg);

    const paymentInfo = {
      hrEmail: user?.email,
      packageName: pkg.name,
      employeeLimit: pkg.employeeLimit,
      amount: pkg.price,
    };
    console.log(paymentInfo);

    const res = await axiosSecure.post(
      "/payment-checkout-session",
      paymentInfo
    );
    window.location.assign(res.data.url);
  };

  if (isLoading || userLoading || paymentLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-base-100 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold text-secondary">
            Subscription Packages
          </h1>
          <p className="text-neutral text-sm">
            Choose a plan that grows with your company
          </p>
        </div>

        {/* Packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => {
            const isCurrent = pkg.name === currentPackage;

            return (
              <div
                key={pkg._id}
                className={`rounded-2xl bg-base-200 p-6 shadow-md flex flex-col text-center border
                  ${
                    isCurrent
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-base-300"
                  }`}
              >
                {/* Package Name */}
                <h2 className="text-xl font-semibold text-secondary">
                  {pkg.name}
                </h2>

                {/* Price */}
                <div className="my-4">
                  <span className="text-4xl font-bold text-primary">
                    ${pkg.price}
                  </span>
                  <span className="text-sm text-neutral">
                    {pkg.price === 0 ? " / forever" : " / month"}
                  </span>
                </div>

                {/* Employee limit */}
                <p className="text-sm text-neutral mb-4">
                  Up to{" "}
                  <span className="font-semibold text-secondary">
                    {pkg.employeeLimit}
                  </span>{" "}
                  employees
                </p>

                {/* Features */}
                <ul className="space-y-2 flex-1 text-left">
                  {pkg.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-sm text-neutral"
                    >
                      <CheckCircle className="w-4 h-4 text-success" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <button
                  disabled={isCurrent || pkg.price === 0}
                  onClick={() => handlePayment(pkg)}
                  className={`btn mt-6 w-full ${
                    pkg.price === 0 ? "bg-blue-400 text-white" : ""
                  }
    ${isCurrent ? "btn-disabled bg-base-300 text-neutral" : "btn-primary"}`}
                >
                  {isCurrent
                    ? "Current Plan"
                    : pkg.price === 0
                    ? "Free"
                    : "Purchase"}
                </button>
              </div>
            );
          })}
        </div>

        {/* Payment History */}
        <div className="bg-base-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-3xl font-semibold text-secondary mb-6">
            Payment History
          </h2>

          {payments.length === 0 ? (
            <p className="text-center text-sm text-neutral py-8">
              No payment records found.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {payments.map((pay) => {
                const statusConfig = {
                  completed: {
                    icon: <CheckCircle className="text-success w-5 h-5" />,
                    badge: "badge-success",
                    label: "Completed",
                  },
                  failed: {
                    icon: <XCircle className="text-error w-5 h-5" />,
                    badge: "badge-error",
                    label: "Failed",
                  },
                  pending: {
                    icon: <Clock className="text-warning w-5 h-5" />,
                    badge: "badge-warning",
                    label: "Pending",
                  },
                };

                const status = statusConfig[pay.status];

                return (
                  <div
                    key={pay._id}
                    className="bg-base-100 border border-base-300 rounded-xl p-5 shadow 
             hover:shadow-lg hover:-translate-y-0.5 transition-all"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold text-secondary">
                        {pay.packageName}
                      </h3>

                      <span
                        className={`badge ${status.badge} badge-outline flex items-center gap-1`}
                      >
                        {status.icon}
                        {status.label}
                      </span>
                    </div>

                    {/* Amount */}
                    {pay.status !== "failed" && (
                      <p className="text-2xl font-bold text-primary mb-2">
                        ${pay.amount}
                      </p>
                    )}

                    {/* Details */}
                    <div className="text-sm text-neutral space-y-1">
                      <p>
                        <span className="font-medium text-secondary">
                          Employee Limit:
                        </span>{" "}
                        {pay.employeeLimit}
                      </p>

                      {pay.status === "completed" && (
                        <p>
                          <span className="font-medium text-secondary">
                            Transaction ID:
                          </span>{" "}
                          <span className="truncate inline-block max-w-[180px] align-middle font-mono">
                            {pay.transactionId}
                          </span>
                        </p>
                      )}

                      <p>
                        <span className="font-medium text-secondary">
                          Date:
                        </span>{" "}
                        {new Date(pay.paymentDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PackagesPage;
