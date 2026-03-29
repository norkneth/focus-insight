import { ArrowLeft, Flame, Trophy, Medal } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const tabs = ["DAY", "WEEK", "ALL"] as const;

const dayData = [
  { rank: 1, name: "S. Tanaka", score: 99.1, streak: 21 },
  { rank: 2, name: "Erikson.v", score: 97.8, streak: 18 },
  { rank: 3, name: "Elena.D", score: 95.2, streak: 14 },
  { rank: 4, name: "You", score: 93.5, streak: 12, isUser: true },
  { rank: 5, name: "Marcus_A", score: 91.0, streak: 9 },
  { rank: 6, name: "J. Miller", score: 88.4, streak: 7 },
  { rank: 7, name: "K. Chen", score: 85.1, streak: 5 },
];

const weekData = [
  { rank: 1, name: "Erikson.v", score: 98.2, streak: 21 },
  { rank: 2, name: "S. Tanaka", score: 97.5, streak: 18 },
  { rank: 3, name: "You", score: 96.8, streak: 12, isUser: true },
  { rank: 4, name: "Marcus_A", score: 94.1, streak: 9 },
  { rank: 5, name: "Elena.D", score: 92.9, streak: 14 },
  { rank: 6, name: "J. Miller", score: 91.0, streak: 7 },
  { rank: 7, name: "K. Chen", score: 89.4, streak: 5 },
];

const allData = [
  { rank: 1, name: "Erikson.v", score: 97.9, streak: 21 },
  { rank: 2, name: "Elena.D", score: 96.3, streak: 14 },
  { rank: 3, name: "S. Tanaka", score: 95.8, streak: 18 },
  { rank: 4, name: "You", score: 94.2, streak: 12, isUser: true },
  { rank: 5, name: "Marcus_A", score: 93.0, streak: 9 },
  { rank: 6, name: "K. Chen", score: 90.7, streak: 5 },
  { rank: 7, name: "J. Miller", score: 88.5, streak: 7 },
];

const dataMap = { DAY: dayData, WEEK: weekData, ALL: allData };

const rankColors: Record<number, string> = {
  1: "text-yellow-400",
  2: "text-gray-400",
  3: "text-amber-600",
};

const LeaderboardScreen = () => {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("WEEK");
  const data = dataMap[activeTab];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="min-h-screen bg-background flex flex-col pb-28"
    >
      {/* Header */}
      <div className="flex items-center justify-center px-6 pt-6 pb-4 relative">
        <h1 className="text-sm tracking-[0.3em] font-semibold text-foreground">LEADERBOARD</h1>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center gap-2 mx-6 mb-6 p-1 bg-secondary rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 text-xs tracking-[0.15em] py-2.5 rounded-lg transition-all duration-300 font-semibold ${
              activeTab === tab
                ? "bg-foreground text-primary-foreground"
                : "text-muted-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Top 3 Podium */}
      <div className="flex items-end justify-center gap-3 px-6 mb-6">
        {[1, 0, 2].map((idx) => {
          const entry = data[idx];
          if (!entry) return null;
          const isCenter = idx === 0;
          return (
            <motion.div
              key={entry.rank}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className={`flex flex-col items-center ${isCenter ? "mb-2" : ""}`}
            >
              <div className={`w-${isCenter ? "16" : "12"} h-${isCenter ? "16" : "12"} rounded-full bg-secondary border-2 ${
                entry.rank === 1 ? "border-yellow-400" : entry.rank === 2 ? "border-gray-400" : "border-amber-600"
              } flex items-center justify-center mb-2`}
                style={{ width: isCenter ? 64 : 48, height: isCenter ? 64 : 48 }}
              >
                <span className="font-display text-lg font-bold text-foreground">
                  {entry.name.charAt(0)}
                </span>
              </div>
              {entry.rank === 1 && <Trophy size={14} className="text-yellow-400 mb-1" />}
              {entry.rank === 2 && <Medal size={12} className="text-gray-400 mb-1" />}
              {entry.rank === 3 && <Medal size={12} className="text-amber-600 mb-1" />}
              <span className={`text-xs font-medium ${entry.isUser ? "text-foreground" : "text-muted-foreground"}`}>
                {entry.name}
              </span>
              <span className="font-display text-sm font-bold text-foreground">{entry.score}</span>
            </motion.div>
          );
        })}
      </div>

      <div className="h-px bg-border mx-6 mb-2" />

      {/* Rest of the list */}
      <div className="flex flex-col px-6">
        {data.slice(3).map((entry, idx) => (
          <motion.div
            key={entry.rank}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + idx * 0.06, duration: 0.3 }}
            className={`flex items-center py-4 border-b border-border transition-all duration-300 ${
              entry.isUser
                ? "bg-foreground text-primary-foreground rounded-xl px-4 -mx-4 border-none shadow-lg shadow-white/5"
                : ""
            }`}
          >
            <span className={`font-display text-lg font-bold w-10 ${
              entry.isUser ? "text-primary-foreground" : "text-muted-foreground"
            }`}>
              {String(entry.rank).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-2 flex-1">
              <span className={`text-sm font-medium ${entry.isUser ? "text-primary-foreground" : "text-foreground"}`}>
                {entry.name}
              </span>
              {entry.streak >= 10 && (
                <Flame size={14} className={entry.isUser ? "text-primary-foreground" : "text-orange-400"} />
              )}
            </div>
            <span className={`font-display text-base font-semibold ${
              entry.isUser ? "text-primary-foreground" : "text-foreground"
            }`}>
              {entry.score}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default LeaderboardScreen;
