import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../component/loading/Loading";
import { Search, Pencil, Trash2 } from "lucide-react";

const AssetList = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [searchText, setSearchText] = useState("");

  const { data: assets = [], isLoading } = useQuery({
    queryKey: ["assets", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/assets?email=${user.email}&searchText=${searchText}`
      );
      return res.data;
    },
  });

  console.log("assets=============0", assets);

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Asset List</h1>
          <p className="text-sm text-neutral">
            Manage and track all company assets
          </p>
        </div>

        {/* Search */}
        <div className="w-full md:w-80">
          <label className="input input-bordered flex items-center gap-2 bg-base-100">
            <Search size={16} className="text-neutral" />
            <input
              type="search"
              placeholder="Search assets..."
              className="grow"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              autoFocus
            />
          </label>
        </div>
      </div>

      {/* Table */}
      <div className="card bg-base-100 border border-base-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="bg-base-200 text-secondary">
              <tr>
                <th className="text-center">No</th>
                <th className="text-center">Asset</th>
                <th className="text-center">Name</th>
                <th className="text-center">Type</th>
                <th className="text-center">Quantity</th>
                <th className="text-center">Date Added</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {assets.map((asset, index) => (
                <tr key={asset._id} className="text-center">
                  <td>{index + 1}</td>

                  <td>
                    <div className="flex justify-center">
                      <div className="avatar">
                        <div className="w-10 rounded-xl">
                          <img
                            src={asset.productImage}
                            alt={asset.productName}
                          />
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="font-medium">{asset.productName}</td>

                  <td>
                    <span
                      className={`badge badge-outline ${
                        asset.productType === "Returnable"
                          ? "badge-info"
                          : "badge-warning"
                      }`}
                    >
                      {asset.productType}
                    </span>
                  </td>

                  <td className="font-semibold">{asset.productQuantity}</td>

                  <td className="text-sm text-neutral">{asset.dateAdded}</td>

                  {/* Actions */}
                  <td>
                    <div className="flex justify-center gap-2">
                      <button
                        className="btn btn-xs  flex items-center gap-1
               transition-all bg-secondary text-white px-4 py-3.5 hover:scale-105 rounded-lg duration-200  "
                        title="Edit asset "
                      >
                        <Pencil
                          size={14}
                          className="transition-transform duration-200 group-hover:scale-105"
                        />
                        <span>Edit</span>
                      </button>

                      <button
                        className="btn btn-xs flex items-center gap-1 text-white px-3 py-3.5 hover:scale-105 rounded-lg bg-red-500 transition-all duration-200 "
                        title="Delete asset"
                      >
                        <Trash2
                          size={14}
                          className="transition-transform duration-200 group-hover:scale-105"
                        />
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {assets.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center text-xl text-secondary py-10 font-semibold">
                    No assets found
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

export default AssetList;
