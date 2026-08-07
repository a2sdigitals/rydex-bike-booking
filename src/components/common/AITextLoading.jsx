import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export const AITextLoading = ({
  texts = [
    "Starting Engines...",
    "Checking Availability...",
    "Preparing Showroom...",
    "Polishing Bikes...",
    "Almost Ready...",
  ],
  className = "",
  interval = 1000,
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, texts.length]);

  return (
    <div className="flex min-h-screen items-center justify-center p-8 bg-background-black relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      
      <motion.div
        animate={{ opacity: 1 }}
        className="relative w-full px-4 py-2"
        initial={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            animate={{
              opacity: 1,
              y: 0,
              backgroundPosition: ["200% center", "-200% center"],
            }}
            className={`flex min-w-max justify-center whitespace-nowrap bg-[length:200%_100%] bg-gradient-to-r from-primary/30 via-white to-primary/30 bg-clip-text font-heading font-black text-4xl sm:text-5xl md:text-6xl text-transparent drop-shadow-[0_0_30px_rgba(255,51,102,0.5)] ${className}`}
            exit={{ opacity: 0, y: -20 }}
            initial={{ opacity: 0, y: 20 }}
            key={currentTextIndex}
            transition={{
              opacity: { duration: 0.3 },
              y: { duration: 0.3 },
              backgroundPosition: {
                duration: 2.5,
                ease: "linear",
                repeat: Infinity,
              },
            }}
          >
            {texts[currentTextIndex]}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
