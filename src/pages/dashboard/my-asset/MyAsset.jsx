import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyAssets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  const { data: assets = [], isLoading } = useQuery({
    queryKey: ["my-assets", user?.email, search, type],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-asset?email=${user.email}&search=${search}&type=${type}` );
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="card bg-base-100 shadow-md border border-base-200">
        <div className="card-body">
          <h2 className="text-4xl font-bold text-secondary text-center mb-6">
            My Assets
          </h2>

          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <input
              type="text"
              placeholder="Search by asset name"
              className="input input-bordered w-full md:w-1/3"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />

            <select
              className="select select-bordered w-full md:w-1/5"
              value={type}
              onChange={(e) => setType(e.target.value)}
              title="Filter With Asset Type"

              
            >
              <option value="">All Types</option>
              <option value="Returnable">Returnable</option>
              <option value="Non-returnable">Non-returnable</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead className="bg-base-200">
                <tr>
                  <th className="text-center">Image</th>
                  <th className="text-center">Asset Name</th>
                  <th className="text-center">Type</th>
                  <th className="text-center">Company</th>
                  <th className="text-center">Assigned Date</th>
                  <th className="text-center">Status</th>
                </tr>
              </thead>

              <tbody>
                {assets.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center py-6 text-gray-400">
                      No assets found
                    </td>
                  </tr>
                )}

                {assets.map((asset) => (
                  <tr key={asset._id}>
                    <td className="text-center">
                      <img
                        src={asset.assetImage}
                        alt={asset.assetName}
                        className="w-12 h-12 mx-auto rounded object-cover"
                      />
                    </td>

                    <td className="text-center font-medium whitespace-nowrap">
                      {asset.assetName}
                    </td>

                    <td className="text-center">
                      <span
                        className={`badge badge-outline whitespace-nowrap ${
                          asset.assetType === "Returnable"
                            ? "badge-info"
                            : "badge-warning"
                        }`}
                      >
                        {asset.assetType}
                      </span>
                    </td>

                    <td className="text-center whitespace-nowrap">{asset.companyName}</td>

                    <td className="text-center whitespace-nowrap">
                      {new Date(asset.assignmentDate).toLocaleDateString()}
                    </td>

                    <td className="text-center">
                      <span
                        className={`badge whitespace-nowrap ${
                          asset.status === "assigned"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {asset.status}
                      </span>
                    </td>


                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAssets;
