import { Flame, Trophy, Medal } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const tabs = ["DAY", "WEEK", "ALL"] as const;

const generateUsers = (seed: number) => {
  const names = [
    "S.Tanaka", "Erikson.v", "Elena.D", "Marcus_A", "J.Miller", "K.Chen",
    "Nora.F", "R.Patel", "Zain.K", "Lily.W", "Omar.S", "Ava.J",
    "Dex.M", "Priya.R", "Leo.T", "Sam.B", "Rina.G", "Jay.H",
    "Milo.C", "Kira.N", "Hugo.L", "Zara.V", "Axel.D", "Nina.P",
    "Rex.Q", "Cleo.A", "Finn.O", "Ivy.Z", "Jude.E", "Lana.X",
    "Theo.W", "Maya.S", "Ravi.K", "Elle.B", "Nash.G", "Skye.F",
    "Drew.H", "Luna.M", "Kai.R", "Jade.T", "Beau.L", "Wren.C",
    "Cole.J", "Aria.N", "Troy.P", "Sage.V", "Rhys.D", "Tara.Q",
    "Blake.A", "Faye.O"
  ];
  const users = names.map((name, i) => ({
    rank: i + 1,
    name: `${name}.t1`,
    score: Math.round((99.5 - i * 0.9 - (seed * (i + 1) % 5) * 0.3) * 10) / 10,
    streak: Math.max(1, 25 - i + (seed * i % 7)),
    percentile: `top ${Math.max(1, Math.round((i + 1) / 50 * 100))}%`,
    isUser: false,
  }));
  // Insert user at different positions
  const userRank = seed === 0 ? 4 : seed === 1 ? 3 : 4;
  users.splice(userRank - 1, 0, {
    rank: userRank,
    name: "You",
    score: Math.round((99.5 - (userRank - 1) * 0.9) * 10) / 10,
    streak: 12,
    percentile: `top ${Math.max(1, Math.round(userRank / 50 * 100))}%`,
    isUser: true,
  });
  // Re-rank
  return users.slice(0, 51).map((u, i) => ({ ...u, rank: i + 1 }));
};

const dayData = generateUsers(0);
const weekData = generateUsers(1);
const allData = generateUsers(2);

const dataMap = { DAY: dayData, WEEK: weekData, ALL: allData };

// Simulate user being outside top 50
const getUserEntry = (data: typeof dayData) => {
  const userInTop = data.find((d) => d.isUser && d.rank <= 50);
  if (userInTop) return null;
  return { rank: 1125, name: "You", score: 72.4, streak: 12, percentile: "top 24%", isUser: true };
};

interface LeaderboardScreenProps {
  username?: string;
}

const LeaderboardScreen = ({ username = "You" }: LeaderboardScreenProps) => {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("WEEK");
  const data = dataMap[activeTab];
  const top3 = data.slice(0, 3);
  const rest = data.slice(3, 50);
  const userOutside = getUserEntry(data);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="min-h-screen bg-background flex flex-col pb-28"
    >
      {/* Header */}
      <div className="flex items-center justify-center px-6 pt-6 pb-4">
        <h1 className="text-sm tracking-[0.3em] font-semibold text-foreground">LEADERBOARD</h1>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center gap-2 mx-6 mb-6 p-1 bg-secondary rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 text-xs tracking-[0.15em] py-2.5 rounded-lg transition-all duration-300 font-semibold ${
              activeTab === tab ? "bg-foreground text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Top 3 Podium */}
      <div className="flex items-end justify-center gap-3 px-6 mb-6">
        {[1, 0, 2].map((idx) => {
          const entry = top3[idx];
          if (!entry) return null;
          const isCenter = idx === 0;
          const borderColor = entry.rank === 1 ? "border-yellow-400" : entry.rank === 2 ? "border-gray-400" : "border-amber-600";
          return (
            <motion.div
              key={`${activeTab}-${entry.rank}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className={`flex flex-col items-center ${isCenter ? "mb-2" : ""}`}
            >
              <div
                className={`rounded-full bg-secondary border-2 ${borderColor} flex items-center justify-center mb-2`}
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
              <span className="text-[9px] text-muted-foreground">{entry.percentile}</span>
              <span className="font-display text-sm font-bold text-foreground">{entry.score}</span>
            </motion.div>
          );
        })}
      </div>

      <div className="h-px bg-border mx-6 mb-2" />

      {/* List */}
      <div className="flex flex-col px-6 overflow-y-auto">
        {rest.map((entry, idx) => (
          <motion.div
            key={`${activeTab}-${entry.rank}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + idx * 0.02, duration: 0.25 }}
            className={`flex items-center py-3.5 border-b border-border transition-all duration-300 ${
              entry.isUser
                ? "bg-foreground text-primary-foreground rounded-xl px-4 -mx-4 border-none shadow-lg shadow-white/5"
                : ""
            }`}
          >
            <span className={`font-display text-base font-bold w-10 ${
              entry.isUser ? "text-primary-foreground" : "text-muted-foreground"
            }`}>
              {String(entry.rank).padStart(2, "0")}
            </span>
            <div className="flex flex-col flex-1">
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium ${entry.isUser ? "text-primary-foreground" : "text-foreground"}`}>
                  {entry.name}
                </span>
                {entry.streak >= 10 && (
                  <Flame size={13} className={entry.isUser ? "text-primary-foreground" : "text-orange-400"} />
                )}
              </div>
              <span className={`text-[10px] ${entry.isUser ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                {entry.percentile}
              </span>
            </div>
            <span className={`font-display text-sm font-semibold ${
              entry.isUser ? "text-primary-foreground" : "text-foreground"
            }`}>
              {entry.score}
            </span>
          </motion.div>
        ))}

        {/* User outside top 50 */}
        {userOutside && (
          <>
            <div className="flex items-center justify-center py-3 text-muted-foreground text-xs tracking-widest">
              · · ·
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center py-3.5 bg-foreground text-primary-foreground rounded-xl px-4 -mx-4 shadow-lg shadow-white/5"
            >
              <span className="font-display text-base font-bold w-12 text-primary-foreground">
                #{userOutside.rank}
              </span>
              <div className="flex flex-col flex-1">
                <span className="text-sm font-medium text-primary-foreground">{userOutside.name}</span>
                <span className="text-[10px] text-primary-foreground/60">{userOutside.percentile}</span>
              </div>
              <span className="font-display text-sm font-semibold text-primary-foreground">
                {userOutside.score}
              </span>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default LeaderboardScreen;
