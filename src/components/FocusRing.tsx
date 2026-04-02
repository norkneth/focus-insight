import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FocusRingProps {
  score: number;
  onTap?: () => void;
  showBreakdown?: boolean;
}

const breakdownData = [
  { label: "Social", value: 35, color: "hsl(0, 72%, 55%)" },
  { label: "Productive", value: 45, color: "hsl(140, 70%, 45%)" },
  { label: "Idle", value: 20, color: "hsl(var(--muted-foreground))" },
];

const FocusRing = ({ score, onTap, showBreakdown = false }: FocusRingProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(eased * score));
      if (progress < 1) requestAnimationFrame(animate);
    };
    animate();
  }, [score]);

  const radius = 130;
  const stroke = 3;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (animatedScore / 100) * circumference;

  // Breakdown arcs
  const breakdownRadius = 115;
  const breakdownStroke = 6;
  const breakdownCircumference = 2 * Math.PI * breakdownRadius;

  let accumulatedOffset = 0;

  return (
    <motion.div
      className="relative flex items-center justify-center cursor-pointer"
      style={{ width: 300, height: 300 }}
      onClick={onTap}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Outer dashed ring */}
      <svg className="absolute" width={300} height={300} style={{ animation: "ring-rotate 60s linear infinite" }}>
        <circle
          cx={150} cy={150} r={145}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth={1}
          strokeDasharray="4 8"
          opacity={0.4}
        />
      </svg>

      {/* Pulse glow layer */}
      <div
        className="absolute rounded-full"
        style={{
          width: 270, height: 270,
          animation: "pulse-glow 3s ease-in-out infinite",
        }}
      />

      {/* Score ring */}
      <svg className="absolute -rotate-90" width={300} height={300}>
        <circle cx={150} cy={150} r={radius} fill="none" stroke="hsl(var(--border))" strokeWidth={stroke} opacity={0.3} />
        <circle
          cx={150} cy={150} r={radius}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className="transition-all duration-1000 ease-out"
          style={{ filter: "drop-shadow(0 0 10px hsla(0, 0%, 100%, 0.35))" }}
        />
      </svg>

      {/* Breakdown arcs */}
      <AnimatePresence>
        {showBreakdown && (
          <motion.svg
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute -rotate-90"
            width={300} height={300}
          >
            {breakdownData.map((segment) => {
              const segDash = (segment.value / 100) * breakdownCircumference;
              const gap = breakdownCircumference - segDash;
              const offset = breakdownCircumference - accumulatedOffset * (breakdownCircumference / 100);
              accumulatedOffset += segment.value;
              return (
                <circle
                  key={segment.label}
                  cx={150} cy={150} r={breakdownRadius}
                  fill="none"
                  stroke={segment.color}
                  strokeWidth={breakdownStroke}
                  strokeLinecap="round"
                  strokeDasharray={`${segDash - 4} ${gap + 4}`}
                  strokeDashoffset={offset}
                  opacity={0.8}
                  style={{ filter: `drop-shadow(0 0 6px ${segment.color})` }}
                />
              );
            })}
          </motion.svg>
        )}
      </AnimatePresence>

      {/* Inner dark circle */}
      <div className="absolute rounded-full bg-background flex flex-col items-center justify-center"
        style={{ width: 230, height: 230 }}>
        <AnimatePresence mode="wait">
          {showBreakdown ? (
            <motion.div
              key="breakdown"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-2"
            >
              {breakdownData.map((s) => (
                <div key={s.label} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                  <span className="text-xs font-semibold text-foreground">{s.value}%</span>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="score"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <span className="font-display text-7xl font-bold text-foreground tracking-tight">
                {animatedScore}
              </span>
              <span className="text-[11px] tracking-[0.3em] text-muted-foreground mt-1 font-medium">
                FOCUS SCORE
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default FocusRing;
