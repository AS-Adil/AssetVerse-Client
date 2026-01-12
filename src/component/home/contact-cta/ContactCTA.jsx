import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const ContactCTA = () => {
  return (
    <section className="py-17 bg-base-300 text-base-content">
      <div className="max-w-7xl mx-auto px-6 text-center">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-white max-w-3xl mx-auto"
        >
          Ready to Take Control of Your Company Assets?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-4 text-white text-lg max-w-2xl mx-auto"
        >
          Join organizations that manage assets with clarity, security,
          and confidence using AssetVerse.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 flex flex-wrap justify-center gap-4"
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
    </section>
  );
};

export default ContactCTA;
