import { motion } from "framer-motion";
import { BarChart2, Bell, Activity, Check } from "lucide-react";
import { useState } from "react";

interface PermissionScreenProps {
  onContinue: () => void;
}

const permissions = [
  {
    icon: BarChart2,
    title: "Usage Access",
    desc: "Track screen time and app usage",
    critical: true,
  },
  {
    icon: Bell,
    title: "Notification Access",
    desc: "Send insights and reminders",
    critical: false,
  },
  {
    icon: Activity,
    title: "Background Activity",
    desc: "Analyze behavior throughout the day",
    critical: false,
  },
];

const PermissionScreen = ({ onContinue }: PermissionScreenProps) => {
  const [granted, setGranted] = useState<Set<number>>(new Set());

  const handleAllow = (idx: number) => {
    setGranted((prev) => {
      const next = new Set(prev);
      next.add(idx);
      return next;
    });
  };

  const allGranted = granted.size === permissions.length;

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 pt-10 pb-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-display text-2xl font-bold text-foreground mb-2">
          One more thing
        </h1>
        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          To give you accurate insights, we need access to your usage data. Your data stays on your device.
        </p>
      </motion.div>

      <div className="flex flex-col gap-4 flex-1">
        {permissions.map((perm, idx) => {
          const Icon = perm.icon;
          const isGranted = granted.has(idx);
          return (
            <motion.div
              key={perm.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.12, duration: 0.4 }}
              className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                isGranted ? "border-foreground/30 bg-secondary" : "border-border bg-secondary/30"
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                isGranted ? "bg-foreground" : "bg-accent"
              }`}>
                {isGranted ? (
                  <Check size={18} className="text-primary-foreground" />
                ) : (
                  <Icon size={18} className="text-muted-foreground" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{perm.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{perm.desc}</p>
              </div>
              {!isGranted && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAllow(idx)}
                  className="px-4 py-2 rounded-full bg-foreground text-primary-foreground text-xs font-semibold tracking-wide"
                >
                  Allow
                </motion.button>
              )}
            </motion.div>
          );
        })}
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: allGranted ? 1 : 0.3 }}
        whileTap={allGranted ? { scale: 0.97 } : {}}
        onClick={allGranted ? onContinue : undefined}
        className="w-full py-4 rounded-full bg-foreground text-primary-foreground font-semibold text-sm tracking-wide mt-8 transition-opacity duration-300"
      >
        Continue
      </motion.button>
    </div>
  );
};

export default PermissionScreen;
