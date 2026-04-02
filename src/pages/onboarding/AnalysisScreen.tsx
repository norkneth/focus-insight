import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AnalysisScreenProps {
  onComplete: () => void;
}

const steps = [
  { text: "Fetching screen time data...", psych: "Scanning your digital footprint" },
  { text: "Detecting distraction patterns...", psych: "Identifying your dopamine triggers" },
  { text: "Analyzing behavior patterns...", psych: "Mapping your focus windows" },
  { text: "Calculating your Focus Score...", psych: "Building your performance profile" },
];

const AnalysisScreen = ({ onComplete }: AnalysisScreenProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = 5000;
    const stepDuration = totalDuration / steps.length;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(elapsed / totalDuration, 1);
      setProgress(p * 100);
      setCurrentStep(Math.min(Math.floor(elapsed / stepDuration), steps.length - 1));

      if (p >= 1) {
        clearInterval(interval);
        setTimeout(onComplete, 600);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  const radius = 80;
  const stroke = 3;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (progress / 100) * circumference;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-8">
      {/* Glowing ring with pulse */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative mb-10"
      >
        {/* Pulse glow behind */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            animation: "pulse-glow 2s ease-in-out infinite",
            margin: -10,
          }}
        />

        <svg width={200} height={200} className="-rotate-90">
          <circle
            cx={100} cy={100} r={radius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth={stroke}
            opacity={0.3}
          />
          <circle
            cx={100} cy={100} r={radius}
            fill="none"
            stroke="hsl(var(--foreground))"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{
              transition: "stroke-dashoffset 0.3s ease-out",
              filter: "drop-shadow(0 0 14px hsla(0, 0%, 100%, 0.3))",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-2xl font-bold text-foreground">
            {Math.round(progress)}%
          </span>
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="font-display text-xl font-bold text-foreground mb-2 text-center"
      >
        Analyzing your behavior...
      </motion.h2>

      <p className="text-xs text-muted-foreground mb-2 text-center tracking-wide">
        Fetching your last 7 days of screen time
      </p>

      {/* Psychological sub-message */}
      <motion.p
        key={currentStep}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 0.6, y: 0 }}
        className="text-[10px] text-muted-foreground mb-8 text-center italic tracking-wide"
      >
        {steps[currentStep].psych}
      </motion.p>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        {steps.map((step, idx) => (
          <motion.div
            key={step.text}
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: idx <= currentStep ? 1 : 0.3,
              x: 0,
            }}
            transition={{ delay: 0.1 + idx * 0.15, duration: 0.3 }}
            className="flex items-center gap-3"
          >
            <div className="relative">
              <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 ${
                idx < currentStep ? "bg-emerald-400" :
                idx === currentStep ? "bg-foreground" : "bg-muted-foreground"
              }`} />
              {idx === currentStep && (
                <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-foreground animate-ping opacity-30" />
              )}
            </div>
            <span className={`text-xs transition-colors duration-500 ${
              idx <= currentStep ? "text-foreground" : "text-muted-foreground"
            }`}>
              {step.text}
            </span>
            {idx < currentStep && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-emerald-400 text-xs ml-auto"
              >
                ✓
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AnalysisScreen;
