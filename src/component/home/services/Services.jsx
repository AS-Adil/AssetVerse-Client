import React from "react";
import { motion } from "framer-motion";
import {
  HiOutlineClipboardDocumentCheck,
  HiOutlineCube,
  HiOutlineUsers,
  HiOutlineChartBar,
  HiOutlineShieldCheck,
  HiOutlineClock,
} from "react-icons/hi2";

const services = [
  {
    id: 1,
    title: "Asset Tracking",
    description:
      "Track all company assets in real time with clear status, ownership, and usage history.",
    icon: HiOutlineCube,
  },
  {
    id: 2,
    title: "Request & Approval",
    description:
      "Employees can request assets while managers approve or reject with full transparency.",
    icon: HiOutlineClipboardDocumentCheck,
  },
  {
    id: 3,
    title: "Role-Based Access",
    description:
      "Secure access control for Users, Managers, and Admins with defined permissions.",
    icon: HiOutlineUsers,
  },
  {
    id: 4,
    title: "Analytics & Reports",
    description:
      "Visual dashboards and reports help monitor asset usage and performance.",
    icon: HiOutlineChartBar,
  },
  {
    id: 5,
    title: "Secure Management",
    description:
      "Enterprise-grade security ensures data protection and system integrity.",
    icon: HiOutlineShieldCheck,
  },
  {
    id: 6,
    title: "Lifecycle Monitoring",
    description:
      "Monitor assets from purchase to retirement with full lifecycle visibility.",
    icon: HiOutlineClock,
  },
];

/* Animation Variants */
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const Services = () => {
  return (
    <section className="bg-base-100 dark:bg-base-200 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary dark:text-base-content">
            Our Core Services
          </h2>
          <p className="mt-4 text-base-content/70">
            AssetVerse provides powerful tools to manage, track, and optimize
            enterprise assets with efficiency and security.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group card bg-base-100 
                border border-base-300 dark:border-base-content/10
                 p-6 shadow-sm hover:shadow-xl
                transition-shadow duration-300 h-full"
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 flex items-center justify-center
                 rounded bg-primary/10 text-primary
                  group-hover:bg-primary group-hover:text-white
                  transition duration-300"
                >
                  <Icon className="text-3xl" />
                </div>

                {/* Content */}
                <h3 className="mt-6 text-xl font-semibold text-secondary dark:text-base-content">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm text-base-content/70 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
