import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

const HrRegistration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    // Prepare the final data structure for backend
    const registrationData = {
      ...data,
      role: "hr",             // auto-assigned
      packageLimit: 5,        // auto-assigned
      currentEmployees: 0,    // auto-assigned
      subscription: "basic",  // auto-assigned
    };

    console.log("HR registration data:", registrationData);
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
            Register as an HR Manager or{" "}
            <Link
              to="/employee-registration"
              className="text-primary font-semibold hover:underline"
            >
              Employee
            </Link>
          </p>

          <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">

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
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
                })}
                placeholder="email@company.com"
              />
              {errors.email && (
                <p className="text-error text-sm mt-1">Valid email is required</p>
              )}
            </div>

            {/* Company Name */}
            <div>
              <label className="label">Company Name</label>
              <input
                className="input input-bordered w-full"
                {...register("companyName", { required: true })}
                placeholder="AssetVerse Ltd."
              />
              {errors.companyName && (
                <p className="text-error text-sm mt-1">Company Name is required</p>
              )}
            </div>

            {/* Company Logo */}
            <div>
              <label className="label">Company Logo</label>
              <input
                type="file"
                accept="image/*"
                {...register("companyLogo", { required: true })}
                className="file-input file-input-bordered w-full"
              />

              {errors.companyLogo && (
                <p className="text-error text-sm mt-1">Company Logo is required</p>
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
                <p className="text-error text-sm mt-1">Date of Birth is required</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="label">Password</label>
              <input
                type="password"
                className="input input-bordered w-full"
                {...register("password", { 
                  required: true,
                  pattern: /^.{6,}$/, // minimum 6 characters
                })}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-error text-sm mt-1">
                  Minimum 6 characters required
                </p>
              )}
            </div>

            <button className="btn btn-primary w-full mt-6">
              Create Account
            </button>
          </form>
        </div>

        {/* Image Section */}
        <div className="hidden md:flex relative">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80"
            alt="Corporate Team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/50 to-transparent flex items-center justify-center p-10">
            <p className="text-base-100 text-xl leading-relaxed font-medium text-center">
              Manage company assets, employees, and subscriptions
              <br />— all in one professional platform.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HrRegistration;
