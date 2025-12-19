import React from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../component/loading/Loading";

const EmployeeProfilePage = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    
    formState: { errors },
  } = useForm();

  // Fetch current user info
  const { data: userInfo, isLoading: userLoading , refetch} = useQuery({
    queryKey: ["user-info", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    }
  });

  // Fetch affiliations
  const { data: affiliations = [], isLoading: affiliationsLoading } = useQuery({
    queryKey: ["my-companies", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-companies?email=${user.email}`);
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    try {
      let photoURL = userInfo.photoURL;

      if (data.photo?.length > 0) {
        const formData = new FormData();
        formData.append("image", data.photo[0]);
        const image_Api_url = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;
          const res = await axios.post(image_Api_url, formData);
          photoURL = res.data.data.url; 
        
      }

      const updatedInfo = {
        displayName: data.name,
        dateOfBirth: data.dateOfBirth,
        photoURL,
      };

      await axiosSecure.patch(`/users/${user.email}`, updatedInfo);  
      
      //profile update on firebase
    const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };
      await updateUserProfile(userProfile)   

      toast.success("Profile updated successfully!");
      refetch()
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  if (userLoading || affiliationsLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-base-100 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-base-200 rounded-xl shadow p-8 space-y-8">
        <h1 className="text-3xl font-semibold text-center text-secondary">My Profile</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Profile Picture */}
          <div className="flex justify-center">
            <img
              src={userInfo.photoURL}
              alt={userInfo.displayName}
              className="w-28 h-28 rounded-full object-cover"
            />
          </div>


          {/* Name */}
          <div>
            <label className="label">Full Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              {...register("name", { required: true })}
              defaultValue={userInfo.displayName}
            />
            {errors.name && <p className="text-error text-sm mt-1">Name is required</p>}
          </div>

          {/* Email (read-only) */}
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              className="input input-bordered w-full bg-base-300 cursor-not-allowed"
              value={user.email}
              readOnly
            />
          </div>

           <div>
            <label className="label">Change Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              {...register("photo")}
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="label">Date of Birth</label>
            <input
              type="date"
              className="input input-bordered w-full"
              {...register("dateOfBirth", { required: true })}
              defaultValue={userInfo.dateOfBirth}
            />
            {errors.dateOfBirth && (
              <p className="text-error text-sm mt-1">Date of Birth is required</p>
            )}
          </div>

          <button className="btn btn-primary w-full mt-4">Update Profile</button>
        </form>

        {/* Affiliations */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-secondary mb-3">Current Company Affiliations</h2>
          {affiliations.length === 0 ? (
            <p className="text-neutral text-sm">You are not affiliated with any company yet.</p>
          ) : (
            <ul className="space-y-2">
              {affiliations.map((a) => (
                <li
                  key={a.companyName}
                  className="flex items-center justify-between p-3 bg-base-100 rounded-lg shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={a.companyLogo || "/avatar.png"}
                      alt={a.companyName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="font-medium text-secondary">{a.companyName}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfilePage;
