import React, { useEffect, useState } from "react";
import { XCircle } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../component/loading/Loading";

const PaymentCancel = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const paymentId = searchParams.get("paymentId"); // paymentId from Stripe metadata
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // to avoid updating state on unmounted component

    if (!paymentId) {
      setTimeout(() => {
        if (isMounted) {
          setLoading(false);
          setError("Payment ID not found.");
        }
      }, 0);
      return;
    }

    axiosSecure
      .patch("/payment-cancelled", { paymentId })
      .then(() => {
        if (isMounted) setLoading(false);
      })
      .catch(() => {
        if (isMounted) {
          setError("Failed to update payment status.");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [paymentId, axiosSecure]);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="bg-base-200 rounded-xl shadow-md p-8 max-w-md w-full text-center space-y-4">
        {/* Icon */}
        <XCircle className="w-16 h-16 mx-auto text-error" />

        {/* Title */}
        <h1 className="text-3xl font-semibold text-error">Payment Failed</h1>

        {/* Message */}
        <p className="text-sm text-neutral">
          {error
            ? error
            : "Your payment was not completed. No charges were made."}
        </p>

        <p className="text-sm text-neutral">
          You can try again or choose a different subscription plan.
        </p>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <Link to="/dashboard/packages" className="btn btn-primary w-full">
            Try Again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
