import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  LayoutDashboard,
  Users,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: LayoutDashboard,
    title: "Centralized Asset Management",
    description:
      "Manage all company assets from a single, secure dashboard with complete visibility across departments.",
  },
  {
    icon: Users,
    title: "Team-Based Asset Allocation",
    description:
      "Assign, track, and transfer assets between employees and teams with full accountability.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Reliable",
    description:
      "Built with modern authentication and role-based access to ensure data security and compliance.",
  },
  {
    icon: BarChart3,
    title: "Insights & Reporting",
    description:
      "Gain actionable insights with real-time reports on asset usage, status, and lifecycle.",
  },
];

const AboutSection = () => {
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
            Why Choose AssetVerse
          </h2>
          <p className="mt-4 text-neutral text-lg">
            AssetVerse helps organizations streamline asset tracking,
            improve accountability, and make informed decisions with confidence.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.3, }}
              viewport={{ once: true }}
              className="card bg-base-200  border border-base-200 shadow-sm p-6"
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

export default AboutSection;
