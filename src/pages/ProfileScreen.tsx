import { ArrowLeft, Settings, Bell, Timer, Shield, LogOut, Pencil, Camera } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface ProfileScreenProps {
  onBack?: () => void;
  onSettings?: () => void;
  username?: string;
}

const ProfileScreen = ({ onBack, onSettings }: ProfileScreenProps) => {
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
      <div className="flex flex-col items-center mt-6 mb-6">
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
            onClick={() => {
              setEditName(name);
              setEditTitle(title);
              setIsEditing(true);
            }}
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
            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="bg-secondary border border-border rounded-lg px-3 py-2 text-foreground text-center font-display text-lg font-bold w-full focus:outline-none focus:border-foreground/50"
            />
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="bg-secondary border border-border rounded-lg px-3 py-1.5 text-muted-foreground text-center text-xs w-full focus:outline-none focus:border-foreground/50"
            />
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-full border border-border text-muted-foreground text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 rounded-full bg-foreground text-primary-foreground text-xs font-semibold"
              >
                Save
              </button>
            </div>
          </motion.div>
        ) : (
          <>
            <h2 className="font-display text-2xl font-bold text-foreground mt-4">{name}</h2>
            <p className="text-[10px] tracking-[0.25em] text-muted-foreground mt-1 uppercase">{title}</p>
          </>
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center justify-around mx-6 py-5 border-y border-border mb-6">
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center px-8"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm"
          >
            <h3 className="font-display text-lg font-bold text-foreground mb-2">Sign Out?</h3>
            <p className="text-sm text-muted-foreground mb-6">Your data will be saved locally. You can sign back in anytime.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSignOut(false)}
                className="flex-1 py-3 rounded-full border border-border text-foreground text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowSignOut(false)}
                className="flex-1 py-3 rounded-full bg-destructive text-destructive-foreground text-sm font-semibold"
              >
                Sign Out
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProfileScreen;
