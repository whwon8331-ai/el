import { motion } from "motion/react";
import { useEffect, useState } from "react";
import React from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [loadingText, setLoadingText] = useState("System Loading...");
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setLoadingText("Connecting to the Abyss..."), 1000);
    const timer2 = setTimeout(() => setLoadingText("Identity Verification: Master Alchemist"), 2500);
    const timer3 = setTimeout(() => {
      setLoadingText("Access Granted");
      setIsReady(true);
    }, 4000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 35); // Approx 3.5s to reach 100%

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 text-purple-300 font-mono"
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Magic Circle Animation */}
      <motion.div
        className="w-48 h-48 border-2 border-purple-600 rounded-full flex items-center justify-center mb-8 relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-2 border border-purple-800/50 rounded-full" />
        <div className="absolute inset-8 border border-purple-500/30 rounded-full rotate-45" />
        <div className="w-32 h-32 border border-purple-400 rounded-full opacity-50" />
      </motion.div>

      {/* Text */}
      <motion.div
        key={loadingText}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="text-sm tracking-widest mb-4 h-6 text-center px-4"
      >
        {loadingText}
      </motion.div>

      {/* Progress Bar */}
      <div className="w-64 h-1 bg-purple-900/30 rounded-full overflow-hidden mb-8">
        <motion.div
          className="h-full bg-purple-500"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      {/* Touch to Enter */}
      {isReady && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          className="px-6 py-3 border border-purple-500/50 text-purple-200 text-xs tracking-[0.2em] uppercase hover:bg-purple-900/20 transition-colors cursor-pointer"
        >
          Touch Screen to Enter
        </motion.button>
      )}
    </motion.div>
  );
};

export default SplashScreen;
