import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ResultScreenProps {
  score: number;
  onContinue: () => void;
}

const ResultScreen = ({ score, onContinue }: ResultScreenProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const percentile = Math.round(score * 0.7 + Math.random() * 10);

  useEffect(() => {
    const duration = 1500;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(eased * score));
      if (progress < 1) requestAnimationFrame(animate);
    };
    const timer = setTimeout(animate, 600);
    return () => clearTimeout(timer);
  }, [score]);

  const radius = 110;
  const stroke = 3;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-8">
      {/* Score Ring */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative mb-6"
      >
        <svg width={260} height={260} className="-rotate-90">
          <circle
            cx={130} cy={130} r={radius}
            fill="none" stroke="hsl(var(--border))" strokeWidth={stroke} opacity={0.3}
          />
          <circle
            cx={130} cy={130} r={radius}
            fill="none" stroke="hsl(var(--foreground))" strokeWidth={stroke}
            strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={dashOffset}
            className="transition-all duration-1000 ease-out"
            style={{ filter: "drop-shadow(0 0 14px hsla(0,0%,100%,0.25))" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-[10px] tracking-[0.3em] text-muted-foreground mb-1"
          >
            YOUR FOCUS SCORE
          </motion.span>
          <span className="font-display text-6xl font-bold text-foreground">{animatedScore}</span>
        </div>
      </motion.div>

      {/* Percentile */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="text-sm text-muted-foreground mb-2"
      >
        You are ahead of <span className="text-foreground font-semibold">{percentile}%</span> of users
      </motion.p>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        className="flex gap-8 mt-4 mb-6"
      >
        <div className="flex flex-col items-center">
          <span className="font-display text-lg font-bold text-foreground">4.2h</span>
          <span className="text-[9px] tracking-[0.2em] text-muted-foreground mt-1">AVG SCREEN TIME</span>
        </div>
        <div className="w-px bg-border" />
        <div className="flex flex-col items-center">
          <span className="font-display text-lg font-bold text-foreground">Social</span>
          <span className="text-[9px] tracking-[0.2em] text-muted-foreground mt-1">TOP CATEGORY</span>
        </div>
      </motion.div>

      {/* Emotional line */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        className="text-xs text-muted-foreground text-center leading-relaxed mb-10 max-w-[260px]"
      >
        You're doing better than average — but there's room to improve.
      </motion.p>

      {/* CTA */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.5 }}
        whileTap={{ scale: 0.97 }}
        onClick={onContinue}
        className="w-full max-w-xs py-4 rounded-full bg-foreground text-primary-foreground font-semibold text-sm tracking-wide"
      >
        Let's Begin
      </motion.button>
    </div>
  );
};

export default ResultScreen;
