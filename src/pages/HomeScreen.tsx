import { User, Zap } from "lucide-react";
import { motion } from "framer-motion";
import FocusRing from "@/components/FocusRing";

const HomeScreen = () => {
  const score = 85;
  const percentile = 76;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="min-h-screen bg-background flex flex-col px-6 pt-6 pb-28"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-display text-xl font-bold text-foreground tracking-tight">T1.</h1>
        <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
          <User size={18} className="text-muted-foreground" />
        </button>
      </div>

      {/* Focus Ring Area */}
      <div className="flex-1 flex flex-col items-center justify-center -mt-4">
        {/* Nudge text - BIGGER AND BOLDER */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-foreground text-base tracking-[0.15em] mb-8 font-bold uppercase"
        >
          Ahead of {percentile}% of users
        </motion.p>

        <FocusRing score={score} />

        {/* Percentage below score */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="text-muted-foreground text-xs tracking-[0.2em] mt-4 font-medium"
        >
          TOP {100 - percentile}% PERFORMER
        </motion.p>

        {/* Lightning button */}
        <div className="flex justify-end w-full mt-4 pr-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
          >
            <Zap size={16} className="text-muted-foreground" />
          </motion.button>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-border mx-2 mb-6" />

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="flex items-center justify-around mb-6"
      >
        <div className="flex flex-col items-center">
          <span className="font-display text-2xl font-bold text-foreground">12</span>
          <span className="text-[10px] tracking-[0.2em] text-muted-foreground mt-1">STREAK</span>
        </div>
        <div className="w-px h-10 bg-border" />
        <div className="flex flex-col items-center">
          <span className="font-display text-2xl font-bold text-foreground">24</span>
          <span className="text-[10px] tracking-[0.2em] text-muted-foreground mt-1">SESSIONS</span>
        </div>
        <div className="w-px h-10 bg-border" />
        <div className="flex flex-col items-center">
          <span className="font-display text-2xl font-bold text-foreground">5.5</span>
          <span className="text-[10px] tracking-[0.2em] text-muted-foreground mt-1">HOURS</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HomeScreen;
