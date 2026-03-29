import { ArrowLeft, Moon, Globe, Info, FileText, HelpCircle, Volume2, Vibrate, Clock } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface SettingsScreenProps {
  onBack: () => void;
}

const SettingsScreen = ({ onBack }: SettingsScreenProps) => {
  const [darkMode, setDarkMode] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [haptics, setHaptics] = useState(true);

  const Toggle = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!value)}
      className={`w-12 h-7 rounded-full transition-all duration-300 relative ${
        value ? "bg-foreground" : "bg-secondary"
      }`}
    >
      <div className={`absolute top-1 w-5 h-5 rounded-full transition-all duration-300 ${
        value ? "left-6 bg-primary-foreground" : "left-1 bg-muted-foreground"
      }`} />
    </button>
  );

  const items = [
    { icon: Moon, label: "Dark Mode", toggle: true, value: darkMode, onChange: setDarkMode },
    { icon: Volume2, label: "Sound Effects", toggle: true, value: soundEffects, onChange: setSoundEffects },
    { icon: Vibrate, label: "Haptic Feedback", toggle: true, value: haptics, onChange: setHaptics },
    { icon: Clock, label: "Time Format", value: "24h", toggle: false },
    { icon: Globe, label: "Language", value: "English", toggle: false },
    { icon: Info, label: "About T1", toggle: false },
    { icon: FileText, label: "Privacy Policy", toggle: false },
    { icon: HelpCircle, label: "Help & Support", toggle: false },
  ];

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="min-h-screen bg-background flex flex-col pb-28"
    >
      <div className="flex items-center justify-center px-6 pt-6 pb-4 relative">
        <button onClick={onBack} className="absolute left-6">
          <ArrowLeft size={22} className="text-foreground" />
        </button>
        <h1 className="text-sm tracking-[0.3em] font-semibold text-foreground">SETTINGS</h1>
      </div>

      <div className="px-6 mt-4">
        <p className="text-[10px] tracking-[0.25em] text-muted-foreground mb-4">GENERAL</p>
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-center py-4 border-b border-border"
            >
              <Icon size={18} className="text-muted-foreground mr-4" />
              <span className="text-sm text-foreground flex-1">{item.label}</span>
              {item.toggle ? (
                <Toggle value={item.value as boolean} onChange={item.onChange as (v: boolean) => void} />
              ) : item.value ? (
                <span className="text-sm text-muted-foreground">{item.value as string}</span>
              ) : null}
            </motion.div>
          );
        })}

        <p className="text-[10px] tracking-[0.25em] text-muted-foreground mt-8 mb-4">APP</p>
        <div className="flex flex-col items-center py-6">
          <span className="font-display text-lg font-bold text-foreground">T1.</span>
          <span className="text-[10px] text-muted-foreground mt-1">Version 1.0.0</span>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsScreen;
