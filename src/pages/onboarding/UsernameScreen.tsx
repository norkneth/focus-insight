import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Loader2, Sparkles } from "lucide-react";

interface UsernameScreenProps {
  onComplete: (username: string) => void;
}

const TAKEN_USERNAMES = [
  "sensai", "focus", "tanaka", "erikson", "elena", "marcus", "miller", "chen",
  "ninja", "pro", "legend", "alpha", "beast", "king", "queen", "master"
];

const generateSuggestions = (base: string): string[] => {
  const suffixes = ["_x", "2k", "_pro", ".go", "_hq"];
  return suffixes.map(s => `${base}${s}`).slice(0, 3);
};

const UsernameScreen = ({ onComplete }: UsernameScreenProps) => {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "available" | "taken">("idle");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (!input.trim()) {
      setStatus("idle");
      setSuggestions([]);
      return;
    }
    setStatus("checking");
    const timer = setTimeout(() => {
      setDebouncedValue(input.trim().toLowerCase());
    }, 600);
    return () => clearTimeout(timer);
  }, [input]);

  useEffect(() => {
    if (!debouncedValue) return;
    const isTaken = TAKEN_USERNAMES.includes(debouncedValue);
    setStatus(isTaken ? "taken" : "available");
    if (isTaken) {
      setSuggestions(generateSuggestions(debouncedValue));
    } else {
      setSuggestions([]);
    }
  }, [debouncedValue]);

  const statusColor = {
    idle: "border-border",
    checking: "border-muted-foreground",
    available: "border-emerald-500",
    taken: "border-red-500",
  };

  const canContinue = status === "available" && input.trim().length >= 2;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm flex flex-col items-center"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[10px] tracking-[0.3em] text-muted-foreground mb-3"
        >
          CHOOSE YOUR IDENTITY
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-display text-3xl font-bold text-foreground mb-2 text-center"
        >
          Pick a username
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-muted-foreground mb-10 text-center"
        >
          This is how others will see you on the leaderboard
        </motion.p>

        {/* Input */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className={`w-full relative border-2 rounded-2xl bg-card transition-all duration-300 ${statusColor[status]}`}
          style={{
            boxShadow: status === "available" ? "0 0 20px hsla(140, 70%, 45%, 0.15)" :
              status === "taken" ? "0 0 20px hsla(0, 72%, 51%, 0.15)" : "none",
          }}
        >
          <div className="flex items-center px-4 py-4">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value.replace(/[^a-zA-Z0-9_]/g, "").slice(0, 16))}
              placeholder="username"
              className="bg-transparent text-foreground font-display text-xl font-semibold flex-1 focus:outline-none placeholder:text-muted-foreground/40"
              autoFocus
            />
            <span className="text-muted-foreground font-display text-xl font-semibold">.t1</span>
            <div className="ml-3 w-6 h-6 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {status === "checking" && (
                  <motion.div key="check" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Loader2 size={18} className="text-muted-foreground animate-spin" />
                  </motion.div>
                )}
                {status === "available" && (
                  <motion.div key="ok" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ opacity: 0 }}>
                    <Check size={18} className="text-emerald-400" />
                  </motion.div>
                )}
                {status === "taken" && (
                  <motion.div key="no" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ opacity: 0 }}>
                    <X size={18} className="text-red-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Live preview */}
        {input.trim() && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 flex items-center gap-1.5"
          >
            <span className="text-[10px] text-muted-foreground tracking-wide">Preview:</span>
            <span className="font-display text-sm font-semibold text-foreground">
              {input.toLowerCase()}.t1
            </span>
          </motion.div>
        )}

        {/* Status message */}
        <div className="h-6 mt-2 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {status === "available" && (
              <motion.p key="avail" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="text-xs font-medium text-emerald-400">
                ✓ {input.toLowerCase()}.t1 is available!
              </motion.p>
            )}
            {status === "taken" && (
              <motion.p key="taken" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="text-xs font-medium text-red-500">
                ✗ Username already taken
              </motion.p>
            )}
            {status === "checking" && (
              <motion.p key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-xs text-muted-foreground">
                Checking availability...
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Suggestions when taken */}
        <AnimatePresence>
          {status === "taken" && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="w-full mt-2 overflow-hidden"
            >
              <div className="flex items-center gap-1.5 mb-2">
                <Sparkles size={12} className="text-muted-foreground" />
                <span className="text-[10px] tracking-[0.2em] text-muted-foreground">SUGGESTIONS</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {suggestions.map((s) => (
                  <motion.button
                    key={s}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setInput(s)}
                    className="px-3 py-1.5 rounded-full bg-secondary border border-border text-xs text-foreground font-medium hover:bg-accent transition-colors"
                  >
                    {s}.t1
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: canContinue ? 1 : 0.3, y: 0 }}
          transition={{ delay: 0.6 }}
          whileTap={canContinue ? { scale: 0.97 } : {}}
          disabled={!canContinue}
          onClick={() => onComplete(`${input.trim().toLowerCase()}.t1`)}
          className="w-full mt-6 py-4 rounded-full bg-foreground text-primary-foreground font-semibold text-sm tracking-wide disabled:cursor-not-allowed"
          style={canContinue ? { boxShadow: "0 0 20px hsla(0, 0%, 100%, 0.12)" } : {}}
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  );
};

export default UsernameScreen;
