import React from "react";
import { XCircle } from "lucide-react";
import { Link } from "react-router";

const PaymentCancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="bg-base-200 rounded-xl shadow-md p-8 max-w-md w-full text-center space-y-4">
        
        {/* Icon */}
        <XCircle className="w-16 h-16 mx-auto text-error" />

        {/* Title */}
        <h1 className="text-3xl font-semibold text-error">
          Payment Failed
        </h1>

        {/* Message */}
        <p className="text-sm text-neutral">
          Your payment was not completed. No charges were made.
        </p>

        <p className="text-sm text-neutral">
          You can try again or choose a different subscription plan.
        </p>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <Link
            to="/dashboard/packages"
            className="btn btn-primary w-full"
          >
            Try Again
          </Link>


        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
