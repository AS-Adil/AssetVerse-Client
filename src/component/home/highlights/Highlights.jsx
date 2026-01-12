import React from "react";
import { motion } from "framer-motion";
import {
  HiOutlineEye,
  HiOutlineShieldCheck,
  HiOutlineUsers,
  HiOutlineChartBar,
} from "react-icons/hi2";

/* Real AssetVerse Highlights */
const highlights = [
  {
    id: 1,
    title: "Real-Time Asset Visibility",
    description:
      "View live asset status, availability, and assignment details across your organization in real time.",
    icon: HiOutlineEye,
  },
  {
    id: 2,
    title: "Improved Security & Control",
    description:
      "Role-based access ensures only authorized users can request, approve, or manage assets.",
    icon: HiOutlineShieldCheck,
  },
  {
    id: 3,
    title: "Company-Wide Affiliation View",
    description:
      "See employees affiliated with the same organization and track asset ownership and responsibility clearly.",
    icon: HiOutlineUsers,
  },
  {
    id: 4,
    title: "Real-Time Asset Analytics",
    description:
      "Access live analytics and reports to monitor asset usage, performance, and trends.",
    icon: HiOutlineChartBar,
  },
];

/* Motion Variants */
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Highlights = () => {
  return (
    <section className="bg-base-200 dark:bg-base-100 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary dark:text-base-content">
            Platform Highlights
          </h2>
          <p className="mt-4 text-base-content/70">
            AssetVerse focuses on transparency, security, and real-time insights
            to help organizations manage assets efficiently.
          </p>
        </motion.div>

        {/* Highlights Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                className="card bg-base-200 
                border border-base-300 dark:border-base-content/10
                 p-6 shadow-sm hover:shadow-xl
                transition-shadow duration-300 h-full"
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 flex items-center justify-center
                  rounded bg-primary/10 text-primary mb-5"
                >
                  <Icon className="text-3xl" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-secondary dark:text-base-content">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm text-base-content/70 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Highlights;
