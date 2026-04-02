import { ArrowLeft, Settings, Bell, Timer, Shield, LogOut, Pencil, Award, Flame, TrendingUp, Star, Zap } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface ProfileScreenProps {
  onBack?: () => void;
  onSettings?: () => void;
  username?: string;
}

const weeklyScores = [72, 68, 75, 80, 78, 85, 82];
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const achievements = [
  { icon: Flame, label: "7 Day Streak", unlocked: true },
  { icon: Star, label: "Top 10% Performer", unlocked: true },
  { icon: Zap, label: "100 Focus Hours", unlocked: true },
  { icon: Award, label: "Elite Rank", unlocked: false },
];

const ProfileScreen = ({ onBack, onSettings, username: usernameProp }: ProfileScreenProps) => {
  const [focusReminders, setFocusReminders] = useState(false);
  const [privacyMode, setPrivacyMode] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Erik Vance");
  const [title, setTitle] = useState("Deep Work Enthusiast");
  const [editName, setEditName] = useState(name);
  const [editTitle, setEditTitle] = useState(title);
  const [showSignOut, setShowSignOut] = useState(false);

  const handleSaveEdit = () => {
    setName(editName);
    setTitle(editTitle);
    setIsEditing(false);
  };

  // User type badge
  const focusScore = 85;
  const userType = focusScore >= 80 ? "Focused" : focusScore >= 50 ? "Average" : "Distracted";
  const badgeColor = focusScore >= 80 ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" :
    focusScore >= 50 ? "text-amber-400 border-amber-500/30 bg-amber-500/10" :
    "text-red-400 border-red-500/30 bg-red-500/10";

  // Rank badge
  const rank = 69;
  const rankBadge = rank <= 10 ? { label: "ELITE", color: "text-purple-400" } :
    rank <= 25 ? { label: "GOLD", color: "text-yellow-400" } :
    rank <= 50 ? { label: "SILVER", color: "text-gray-400" } :
    { label: "BRONZE", color: "text-amber-600" };

  // Progress to next level
  const currentXP = 720;
  const nextLevelXP = 1000;
  const xpPercent = (currentXP / nextLevelXP) * 100;

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

  const maxScore = Math.max(...weeklyScores);

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
        {onBack && (
          <button onClick={onBack} className="absolute left-6">
            <ArrowLeft size={22} className="text-foreground" />
          </button>
        )}
        <h1 className="text-sm tracking-[0.3em] font-semibold text-foreground">PROFILE</h1>
        <button onClick={onSettings} className="absolute right-6 active:scale-90 transition-transform">
          <Settings size={20} className="text-muted-foreground" />
        </button>
      </div>

      {/* Avatar */}
      <div className="flex flex-col items-center mt-6 mb-4">
        <div className="relative">
          <div className="w-28 h-28 rounded-full bg-secondary border-2 border-border overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-muted to-secondary flex items-center justify-center">
              <span className="font-display text-3xl font-bold text-muted-foreground">
                {name.split(" ").map(n => n[0]).join("")}
              </span>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => { setEditName(name); setEditTitle(title); setIsEditing(true); }}
            className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-foreground flex items-center justify-center"
          >
            <Pencil size={14} className="text-primary-foreground" />
          </motion.button>
        </div>

        {isEditing ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center mt-4 gap-2 w-full px-10"
          >
            <input value={editName} onChange={(e) => setEditName(e.target.value)}
              className="bg-secondary border border-border rounded-lg px-3 py-2 text-foreground text-center font-display text-lg font-bold w-full focus:outline-none focus:border-foreground/50" />
            <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)}
              className="bg-secondary border border-border rounded-lg px-3 py-1.5 text-muted-foreground text-center text-xs w-full focus:outline-none focus:border-foreground/50" />
            <div className="flex gap-3 mt-2">
              <button onClick={() => setIsEditing(false)} className="px-4 py-2 rounded-full border border-border text-muted-foreground text-xs">Cancel</button>
              <button onClick={handleSaveEdit} className="px-4 py-2 rounded-full bg-foreground text-primary-foreground text-xs font-semibold">Save</button>
            </div>
          </motion.div>
        ) : (
          <>
            <h2 className="font-display text-2xl font-bold text-foreground mt-4">{name}</h2>
            <p className="text-[10px] tracking-[0.25em] text-muted-foreground mt-1 uppercase">{title}</p>
            {/* User type badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`mt-2 px-3 py-1 rounded-full border text-[10px] tracking-[0.15em] font-semibold ${badgeColor}`}
            >
              {userType.toUpperCase()}
            </motion.div>
          </>
        )}
      </div>

      {/* Rank & Level Progress */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mx-6 mb-4 bg-card rounded-2xl border border-border p-4"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Award size={16} className={rankBadge.color} />
            <span className={`text-xs font-bold tracking-[0.15em] ${rankBadge.color}`}>{rankBadge.label}</span>
          </div>
          <span className="text-[10px] text-muted-foreground">{currentXP}/{nextLevelXP} XP</span>
        </div>
        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${xpPercent}%` }}
            transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-foreground/60 to-foreground"
            style={{ boxShadow: "0 0 8px hsla(0, 0%, 100%, 0.2)" }}
          />
        </div>
        <p className="text-[10px] text-muted-foreground mt-2 text-center">
          {nextLevelXP - currentXP} XP to next rank
        </p>
      </motion.div>

      {/* Stats */}
      <div className="flex items-center justify-around mx-6 py-5 border-y border-border mb-4">
        <div className="flex flex-col items-center">
          <span className="font-display text-3xl font-bold text-foreground">412</span>
          <span className="text-[9px] tracking-[0.25em] text-muted-foreground mt-1">FOCUS HOURS</span>
        </div>
        <div className="w-px h-12 bg-border" />
        <div className="flex flex-col items-center">
          <span className="font-display text-3xl font-bold text-foreground">84</span>
          <span className="text-[9px] tracking-[0.25em] text-muted-foreground mt-1">SESSIONS</span>
        </div>
      </div>

      {/* Weekly Focus Score Graph */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mx-6 mb-6"
      >
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={14} className="text-muted-foreground" />
          <span className="text-[10px] tracking-[0.25em] text-muted-foreground font-medium">WEEKLY TREND</span>
        </div>
        <div className="flex items-end justify-between gap-2 h-20">
          {weeklyScores.map((s, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${(s / maxScore) * 100}%` }}
              transition={{ delay: 0.6 + i * 0.06, duration: 0.5, ease: "easeOut" }}
              className="flex-1 flex flex-col items-center gap-1"
            >
              <span className="text-[9px] text-muted-foreground font-medium">{s}</span>
              <div
                className="w-full rounded-t-md flex-1"
                style={{
                  background: i === weeklyScores.length - 1
                    ? "linear-gradient(to top, hsl(var(--foreground) / 0.3), hsl(var(--foreground) / 0.8))"
                    : "linear-gradient(to top, hsl(var(--secondary)), hsl(var(--muted-foreground) / 0.4))",
                  boxShadow: i === weeklyScores.length - 1 ? "0 0 8px hsla(0, 0%, 100%, 0.15)" : "none",
                  minHeight: 4,
                }}
              />
              <span className="text-[8px] text-muted-foreground">{weekDays[i]}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mx-6 mb-6"
      >
        <span className="text-[10px] tracking-[0.25em] text-muted-foreground font-medium mb-3 block">ACHIEVEMENTS</span>
        <div className="grid grid-cols-2 gap-2">
          {achievements.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={a.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: a.unlocked ? 1 : 0.4, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.08 }}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border ${
                  a.unlocked ? "bg-card border-border glow-sm" : "bg-secondary border-border"
                }`}
              >
                <Icon size={14} className={a.unlocked ? "text-foreground" : "text-muted-foreground"} />
                <span className={`text-[11px] font-medium ${a.unlocked ? "text-foreground" : "text-muted-foreground"}`}>
                  {a.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Preferences */}
      <div className="px-6">
        <p className="text-[10px] tracking-[0.25em] text-muted-foreground mb-4">ACCOUNT PREFERENCES</p>

        <div className="flex items-center py-4 border-b border-border">
          <Bell size={18} className="text-muted-foreground mr-4" />
          <span className="text-sm text-foreground flex-1">Focus Reminders</span>
          <Toggle value={focusReminders} onChange={setFocusReminders} />
        </div>
        <div className="flex items-center py-4 border-b border-border">
          <Timer size={18} className="text-muted-foreground mr-4" />
          <span className="text-sm text-foreground flex-1">Pomo Interval</span>
          <span className="text-sm text-muted-foreground">25:00</span>
        </div>
        <div className="flex items-center py-4 border-b border-border">
          <Shield size={18} className="text-muted-foreground mr-4" />
          <span className="text-sm text-foreground flex-1">Privacy Mode</span>
          <Toggle value={privacyMode} onChange={setPrivacyMode} />
        </div>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowSignOut(true)}
          className="flex items-center py-4 border-b border-border w-full"
        >
          <LogOut size={18} className="text-signout mr-4" />
          <span className="text-sm text-signout">Sign Out</span>
        </motion.button>
      </div>

      {/* Sign Out Confirmation */}
      {showSignOut && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center px-8">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm">
            <h3 className="font-display text-lg font-bold text-foreground mb-2">Sign Out?</h3>
            <p className="text-sm text-muted-foreground mb-6">Your data will be saved locally. You can sign back in anytime.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowSignOut(false)} className="flex-1 py-3 rounded-full border border-border text-foreground text-sm font-medium">Cancel</button>
              <button onClick={() => setShowSignOut(false)} className="flex-1 py-3 rounded-full bg-destructive text-destructive-foreground text-sm font-semibold">Sign Out</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProfileScreen;
