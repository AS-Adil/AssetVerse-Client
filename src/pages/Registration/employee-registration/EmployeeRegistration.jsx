import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import LoadingButton from "../../../component/loading-button/LoadingButton";

const EmployeeRegistration = () => {
  const { registerUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [showPassword, setShowPassword] = useState(false);
  const [loadingbtn, setLoadingBtn] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = async (data) => {
    setLoadingBtn(true);
    try {
      const imageFile = data.photo[0];

      //  create user
      await registerUser(data.email, data.password);

      // upload image
      const formData = new FormData();
      formData.append("image", imageFile);
      const image_Api_url = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host_key
      }`;
      const imgRes = await axios.post(image_Api_url, formData);
      const photoURL = imgRes.data.data.url;

      // save user in DB
      await axiosSecure.post("/users", {
        email: data.email,
        displayName: data.name,
        photoURL,
        dateOfBirth: data.dateOfBirth,
        role: "employee",
        createdAt: new Date().toLocaleDateString(),
      });

      //update Firebase profile
      await updateUserProfile({ displayName: data.name, photoURL });

      toast.success("Registered Successfully");
      navigate("/");
    } catch (err) {
      // console.log(err);
      toast.error("Failed to Register");
    } finally {
      setLoadingBtn(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-14 px-4">
      <div className="grid md:grid-cols-2 bg-base-100 shadow-xl rounded-2xl overflow-hidden max-w-5xl w-full">
        {/* Form Section */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-secondary mb-2">
            Join AssetVerse
          </h2>

          <p className="text-neutral mb-6">
            Register as an Employee or{" "}
            <Link
              to="/hr-registration"
              className="text-primary font-semibold hover:underline"
            >
              HR Manager
            </Link>
          </p>

          {/* Info Box */}
          <div className="bg-base-200 border border-base-300 rounded-lg p-4 mb-6">
            <p className="text-sm text-secondary">
              You can log in immediately, but you won’t see any company data
              until an HR Manager connects you to a company.
            </p>
          </div>

          <form onSubmit={handleSubmit(handleRegister)}  className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="label">Full Name</label>
              <input
                className="input input-bordered w-full"
                {...register("name", { required: true })}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-error text-sm mt-1">Name is required</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                className="input input-bordered w-full"
                {...register("email", {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                })}
                placeholder="personal@email.com"
              />
              {errors.email && (
                <p className="text-error text-sm mt-1">
                  Valid email is required
                </p>
              )}
            </div>

            {/* Profile Image */}
            <div>
              <label className="label">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full"
                {...register("photo", { required: true })}
              />
              {errors.photo && (
                <p className="text-error text-sm mt-1">
                  Profile image is required
                </p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="label">Date of Birth</label>
              <input
                type="date"
                className="input input-bordered w-full"
                {...register("dateOfBirth", { required: true })}
              />
              {errors.dateOfBirth && (
                <p className="text-error text-sm mt-1">
                  Date of Birth is required
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="label">Password</label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pr-12"
                  {...register("password", {
                    required: true,
                    pattern: /^.{6,}$/,
                  })}
                  placeholder="Password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 z-10 top-1/2 -translate-y-1/2 text-neutral hover:text-secondary"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {errors.password && (
                <p className="text-error text-sm mt-1">
                  Minimum 6 characters required
                </p>
              )}
            </div>

            <LoadingButton
              loading={loadingbtn}
              loadingText="Creating"
              text="Create Account"
            />
          </form>
          <p className="text-sm text-center text-neutral mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Image Section */}
        <div className="hidden md:flex relative">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
            alt="Employee Workspace"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/50 to-transparent flex items-center justify-center p-10">
            <p className="text-base-100 text-xl leading-relaxed font-medium text-center">
              Join your company workspace
              <br />
              once your HR Manager connects you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeRegistration;
