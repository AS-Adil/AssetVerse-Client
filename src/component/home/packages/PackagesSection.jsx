import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../loading/Loading";

const PackagesSection = () => {
  const axiosSecure = useAxiosSecure();

  const { data: packages = [], isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/packages");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary">
            Pricing Plans
          </h2>
          <p className="mt-4 text-neutral text-lg">
            Choose a plan that fits your organization’s size and growth needs.
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="
                card bg-base-200 border border-base-200 p-8
                transition-all duration-300
                hover:border-primary
                hover:shadow-lg
                
              "
            >
              <h3 className="text-xl font-semibold text-secondary mb-2">
                {pkg.name}
              </h3>

              <p className="text-sm text-neutral mb-4">
                Up to {pkg.employeeLimit} employees
              </p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-primary">
                  ${pkg.price}
                </span>
                <span className="text-neutral text-sm"> / month</span>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, i) => (
                  <li
                    key={i}
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

              <button className="btn btn-outline hover:bg-primary hover:text-white w-full">
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
