import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../component/loading/Loading";


const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const sessionId = searchParams.get("session_id");

  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) return;

    axiosSecure
      .patch(`/payment-success?session_id=${sessionId}`)
      .then((res) => {
        setPaymentInfo(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Payment verification failed", err);
        setLoading(false);
      });
  }, [sessionId, axiosSecure]);


         console.log( 'Payment info ',paymentInfo);


  if (loading) return <Loading />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="bg-base-200 rounded-xl shadow-md p-8 max-w-md w-full text-center space-y-4">
        <h1 className="text-3xl font-semibold text-success">
          Payment Successful 🎉
        </h1>

        <p className="text-sm text-neutral">
          Thank you for upgrading your subscription.
        </p>

        <div className="text-left space-y-2 mt-6">
          <p>
            <span className="font-medium text-secondary">Package:</span>{" "}
            {paymentInfo?.packageName}
          </p>

          <p>
            <span className="font-medium text-secondary">Employee Limit:</span>{" "}
            {paymentInfo?.employeeLimit}
          </p>

          <p>
            <span className="font-medium text-secondary">Amount Paid:</span> $
            {paymentInfo?.amount}
          </p>

          <p>
            <span className="font-medium text-secondary">
              Transaction ID:
            </span>{" "}
            <span className="break-all text-sm">
              {paymentInfo?.transactionId}
            </span>
          </p>

          <p>
            <span className="font-medium text-secondary">Status:</span>{" "}
            <span className="text-success capitalize">
              {paymentInfo?.status}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
