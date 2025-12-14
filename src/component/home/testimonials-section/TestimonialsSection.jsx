import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const testimonials = [
  {
    name: "Sarah Ahmed",
    role: "HR Manager, TechNova Ltd.",
    quote:
      "AssetVerse has brought clarity and accountability to our asset management process. Everything is now structured and reliable.",
    image: "https://randomuser.me/api/portraits/women/25.jpg",
  },
  {
    name: "Michael Chen",
    role: "Operations Lead, ByteWorks",
    quote:
      "Managing assets across teams used to be complex. AssetVerse simplified everything into one secure platform.",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    name: "Ayesha Rahman",
    role: "Admin, FinCore Solutions",
    quote:
      "The reporting and visibility features help us make confident decisions. A truly professional solution.AssetVerse fits perfectly ",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    name: "David Johnson",
    role: "HR Specialist, CloudSync Ltd.",
    quote:
      "Clean UI, smooth workflows, and reliable performance. AssetVerse fits perfectly into our operations.",
    image: "https://randomuser.me/api/portraits/men/34.jpg",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary">
            Trusted by Growing Organizations
          </h2>
          <p className="mt-4 text-neutral text-lg">
            Companies rely on AssetVerse to manage assets with confidence,
            transparency, and control.
          </p>
        </motion.div>

        <Swiper
          loop
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          spaceBetween={24}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Autoplay]}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="
                  h-full bg-base-200 border border-base-200
                  rounded-xl p-8 shadow-sm
                  flex flex-col
                "
              >
                <Quote className="w-6 h-6 text-primary mb-4" />

                <p className="text-neutral text-sm leading-relaxed mb-6 flex-grow">
                  “{item.quote}”
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-base-200">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                  />
                  <div>
                    <h4 className="font-semibold text-secondary text-sm">
                      {item.name}
                    </h4>
                    <p className="text-xs text-neutral">{item.role}</p>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialsSection;
