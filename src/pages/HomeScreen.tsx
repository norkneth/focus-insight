import { User, Zap, Flame } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import FocusRing from "@/components/FocusRing";

interface HomeScreenProps {
  username?: string;
  onOpenTimer?: () => void;
  onOpenProfile?: () => void;
}

const HomeScreen = ({ username, onOpenTimer, onOpenProfile }: HomeScreenProps) => {
  const score = 85;
  const percentile = 76;
  const [showBreakdown, setShowBreakdown] = useState(false);

  // Streak level
  const streak = 12;
  const streakLevel = streak >= 14 ? "intense" : streak >= 7 ? "medium" : "small";
  const streakColors = {
    small: "text-orange-400",
    medium: "text-orange-500",
    intense: "text-red-500",
  };

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
        <button onClick={onOpenProfile} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center active:scale-90 transition-transform">
          <User size={18} className="text-muted-foreground" />
        </button>
      </div>

      {/* Focus Ring Area */}
      <div className="flex-1 flex flex-col items-center justify-center -mt-4">
        {/* Nudge text */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-foreground text-base tracking-[0.15em] mb-6 font-bold uppercase"
        >
          Ahead of {percentile}% of users
        </motion.p>

        <FocusRing score={score} onTap={() => setShowBreakdown(!showBreakdown)} showBreakdown={showBreakdown} />

        {/* Percentage below score */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="text-muted-foreground text-xs tracking-[0.2em] mt-3 font-medium"
        >
          TOP {100 - percentile}% PERFORMER
        </motion.p>

        {/* Tap hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.8 }}
          className="text-[10px] text-muted-foreground mt-1 tracking-wide"
        >
          tap ring for breakdown
        </motion.p>
      </div>

      {/* Dynamic Insight Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mb-5"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={insightIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-card border border-border rounded-2xl px-4 py-3.5 flex items-center gap-3 glow-sm"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentInsight.type === "success" ? "bg-emerald-500/15" :
              currentInsight.type === "warning" ? "bg-amber-500/15" : "bg-red-500/15"
            }`}>
              <InsightIcon size={15} className={
                currentInsight.type === "success" ? "text-emerald-400" :
                currentInsight.type === "warning" ? "text-amber-400" : "text-red-400"
              } />
            </div>
            <p className="text-sm text-foreground flex-1 font-medium leading-snug">{currentInsight.text}</p>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Daily Goal Progress */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] tracking-[0.2em] text-muted-foreground font-medium">DAILY GOAL</span>
          <span className={`text-xs font-semibold ${goalOnTrack ? "text-emerald-400" : "text-red-400"}`}>
            {goalActual}h / {goalTarget}h
          </span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${goalPercent}%` }}
            transition={{ delay: 1, duration: 1, ease: "easeOut" }}
            className={`h-full rounded-full ${goalOnTrack
              ? "bg-gradient-to-r from-emerald-600 to-emerald-400"
              : "bg-gradient-to-r from-red-600 to-red-400"
            }`}
            style={{
              boxShadow: goalOnTrack
                ? "0 0 12px hsla(140, 70%, 45%, 0.4)"
                : "0 0 12px hsla(0, 72%, 51%, 0.4)",
            }}
          />
        </div>
      </motion.div>

      {/* Divider */}
      <div className="h-px bg-border mx-2 mb-5" />

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="flex items-center justify-around mb-6"
      >
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1">
            <span className="font-display text-2xl font-bold text-foreground">{streak}</span>
            <Flame size={streak >= 14 ? 22 : streak >= 7 ? 18 : 14} className={`${streakColors[streakLevel]} transition-all`} />
          </div>
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
          <span className="text-[10px] tracking-[0.2em] text-muted-foreground mt-1">SAVED HOURS</span>
        </div>
      </motion.div>

      {/* Floating Focus Session CTA */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        whileTap={{ scale: 0.95 }}
        onClick={onOpenTimer}
        className="w-full py-4 rounded-full bg-foreground text-primary-foreground font-semibold text-sm tracking-wide flex items-center justify-center gap-2"
        style={{ boxShadow: "0 0 25px hsla(0, 0%, 100%, 0.15)" }}
      >
        <Zap size={16} />
        Start Focus Session
      </motion.button>
    </motion.div>
  );
};

export default HomeScreen;
