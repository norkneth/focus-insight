import { ArrowLeft, Settings, Bell, Timer, Shield, LogOut, Pencil } from "lucide-react";
import { useState } from "react";

interface ProfileScreenProps {
  onBack?: () => void;
}

const ProfileScreen = ({ onBack }: ProfileScreenProps) => {
  const [focusReminders, setFocusReminders] = useState(false);
  const [privacyMode, setPrivacyMode] = useState(true);

  return (
    <div className="min-h-screen bg-background flex flex-col pb-28">
      {/* Header */}
      <div className="flex items-center justify-center px-6 pt-6 pb-4 relative">
        {onBack && (
          <button onClick={onBack} className="absolute left-6">
            <ArrowLeft size={22} className="text-foreground" />
          </button>
        )}
        <h1 className="text-sm tracking-[0.3em] font-semibold text-foreground">PROFILE</h1>
        <button className="absolute right-6">
          <Settings size={20} className="text-muted-foreground" />
        </button>
      </div>

      {/* Avatar */}
      <div className="flex flex-col items-center mt-6 mb-6">
        <div className="relative">
          <div className="w-28 h-28 rounded-full bg-secondary border-2 border-border overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-muted to-secondary flex items-center justify-center">
              <span className="font-display text-3xl font-bold text-muted-foreground">EV</span>
            </div>
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-foreground flex items-center justify-center">
            <Pencil size={14} className="text-primary-foreground" />
          </button>
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground mt-4">Erik Vance</h2>
        <p className="text-[10px] tracking-[0.25em] text-muted-foreground mt-1 uppercase">Deep Work Enthusiast</p>
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

        {/* Focus Reminders */}
        <div className="flex items-center py-4 border-b border-border">
          <Bell size={18} className="text-muted-foreground mr-4" />
          <span className="text-sm text-foreground flex-1">Focus Reminders</span>
          <button
            onClick={() => setFocusReminders(!focusReminders)}
            className={`w-12 h-7 rounded-full transition-all duration-300 relative ${
              focusReminders ? "bg-foreground" : "bg-secondary"
            }`}
          >
            <div
              className={`absolute top-1 w-5 h-5 rounded-full transition-all duration-300 ${
                focusReminders ? "left-6 bg-primary-foreground" : "left-1 bg-muted-foreground"
              }`}
            />
          </button>
        </div>

        {/* Pomo Interval */}
        <div className="flex items-center py-4 border-b border-border">
          <Timer size={18} className="text-muted-foreground mr-4" />
          <span className="text-sm text-foreground flex-1">Pomo Interval</span>
          <span className="text-sm text-muted-foreground">25:00</span>
        </div>

        {/* Privacy Mode */}
        <div className="flex items-center py-4 border-b border-border">
          <Shield size={18} className="text-muted-foreground mr-4" />
          <span className="text-sm text-foreground flex-1">Privacy Mode</span>
          <button
            onClick={() => setPrivacyMode(!privacyMode)}
            className={`w-12 h-7 rounded-full transition-all duration-300 relative ${
              privacyMode ? "bg-foreground" : "bg-secondary"
            }`}
          >
            <div
              className={`absolute top-1 w-5 h-5 rounded-full transition-all duration-300 ${
                privacyMode ? "left-6 bg-primary-foreground" : "left-1 bg-muted-foreground"
              }`}
            />
          </button>
        </div>

        {/* Sign Out */}
        <div className="flex items-center py-4 border-b border-border">
          <LogOut size={18} className="text-signout mr-4" />
          <span className="text-sm text-signout">Sign Out</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
