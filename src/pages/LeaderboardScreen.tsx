import { ArrowLeft, Flame } from "lucide-react";
import { useState } from "react";

const tabs = ["DAY", "WEEK", "ALL"] as const;

const leaderboardData = [
  { rank: 1, name: "Erikson.v", score: 98.2, streak: 21 },
  { rank: 2, name: "S. Tanaka", score: 97.5, streak: 18 },
  { rank: 3, name: "You", score: 96.8, streak: 12, isUser: true },
  { rank: 4, name: "Marcus_A", score: 94.1, streak: 9 },
  { rank: 5, name: "Elena.D", score: 92.9, streak: 14 },
  { rank: 6, name: "J. Miller", score: 91.0, streak: 7 },
  { rank: 7, name: "K. Chen", score: 89.4, streak: 5 },
];

interface LeaderboardScreenProps {
  onBack?: () => void;
}

const LeaderboardScreen = ({ onBack }: LeaderboardScreenProps) => {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("WEEK");

  return (
    <div className="min-h-screen bg-background flex flex-col pb-28">
      {/* Header */}
      <div className="flex items-center justify-center px-6 pt-6 pb-4 relative">
        {onBack && (
          <button onClick={onBack} className="absolute left-6">
            <ArrowLeft size={22} className="text-foreground" />
          </button>
        )}
        <h1 className="text-sm tracking-[0.3em] font-semibold text-foreground">LEADERBOARD</h1>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center gap-8 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-xs tracking-[0.2em] pb-2 transition-all duration-300 ${
              activeTab === tab
                ? "text-foreground border-b-2 border-foreground font-semibold"
                : "text-muted-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex flex-col px-6">
        {leaderboardData.map((entry) => (
          <div
            key={entry.rank}
            className={`flex items-center py-5 border-b border-border transition-all duration-300 ${
              entry.isUser
                ? "bg-foreground text-primary-foreground rounded-lg px-4 -mx-4 border-none shadow-lg shadow-white/5"
                : ""
            }`}
          >
            <span
              className={`font-display text-lg font-bold w-12 ${
                entry.isUser ? "text-primary-foreground" : "text-foreground"
              }`}
            >
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
            <span
              className={`font-display text-base font-semibold ${
                entry.isUser ? "text-primary-foreground" : "text-foreground"
              }`}
            >
              {entry.score}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardScreen;
