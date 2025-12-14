import React from "react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "Is AssetVerse secure for enterprise use?",
    answer:
      "Yes. AssetVerse uses modern authentication, role-based access control, and secure data handling to protect company assets and user information.",
  },
  {
    question: "Can we manage assets for multiple departments?",
    answer:
      "Absolutely. AssetVerse supports department-based asset tracking, allowing organizations to manage assets across teams with full visibility.",
  },
  {
    question: "How does the employee limit work in pricing plans?",
    answer:
      "Each plan includes a maximum number of employees. You can upgrade your plan at any time as your organization grows.",
  },
  {
    question: "Can assets be reassigned between employees?",
    answer:
      "Yes. Assets can be transferred between employees with proper approval, ensuring accountability and tracking history.",
  },
  {
    question: "Do all plans include customer support?",
    answer:
      "Yes. All plans include support, with higher-tier plans offering faster response times and priority assistance.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-neutral text-lg">
            Everything you need to know before getting started with AssetVerse.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4 max-w-4xl">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="collapse collapse-arrow bg-base-100 border border-base-200 shadow-sm rounded-lg"
            >
              <input type="radio" name="assetverse-faq" />
              <div className="collapse-title text-lg font-medium text-secondary">
                {faq.question}
              </div>
              <div className="collapse-content text-neutral leading-relaxed">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
