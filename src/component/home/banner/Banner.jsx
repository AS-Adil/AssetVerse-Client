import React from "react";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <section
      className="relative min-h-[85vh] flex items-center"
      style={{
        backgroundImage: "url('https://i.ibb.co.com/3yHcjxBx/banner-image.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-secondary/50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-base-100">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold leading-tight max-w-2xl"
        >
          Manage Company Assets With Clarity & Control
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg text-gray-200 max-w-xl"
        >
          Track, assign, and manage company assets across teams and locations
          from one secure and centralized platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <button className="btn btn-primary px-8">Get Started</button>
          <button className="btn btn-outline hover:bg-primary text-base-100 border-base-100">
            Request a Demo
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
