import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../component/loading/Loading";
import { Search, Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";

const AssetList = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [searchText, setSearchText] = useState("");
  const [editingAsset, setEditingAsset] = useState(null);
  const [editImage, setEditImage] = useState(null);

  const {
    data: assets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["assets", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/assets?email=${user.email}&searchText=${searchText}`
      );
      return res.data;
    },
  });

  //   console.log("assets=============0", assets);

  const handleDelete = (asset) => {
    Swal.fire({
      title: `Delete ${asset.productName}`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/assets/${asset._id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: `${asset.productName} has been deleted`,
                icon: "success",
              });

              refetch();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  const handleUpdate = async (id) => {
    let imageUrl = editingAsset.productImage;

    if (editImage) {
      const formData = new FormData();
      formData.append("image", editImage);

      const imageApi = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host_key
      }`;

      const imgRes = await axios.post(imageApi, formData);
      imageUrl = imgRes.data.data.url;
    }

    const updatedInfo = {
        productName: editingAsset.productName,
      productType: editingAsset.productType,
      productQuantity: editingAsset.productQuantity,
      productImage: imageUrl,
    }
     axiosSecure.patch(`/assets/${id}`, updatedInfo)
     .then(res =>{
      if(res.data.modifiedCount ){
                 Swal.fire({
                title: "Updated!",
                icon: "success",
              });
              setEditingAsset(null);
              setEditImage(null);
              refetch();
      }
     })
     .catch(()=>{
               Swal.fire({
                title: "Failded to Update !",
                icon: "success",
              });

     })

    



    // Refetch asset list
  };

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

                  <td className="text-sm text-neutral">
                    {new Date(asset.dateAdded).toLocaleDateString("en-GB")}
                  </td>

       
                  <td>
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => setEditingAsset(asset)}
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
                        onClick={() => handleDelete(asset)}
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
                  <td
                    colSpan="7"
                    className="text-center text-xl text-secondary py-10 font-semibold"
                  >
                    No assets found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editingAsset && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4 text-secondary">
              Edit Asset
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(editingAsset._id);
              }}
              className="space-y-4"
            >
              <div>
                <label className="label">
                  <span className="label-text font-medium">Asset Name</span>
                </label>
                <input
                  type="text"
                  defaultValue={editingAsset.productName}
                  onChange={(e) =>
                    setEditingAsset({
                      ...editingAsset,
                      productName: e.target.value,
                    })
                  }
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Asset Type</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  defaultValue={editingAsset.productType}
                  onChange={(e) =>
                    setEditingAsset({
                      ...editingAsset,
                      productType: e.target.value,
                    })
                  }
                >
                  <option value="Returnable">Returnable</option>
                  <option value="Non-returnable">Non-returnable</option>
                </select>
              </div>

              {/* Image */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Asset Image (optional)
                  </span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered w-full"
                  onChange={(e) => setEditImage(e.target.files[0])}
                />
                <p className="text-xs text-neutral mt-1">
                  Upload only if you want to change the image
                </p>
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Total Quantity</span>
                </label>
                <input
                  type="number"
                  min={1}
                  defaultValue={editingAsset.productQuantity}
                  onChange={(e) =>
                    setEditingAsset({
                      ...editingAsset,
                      productQuantity: Number(e.target.value),
                    })
                  }
                  className="input input-bordered w-full"
                />
              </div>

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn btn-ghost bg-red-500 text-white "
                  onClick={() => setEditingAsset(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AssetList;
