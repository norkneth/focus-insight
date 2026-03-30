import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, RotateCcw, Minus, Plus } from "lucide-react";

interface FocusTimerProps {
  onClose: () => void;
}

const PRESETS = [15, 25, 45, 60];

const FocusTimer = ({ onClose }: FocusTimerProps) => {
  const [duration, setDuration] = useState(25); // minutes
  const [timeLeft, setTimeLeft] = useState(25 * 60); // seconds
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!hasStarted) {
      setTimeLeft(duration * 60);
    }
  }, [duration, hasStarted]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            setIsRunning(false);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    setIsRunning(true);
    setHasStarted(true);
  };

  const handlePause = () => setIsRunning(false);

  const handleReset = () => {
    setIsRunning(false);
    setHasStarted(false);
    setTimeLeft(duration * 60);
  };

  const totalSeconds = duration * 60;
  const progress = hasStarted ? (totalSeconds - timeLeft) / totalSeconds : 0;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const radius = 120;
  const stroke = 3;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - progress * circumference;

  const isComplete = timeLeft === 0 && hasStarted;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center"
    >
      {/* Close */}
      <button onClick={onClose} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
        <X size={18} className="text-muted-foreground" />
      </button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-[10px] tracking-[0.3em] text-muted-foreground mb-8"
      >
        FOCUS SESSION
      </motion.p>

      {/* Ring */}
      <div className="relative flex items-center justify-center" style={{ width: 280, height: 280 }}>
        <svg className="absolute -rotate-90" width={280} height={280}>
          <circle cx={140} cy={140} r={radius} fill="none" stroke="hsl(var(--border))" strokeWidth={stroke} opacity={0.3} />
          <circle
            cx={140} cy={140} r={radius}
            fill="none"
            stroke={isComplete ? "hsl(140, 70%, 50%)" : "hsl(var(--foreground))"}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            className="transition-all duration-1000 ease-linear"
            style={{ filter: `drop-shadow(0 0 8px ${isComplete ? "hsla(140,70%,50%,0.4)" : "hsla(0,0%,100%,0.2)"})` }}
          />
        </svg>

        <div className="flex flex-col items-center justify-center">
          <span className="font-display text-6xl font-bold text-foreground tabular-nums">
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </span>
          {isComplete && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs mt-2 font-medium"
              style={{ color: "hsl(140, 70%, 50%)" }}
            >
              Session Complete!
            </motion.p>
          )}
        </div>
      </div>

      {/* Duration adjuster (only when not started) */}
      {!hasStarted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mt-8 gap-4"
        >
          <div className="flex items-center gap-6">
            <button
              onClick={() => setDuration(Math.max(5, duration - 5))}
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center active:scale-90 transition-transform"
            >
              <Minus size={16} className="text-muted-foreground" />
            </button>
            <span className="font-display text-lg font-semibold text-foreground w-16 text-center">
              {duration} min
            </span>
            <button
              onClick={() => setDuration(Math.min(120, duration + 5))}
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center active:scale-90 transition-transform"
            >
              <Plus size={16} className="text-muted-foreground" />
            </button>
          </div>

          <div className="flex gap-2">
            {PRESETS.map((p) => (
              <button
                key={p}
                onClick={() => setDuration(p)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  duration === p
                    ? "bg-foreground text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {p}m
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Controls */}
      <div className="flex items-center gap-4 mt-10">
        {hasStarted && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleReset}
            className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center"
          >
            <RotateCcw size={20} className="text-muted-foreground" />
          </motion.button>
        )}

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={isRunning ? handlePause : handleStart}
          className="w-16 h-16 rounded-full bg-foreground flex items-center justify-center"
        >
          {isRunning ? (
            <Pause size={24} className="text-primary-foreground" />
          ) : (
            <Play size={24} className="text-primary-foreground ml-1" />
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FocusTimer;
