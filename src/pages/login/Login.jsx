import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import Loading from "../../component/loading/Loading";
import toast from "react-hot-toast";
import LoadingButton from "../../component/loading-button/LoadingButton";

const Login = () => {
  const { signInuser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loadingbtn, setLoadingBtn] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const handleLogin = (data) => {
    // console.log("Login data:", data);

    setLoadingBtn(true);
    signInuser(data.email, data.password)
      .then((res) => {
        // console.log(res);
        toast.success(`Logged In Successfully`);

        navigate("/");
      })
      .catch((err) => {
        // console.log(err);
        toast.error(err.message);
      })
      .finally(() => {
        setLoadingBtn(false);
      });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="grid md:grid-cols-2 bg-base-100 shadow-xl rounded-2xl overflow-hidden max-w-5xl w-full">
        {/* Form Section */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-secondary mb-2">
            Welcome Back
          </h2>
          <p className="text-neutral mb-6">Log in to your AssetVerse account</p>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setValue("email", "company_a@gmail.com", {
                  shouldValidate: true,
                });
                setValue("password", "company 100", { shouldValidate: true });
              }}
              className="btn btn-xs bg-primary text-white hover:bg-primary/90"
            >
              Auto fill for HR
            </button>

            <button
              type="button"
              onClick={() => {
                setValue("email", "employee1@gmail.com", {
                  shouldValidate: true,
                });
                setValue("password", "Employee 100", { shouldValidate: true });
              }}
              className="btn btn-xs bg-primary text-white hover:bg-primary/90"
            >
              Auto fill for Employee
            </button>
          </div>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
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
                placeholder="email@company.com"
              />
              {errors.email && (
                <p className="text-error text-sm mt-1">
                  Valid email is required
                </p>
              )}
            </div>

            {/* Password with Toggle */}
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
              loadingText="Logging in"
              text="Login"
            />
          </form>

          <p className="text-sm text-center text-neutral mt-6">
            Don’t have an account?{" "}
            <Link
              to="/hr-registration"
              className="text-primary font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>

        <div className="hidden md:flex relative">
          <img
            src="https://i.ibb.co.com/m5YZdvfJ/loginimage.webp"
            alt="Login Visual"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/50 to-transparent flex items-center justify-center p-10">
            <p className="text-base-100 text-xl leading-relaxed font-medium text-center">
              Securely access your company assets
              <br />
              anytime, anywhere.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
