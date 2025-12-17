import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import RequestCard from "../../../component/request-card/RequestCard";
import Loading from "../../../component/loading/Loading";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";

const RequestAsset = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [note, setNote] = useState("");
  const { user } = useAuth();

  const { data: assets = [], isLoading } = useQuery({
    queryKey: ["all-assets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/assets");
      return res.data;
    },
  });

  const handleRequestSubmit = async () => {
    if (!note.trim()) {
      return toast.error("Please add a note for the request.");
    }

    // Build request object
    const requestData = {
      assetId: selectedAsset._id,
      assetName: selectedAsset.productName,
      assetType: selectedAsset.productType,
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      hrEmail: selectedAsset.hrEmail,
      companyName: selectedAsset.companyName,
      note: note,
      requestDate: new Date(),
      requestStatus: "pending",
      approvalDate: null,
      processedBy: null,
    };

    try {
      const res = await axiosSecure.post("/requests", requestData);

      if (res.data.insertedId) {
        toast.success(`Request for "${selectedAsset.productName}" submitted!`);
        setNote("");
        setSelectedAsset(null);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-secondary">Request an Asset</h1>
        <p className="text-neutral mt-1">
          Choose an available asset and submit a request
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets
          .filter((asset) => asset.availableQuantity > 0)
          .map((asset) => (
            <RequestCard
              key={asset._id}
              asset={asset}
              onRequest={() => setSelectedAsset(asset)}
            />
          ))}
      </div>

      {selectedAsset && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-secondary">Request Asset</h3>

            <p className="text-sm font-semibold text-neutral mb-4">
              {selectedAsset.productName}
            </p>

            {/* Note */}
            <div className="mb-4">
              <label className="label">
                <span className="label-text mb-1 font-medium">Note</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Why do you need this asset?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            {/* Actions */}
            <div className="modal-action">
              <button className="btn btn-primary" onClick={handleRequestSubmit}>
                Submit Request
              </button>

              <button
                className="btn bg-red-500 text-white btn-ghost"
                onClick={() => {
                  setSelectedAsset(null);
                  setNote("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default RequestAsset;
