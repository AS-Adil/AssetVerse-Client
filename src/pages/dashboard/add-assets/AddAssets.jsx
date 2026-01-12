import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../component/loading/Loading";
import { useNavigate } from "react-router";

const AddAssets = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate()
  const [adding, setAdding] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: userInfo = {}, isLoading } = useQuery({
    queryKey: ["userInfo", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      return res.data;
    },
  });

  const handleAddAsset = async (data) => {
    try {
      setAdding(true);

      const formData = new FormData();
      formData.append("image", data.productImage[0]);

      const imageApi = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host_key
      }`;

      const imgRes = await axios.post(imageApi, formData);
      const imageUrl = imgRes.data.data.url;

      const assetData = {
        productName: data.productName,
        productImage: imageUrl,
        productType: data.productType,
        productQuantity: Number(data.productQuantity),
        availableQuantity: Number(data.productQuantity),
        dateAdded: new Date(),
        hrEmail: user?.email,
        companyName: userInfo?.companyName,
      };

      const res = await axiosSecure.post("/assets", assetData);

      if (res.data.insertedId) {
        toast.success("Asset added successfully");
        navigate('/dashboard/asset-list')
        reset();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add asset");
    } finally {
      setAdding(false);
    }
  };

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="card bg-base-100 border border-base-200 shadow-lg mt-5">
        <div className="card-body bg-base-200 ">
          <h2 className="text-2xl font-bold text-secondary">Add New Asset</h2>
          <p className="text-neutral mb-6">
            Register company assets for tracking and assignment
          </p>

          <form onSubmit={handleSubmit(handleAddAsset)} className="space-y-4">
            {/* Product Name */}
            <div>
              <label className="label font-medium">Product Name</label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="e.g. MacBook Pro"
                {...register("productName", { required: true })}
              />
              {errors.productName && (
                <p className="text-error text-sm mt-1">
                  Product name is required
                </p>
              )}
            </div>

            {/* Product Image */}
            <div>
              <label className="label font-medium">Product Image</label>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                {...register("productImage", { required: true })}
              />
              {errors.productImage && (
                <p className="text-error text-sm mt-1">
                  Product image is required
                </p>
              )}
            </div>

            {/* Product Type */}
            <div>
              <label className="label font-medium">Product Type</label>
              <select
                className="select select-bordered w-full"
                {...register("productType", { required: true })}
              >
                <option value="">Select type</option>
                <option value="Returnable">Returnable</option>
                <option value="Non-returnable">Non-returnable</option>
              </select>
              {errors.productType && (
                <p className="text-error text-sm mt-1">
                  Product type is required
                </p>
              )}
            </div>

            {/* Quantity */}
            <div>
              <label className="label font-medium">Total Quantity</label>
              <input
                type="number"
                min={1}
                className="input input-bordered w-full"
                placeholder="e.g. 10"
                {...register("productQuantity", { required: true, min: 1 })}
              />
              {errors.productQuantity && (
                <p className="text-error text-sm mt-1">
                  Quantity must be at least 1
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="pt-4">
              {adding ? (
                <button
                  type="submit"
                  className="btn btn-primary font-semibold w-full"
                >
                  Adding
                  <span className="loading loading-spinner loading-xs"></span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-primary font-semibold w-full"
                >
                  Add Asset
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAssets;
