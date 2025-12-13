import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PackagesSection = () => {
  const [packages, setPackages] = useState([]);

  const axiosSecure = useAxiosSecure()

  useEffect(() => {
    // fetch("http://localhost:3000/packages")

    //   .then(res => res.json())
    //   .then(data => setPackages(data));

    axiosSecure.get('/packages')
    .then(res =>{
        setPackages(res.data)
    })

  }, [axiosSecure]);

  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary">
            Pricing Plans
          </h2>
          <p className="mt-4 text-neutral text-lg">
            Choose a plan that fits your organization’s size and growth needs.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => {
            const isPopular = pkg.name === "Standard";

            return (
              <div
                key={pkg._id}
                className={`card bg-base-100 border ${
                  isPopular
                    ? "border-primary shadow-lg"
                    : "border-base-200"
                } p-8`}
              >
                {/* Package Name */}
                <h3 className="text-xl font-semibold text-secondary mb-2">
                  {pkg.name}
                </h3>

                {/* Employee Limit */}
                <p className="text-sm text-neutral mb-4">
                  Up to {pkg.employeeLimit} employees
                </p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-bold text-primary">
                    ${pkg.price}
                  </span>
                  <span className="text-neutral text-sm"> / month</span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-neutral"
                    >
                      <CheckCircle
                        className="w-5 h-5 text-success mt-0.5"
                        strokeWidth={1.5}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`btn w-full ${
                    isPopular ? "btn-primary" : "btn-outline"
                  }`}
                >
                  Get Started
                </button>

                {/* Popular Badge */}
                {isPopular && (
                  <div className="mt-4 text-sm text-primary text-center font-medium">
                    Most Popular
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
