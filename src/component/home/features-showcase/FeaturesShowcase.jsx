import React from "react";
import { motion } from "framer-motion";
import {
  Package,
  Users,
  Building2,
  ShieldCheck,
  CreditCard,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: Package,
    title: "Asset Inventory Tracking",
    description:
      "Maintain a real-time inventory of all company assets with clear availability and usage status.",
  },
  {
    icon: Users,
    title: "Employee Asset Requests",
    description:
      "Employees can request assets directly, with approval workflows handled by HR managers.",
  },
  {
    icon: Building2,
    title: "Multi-Company Support",
    description:
      "Employees can work with multiple companies while keeping asset records separated and secure.",
  },
  {
    icon: ShieldCheck,
    title: "Role-Based Access Control",
    description:
      "Secure the platform with HR-only and employee-level permissions powered by JWT authentication.",
  },
  {
    icon: CreditCard,
    title: "Subscription Management",
    description:
      "Upgrade employee limits seamlessly with integrated Stripe payment support.",
  },
  {
    icon: BarChart3,
    title: "Reports & Analytics",
    description:
      "Visual dashboards provide insights into asset usage, requests, and returnable items.",
  },
];

const FeaturesShowcase = () => {
  return (
    <section className="py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-3xl mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary">
            Powerful Features Built for Businesses
          </h2>
          <p className="mt-4 text-neutral text-lg">
            Everything you need to manage company assets efficiently and
            securely.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -6,
                scale: 1.03,
              }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              className="
    group card bg-base-100 dark:bg-base-200
    border border-base-200 p-6 rounded-md
    shadow-sm hover:shadow-xl
    transition-shadow duration-300
  "
            >
              <feature.icon
                className="w-10 h-10 text-primary mb-4"
                strokeWidth={1.5}
              />
              <h3 className="text-lg font-semibold text-secondary mb-2">
                {feature.title}
              </h3>
              <p className="text-neutral text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;
