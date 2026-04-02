import { ArrowLeft, Moon, Globe, Info, FileText, HelpCircle, Volume2, Vibrate, Clock, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SettingsScreenProps {
  onBack: () => void;
}

const SettingsScreen = ({ onBack }: SettingsScreenProps) => {
  const [darkMode, setDarkMode] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [haptics, setHaptics] = useState(true);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const Toggle = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!value)}
      className={`w-12 h-7 rounded-full transition-all duration-300 relative ${
        value ? "bg-foreground" : "bg-secondary"
      }`}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`absolute top-1 w-5 h-5 rounded-full ${
          value ? "left-6 bg-primary-foreground" : "left-1 bg-muted-foreground"
        }`}
      />
    </button>
  );

  const generalItems = [
    { icon: Moon, label: "Dark Mode", toggle: true, value: darkMode, onChange: setDarkMode },
    { icon: Volume2, label: "Sound Effects", toggle: true, value: soundEffects, onChange: setSoundEffects },
    { icon: Vibrate, label: "Haptic Feedback", toggle: true, value: haptics, onChange: setHaptics },
    { icon: Clock, label: "Time Format", value: "24h", toggle: false },
    { icon: Globe, label: "Language", value: "English", toggle: false },
  ];

  const appItems = [
    { icon: Info, label: "About T1", toggle: false },
    { icon: FileText, label: "Privacy Policy", toggle: false },
    { icon: HelpCircle, label: "Help & Support", toggle: false },
  ];

  const renderItem = (item: any, idx: number, startDelay: number) => {
    const Icon = item.icon;
    return (
      <motion.div
        key={item.label}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: startDelay + idx * 0.04 }}
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
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="min-h-screen bg-background flex flex-col pb-28"
    >
      <div className="flex items-center justify-center px-6 pt-6 pb-4 relative">
        <button onClick={onBack} className="absolute left-6 active:scale-90 transition-transform">
          <ArrowLeft size={22} className="text-foreground" />
        </button>
        <h1 className="text-sm tracking-[0.3em] font-semibold text-foreground">SETTINGS</h1>
      </div>

      <div className="px-6 mt-4">
        {/* General Group */}
        <p className="text-[10px] tracking-[0.25em] text-muted-foreground mb-4">GENERAL</p>
        {generalItems.map((item, idx) => renderItem(item, idx, 0.05))}

        {/* App Group */}
        <p className="text-[10px] tracking-[0.25em] text-muted-foreground mt-8 mb-4">APP</p>
        {appItems.map((item, idx) => renderItem(item, idx, 0.3))}

        {/* Danger Zone */}
        <p className="text-[10px] tracking-[0.25em] text-red-400/70 mt-8 mb-4">DANGER ZONE</p>
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowResetConfirm(true)}
          className="flex items-center py-4 border-b border-red-500/20 w-full"
        >
          <AlertTriangle size={18} className="text-red-400 mr-4" />
          <span className="text-sm text-red-400">Reset All Progress</span>
        </motion.button>

        {/* App info */}
        <div className="flex flex-col items-center py-8">
          <span className="font-display text-lg font-bold text-foreground">T1.</span>
          <span className="text-[10px] text-muted-foreground mt-1">Version 1.0.0</span>
        </div>
      </div>

      {/* Reset Confirmation */}
      <AnimatePresence>
        {showResetConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center px-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card border border-red-500/20 rounded-2xl p-6 w-full max-w-sm"
            >
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={18} className="text-red-400" />
                <h3 className="font-display text-lg font-bold text-foreground">Reset Progress?</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                This will permanently erase your streak, focus score, and all session data. This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-3 rounded-full border border-border text-foreground text-sm font-medium">Cancel</button>
                <button onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-3 rounded-full bg-red-500 text-foreground text-sm font-semibold">Reset</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SettingsScreen;
