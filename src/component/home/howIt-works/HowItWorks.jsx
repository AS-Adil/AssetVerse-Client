import React from "react";
import { motion } from "framer-motion";
import { Package, Users, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: Package,
    title: "Add Company Assets",
    description:
      "Register and organize all company assets with detailed information, ownership, and status.",
  },
  {
    icon: Users,
    title: "Assign to Employees",
    description:
      "Allocate assets to employees or teams with approval workflows and full accountability.",
  },
  {
    icon: BarChart3,
    title: "Track & Analyze",
    description:
      "Monitor asset usage, lifecycle, and generate insightful reports for better decisions.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary">
            How AssetVerse Works
          </h2>
          <p className="mt-4 text-neutral text-lg">
            A simple and structured process designed for modern organizations.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="bg-base-100 border border-base-200 rounded-xl p-8 shadow-sm"
            >
              {/* Step Number */}
              <div className="text-primary text-sm font-semibold mb-3">
                STEP {index + 1}
              </div>

              {/* Icon */}
              <step.icon
                className="w-10 h-10 text-primary mb-4"
                strokeWidth={1.5}
              />

              {/* Title */}
              <h3 className="text-lg font-semibold text-secondary mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-neutral text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
