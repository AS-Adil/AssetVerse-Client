import React from "react";
import { motion } from "framer-motion";
import {
  HiOutlineIdentification,
  HiOutlineShieldCheck,
  HiOutlineUsers,
  HiOutlineLockClosed,
  HiOutlinePencilSquare,
  HiOutlineInbox,
} from "react-icons/hi2";

const sections = [
  {
    icon: HiOutlineIdentification,
    title: "Information We Collect",
    content: (
      <>
        AssetVerse collects information necessary to provide asset management
        services. This includes:
        <ul className="mt-2 list-disc pl-5 space-y-1 text-base-content/70">
          <li>User account info (name, email, role)</li>
          <li>Company & organizational details</li>
          <li>Asset data (assignments, usage history)</li>
          <li>Authentication & login activity</li>
        </ul>
      </>
    ),
  },
  {
    icon: HiOutlineShieldCheck,
    title: "How We Use Your Information",
    content: (
      <>
        We use collected information to:
        <ul className="mt-2 list-disc pl-5 space-y-1 text-base-content/70">
          <li>Provide and maintain AssetVerse services</li>
          <li>Enable asset tracking, requests, and approvals</li>
          <li>Improve system performance and UX</li>
          <li>Ensure security and prevent unauthorized access</li>
        </ul>
      </>
    ),
  },
  {
    icon: HiOutlineLockClosed,
    title: "Data Security",
    content: (
      <p className="text-base-content/70 leading-relaxed">
        AssetVerse uses industry-standard security measures including
        authentication, role-based access control, and secure storage to
        protect organizational data.
      </p>
    ),
  },
  {
    icon: HiOutlineUsers,
    title: "Data Sharing",
    content: (
      <p className="text-base-content/70 leading-relaxed">
        AssetVerse does not sell or rent personal data. Data may be shared
        only to operate core services or comply with legal obligations.
      </p>
    ),
  },
  {
    icon: HiOutlinePencilSquare,
    title: "Policy Updates",
    content: (
      <p className="text-base-content/70 leading-relaxed">
        This Privacy Policy may be updated periodically. Continued use of
        AssetVerse indicates acceptance of revised policies.
      </p>
    ),
  },
  {
    icon: HiOutlineInbox,
    title: "Contact Us",
    content: (
      <p className="text-base-content/70 leading-relaxed">
        Questions about privacy? Contact the AssetVerse support team for
        assistance.
      </p>
    ),
  },
];

const Privacy = () => {
  return (
    <main className="bg-base-100 min-h-screen">
      {/* Header */}
      <section className="py-20 ">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-secondary dark:text-base-content"
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-base-content/70 leading-relaxed"
          >
            Your privacy is important to us. AssetVerse protects your data and
            explains how we handle it in this policy.
          </motion.p>
        </div>
      </section>

      {/* Cards Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="
                  flex flex-col p-6 rounded-2xl border border-base-100
                  bg-base-200 shadow-sm hover:shadow-lg
                  transition-all duration-300
                "
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 text-primary mb-4">
                  <Icon className="w-7 h-7" />
                </div>
                <h2 className="text-lg font-semibold text-secondary dark:text-base-content">
                  {section.title}
                </h2>
                <div className="mt-3 text-sm text-base-content/70 leading-relaxed">
                  {section.content}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Privacy;
