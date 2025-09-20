"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function MonumbyBadge() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="fixed top-20 right-6 z-50"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <a
        href="https://monumby.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ir a MoNumby Premium Products"
      >
        <Image
          src="/Premium.png"
          alt="Sello Premium MoNumby"
          width={100}
          height={100}
          className="hover:scale-110 transition-transform drop-shadow-xl rounded-full bg-black/60 p-2"
        />
      </a>

      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="absolute right-0 mt-2 px-3 py-1 bg-white text-black text-sm rounded-lg shadow-lg whitespace-nowrap"
          >
            Monumby — nuestra línea premium
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
