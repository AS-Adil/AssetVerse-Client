import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../component/loading/Loading";
import LoadingButton from "../../../../component/loading-button/LoadingButton";

const HrProfilePage = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
    const [loadingbtn, setLoadingBtn] = useState(false);
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Fetch current HR info
  const {
    data: hrInfo,
    isLoading: hrLoading,
    refetch,
  } = useQuery({
    queryKey: ["hr-info", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    setLoadingBtn(true)
    try {
      let companyLogo = hrInfo.companyLogo;

      // update Company logo if new file uploaded
      if (data.companyLogo?.length > 0) {
        const formData = new FormData();
        formData.append("image", data.companyLogo[0]);
        const image_Api_url = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;
        const res = await axios.post(image_Api_url, formData);
        companyLogo = res.data.data.url;
      }

      const updatedInfo = {
        companyName: data.companyName,
        companyLogo,
        dateOfBirth: data.dateOfBirth,
      };

      await axiosSecure.patch(`/update-hr-profile/${user.email}`, updatedInfo);
      //profile update on firebase
      const userProfile = {
        displayName: data.companyName,
        photoURL: companyLogo,
      };
      await updateUserProfile(userProfile);

      toast.success("HR Profile updated successfully!");
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update HR profile");
    }
    finally{
      setLoadingBtn(false)
    }
  };

  if (hrLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-base-100 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-base-200 rounded-xl shadow p-8 space-y-8">
        <h1 className="text-3xl font-semibold text-center text-secondary">
          HR Profile
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Company Logo */}
          <div className="flex justify-center">
            <img
              src={hrInfo.companyLogo}
              alt={hrInfo.companyName}
              className="w-28 h-28 rounded-full object-cover"
            />
          </div>

          {/* Company Name */}
          <div>
            <label className="label">Company Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              {...register("companyName", { required: true })}
              defaultValue={hrInfo.companyName}
            />
            {errors.companyName && (
              <p className="text-error text-sm mt-1">
                Company Name is required
              </p>
            )}
          </div>

          {/* Company Logo Upload */}
          <div>
            <label className="label">Change Company Logo</label>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              {...register("companyLogo")}
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="label">Date of Birth</label>
            <input
              type="date"
              className="input input-bordered w-full"
              {...register("dateOfBirth", { required: true })}
              defaultValue={hrInfo.dateOfBirth?.split("T")[0] || ""}
            />
            {errors.dateOfBirth && (
              <p className="text-error text-sm mt-1">
                Date of Birth is required
              </p>
            )}
          </div>

          {/* Read-only fields */}
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              className="input input-bordered w-full bg-base-300 cursor-not-allowed"
              value={hrInfo.email}
              readOnly
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="label">Subscription</label>
              <input
                type="text"
                className="input input-bordered w-full bg-base-300 cursor-not-allowed"
                value={hrInfo.subscription || "-"}
                readOnly
              />
            </div>
            <div>
              <label className="label">Package Limit</label>
              <input
                type="number"
                className="input input-bordered w-full bg-base-300 cursor-not-allowed"
                value={hrInfo.packageLimit || 0}
                readOnly
              />
            </div>
            <div>
              <label className="label">Current Employees</label>
              <input
                type="number"
                className="input input-bordered w-full bg-base-300 cursor-not-allowed"
                value={hrInfo.currentEmployees || 0}
                readOnly
              />
            </div>
          </div>

          <LoadingButton
            loading={loadingbtn}
            loadingText="Updating"
            text="Update Profile"
          />
        </form>
      </div>
    </div>
  );
};

export default HrProfilePage;
