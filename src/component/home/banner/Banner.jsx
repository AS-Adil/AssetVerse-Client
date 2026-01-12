import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { ChevronDown } from "lucide-react";


const Banner = () => {
  return (
    <section
      className="relative min-h-[70vh] flex items-center"
      style={{
        backgroundImage:
          "url('https://i.ibb.co.com/3yHcjxBx/banner-image.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-secondary/60"></div>

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
          <Link to="/employee-registration" className="btn btn-primary px-8">
            Get Started
          </Link>

          <Link
            to="/about-us"
            className="btn btn-outline text-white border-white hover:bg-primary"
          >
            Learn More
          </Link>
        </motion.div>
      </div>
      {/* Scroll Indicator */}
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.9 }}
  className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/80"
>
  {/* <span className="text-sm tracking-wide text-base-100 font-semibold ">Scroll</span> */}

  <motion.div
    animate={{ y: [0, 10, 0] }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <ChevronDown className="w-6 h-6 text-base-100" />
  </motion.div>
</motion.div>

    </section>
  );
};

export default Banner;
