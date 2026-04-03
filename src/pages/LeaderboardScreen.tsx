import { Flame, TrendingUp, TrendingDown, Swords } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    movement: ((seed + i) % 3 === 0) ? "up" as const : ((seed + i) % 3 === 1) ? "down" as const : "same" as const,
    movementVal: ((seed + i) % 5) + 1,
  }));
  return users.slice(0, 50).map((u, i) => ({ ...u, rank: i + 1 }));
};

const dayData = generateUsers(0);
const weekData = generateUsers(1);
const allData = generateUsers(2);

const dataMap = { DAY: dayData, WEEK: weekData, ALL: allData };

const avatarColors = ["bg-yellow-500", "bg-emerald-500", "bg-red-500", "bg-blue-500", "bg-purple-500", "bg-pink-500", "bg-cyan-500", "bg-orange-500"];

interface LeaderboardScreenProps {
  username?: string;
}

const LeaderboardScreen = ({ username = "You" }: LeaderboardScreenProps) => {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("WEEK");
  const data = dataMap[activeTab];
  const top3 = data.slice(0, 3);
  const rest = data.slice(3, 50);

  const userInTop = false;
  const userEntry = {
    rank: 9,
    name: username.endsWith(".t1") ? username : `${username}.t1`,
    score: 58.0,
    streak: 12,
    percentile: "top 42%",
    badge: "Silver badge",
    movement: "down" as const,
    movementVal: 3,
  };

  const getAvatarColor = (name: string) => {
    const idx = name.charCodeAt(0) % avatarColors.length;
    return avatarColors[idx];
  };

  const getCtaLabel = (rank: number) => {
    if (rank === 1) return "CHALLENGE";
    return "COMPARE";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="min-h-screen flex flex-col pb-28"
      style={{ background: "linear-gradient(180deg, hsl(240 6% 6%) 0%, hsl(240 8% 3%) 60%)" }}
    >
      {/* Header */}
      <div className="flex flex-col items-center px-6 pt-6 pb-2">
        <span className="text-[10px] tracking-[0.3em] text-muted-foreground font-semibold mb-1">LEADERBOARD</span>
        <h1 className="font-display text-2xl font-extrabold text-foreground tracking-tight drop-shadow-sm">
          Stay hard to catch.
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center gap-0 mx-6 mt-4 mb-6 p-1 bg-surface-gradient rounded-full relative glow-sm">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 text-xs tracking-[0.12em] py-2.5 rounded-full transition-all duration-300 font-semibold relative z-10 ${
              activeTab === tab ? "text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute inset-0 bg-foreground rounded-full"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        ))}
      </div>

      {/* Top 3 Cards */}
      <div className="flex items-stretch justify-center gap-3 px-4 mb-6">
        {[1, 0, 2].map((idx) => {
          const entry = top3[idx];
          if (!entry) return null;
          const isCenter = idx === 0;
          const cardBorder = entry.rank === 1
            ? "border-yellow-500/40"
            : entry.rank === 2
            ? "border-gray-500/30"
            : "border-amber-700/30";
          const cardGlow = entry.rank === 1
            ? "0 0 20px hsla(45, 93%, 47%, 0.15)"
            : "none";

          return (
            <motion.div
              key={`${activeTab}-${entry.rank}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className={`flex-1 flex flex-col items-center card-elevated rounded-2xl py-4 px-2 ${isCenter ? "scale-[1.02]" : ""}`}
              style={{ boxShadow: cardGlow }}
            >
              {/* Avatar */}
              <div
                className={`rounded-full ${getAvatarColor(entry.name)} flex items-center justify-center mb-2`}
                style={{ width: isCenter ? 52 : 44, height: isCenter ? 52 : 44 }}
              >
                <span className="font-display text-lg font-bold text-background">
                  {entry.name.charAt(0)}
                </span>
              </div>

              <span className="text-xs font-bold text-foreground text-center leading-tight">{entry.name}</span>
              <span className="text-[9px] text-dim mt-0.5">TOP {entry.percentile.replace("top ", "")}</span>
              <span className="font-display text-xl text-bright mt-1">{entry.score}</span>

              {/* CTA */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="mt-2 flex items-center gap-1 px-3 py-1 rounded-full bg-secondary border border-border"
              >
                {entry.rank === 1 && <Swords size={10} className="text-muted-foreground" />}
                <span className="text-[9px] text-muted-foreground font-bold tracking-wide">{getCtaLabel(entry.rank)}</span>
              </motion.button>
            </motion.div>
          );
        })}
      </div>

      {/* User rank banner */}
      {!userInTop && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-6 mb-4 flex items-center justify-between card-elevated rounded-2xl px-4 py-3.5 glow-sm"
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-muted-foreground">#{userEntry.rank}</span>
              <span className="text-sm font-semibold text-foreground">{userEntry.name}</span>
            </div>
            <span className="text-[10px] text-dim tracking-wide">{userEntry.percentile} · {userEntry.badge}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-display text-xl font-bold text-foreground">{userEntry.score}</span>
            <div className="flex items-center gap-0.5">
              <TrendingDown size={10} className="text-red-400" />
              <span className="text-[9px] text-red-400 font-medium">-{userEntry.movementVal}</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* List */}
      <div className="flex flex-col px-6 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {rest.map((entry, idx) => {
              const isUserRow = entry.rank === userEntry.rank;
              return (
                <motion.div
                  key={`${activeTab}-${entry.rank}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + idx * 0.02, duration: 0.25 }}
                  className={`flex items-center py-3.5 border-b border-border ${isUserRow ? "bg-card/50 -mx-2 px-2 rounded-lg" : ""}`}
                >
                  <span className="font-display text-base font-bold w-8 text-muted-foreground">
                    {entry.rank}
                  </span>

                  <div className="flex flex-col flex-1 ml-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{entry.name}</span>
                      {/* Movement indicator inline */}
                      {entry.movement === "up" && (
                        <span className="flex items-center gap-0.5">
                          <TrendingUp size={10} className="text-emerald-400" />
                          <span className="text-[9px] text-emerald-400 font-medium">+{entry.movementVal}</span>
                        </span>
                      )}
                      {entry.movement === "down" && (
                        <span className="flex items-center gap-0.5">
                          <TrendingDown size={10} className="text-red-400" />
                          <span className="text-[9px] text-red-400 font-medium">-{entry.movementVal}</span>
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-muted-foreground">top {entry.percentile.replace("top ", "")} performer</span>
                  </div>

                  <span className="font-display text-base font-bold text-foreground">{entry.score}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default LeaderboardScreen;
