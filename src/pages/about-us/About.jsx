import React from "react";
import { motion } from "framer-motion";
import {
  HiOutlineBuildingOffice2,
  HiOutlineShieldCheck,
  HiOutlineChartBar,
  HiOutlineUsers,
} from "react-icons/hi2";

const values = [
  {
    icon: HiOutlineBuildingOffice2,
    title: "Enterprise-Focused Design",
    description:
      "AssetVerse is built specifically for organizations to manage physical and digital assets with clarity and control.",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Security & Access Control",
    description:
      "We prioritize role-based access and secure authentication to protect sensitive asset data.",
  },
  {
    icon: HiOutlineChartBar,
    title: "Data-Driven Decisions",
    description:
      "Real-time analytics and reports help businesses make informed decisions about asset utilization.",
  },
  {
    icon: HiOutlineUsers,
    title: "People-Centered Workflow",
    description:
      "Designed around employees, managers, and admins to ensure smooth collaboration across teams.",
  },
];

const About = () => {
  return (
    <main className="bg-base-100 ">
      {/* Hero Section */}
      <section className="py-20 ">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-secondary dark:text-base-content">
              About AssetVerse
            </h1>
            <p className="mt-6 text-lg text-base-content/70 leading-relaxed">
              AssetVerse is a modern asset management platform designed to help
              organizations track, manage, and analyze assets efficiently across
              teams and departments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-base-200 p-6.5 rounded-2xl shadow-sm"
          >
            <h2 className="text-3xl font-bold text-secondary dark:text-base-content">
              Our Mission
            </h2>
            <p className="mt-4 text-base-content/70 leading-relaxed">
              Our mission is to simplify enterprise asset management by providing
              real-time visibility, secure access control, and actionable
              insights. AssetVerse empowers organizations to reduce asset loss,
              improve accountability, and optimize operational efficiency.
            </p>
            <p className="mt-4 text-base-content/70 leading-relaxed">
              We focus on building systems that scale with growing organizations
              while maintaining clarity, security, and usability.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-base-200  rounded-2xl p-8 shadow-sm"
          >
            <h3 className="text-xl font-semibold text-secondary dark:text-base-content">
              Why AssetVerse?
            </h3>
            <ul className="mt-4 space-y-3 text-base-content/70">
              <li>• Centralized asset inventory</li>
              <li>• Transparent request & approval workflows</li>
              <li>• Role-based dashboards</li>
              <li>• Real-time analytics & reporting</li>
              <li>• Secure, scalable architecture</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-base-100 ">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mb-12"
          >
            <h2 className="text-3xl font-bold text-secondary dark:text-base-content">
              What Drives AssetVerse
            </h2>
            <p className="mt-4 text-base-content/70">
              Our platform is guided by principles that ensure reliability,
              security, and long-term value for organizations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="
                    group bg-base-200 
                   rounded-xl p-6
                    shadow-sm hover:shadow-lg
                    transition-all duration-300
                  "
                >
                  <Icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-lg font-semibold text-secondary dark:text-base-content">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-base-content/70 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <h2 className="text-3xl font-bold text-secondary dark:text-base-content">
              Built for Modern Organizations
            </h2>
            <p className="mt-4 text-base-content/70 leading-relaxed">
              AssetVerse is designed to support growing teams, multiple
              departments, and evolving asset management needs — all within a
              single, secure platform.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default About;
