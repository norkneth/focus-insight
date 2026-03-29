import { User, Zap } from "lucide-react";
import FocusRing from "@/components/FocusRing";

const HomeScreen = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col px-6 pt-6 pb-28">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-display text-xl font-bold text-foreground tracking-tight">ALEX.</h1>
        <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
          <User size={18} className="text-muted-foreground" />
        </button>
      </div>

      {/* Focus Ring Area */}
      <div className="flex-1 flex flex-col items-center justify-center -mt-4">
        {/* Nudge text */}
        <p className="text-nudge text-xs tracking-[0.2em] mb-8 font-medium uppercase">
          Ahead of 76% of users
        </p>

        <FocusRing score={85} />

        {/* Lightning button */}
        <div className="flex justify-end w-full mt-4 pr-4">
          <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <Zap size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-border mx-2 mb-6" />

      {/* Stats */}
      <div className="flex items-center justify-around mb-6">
        <div className="flex flex-col items-center">
          <span className="font-display text-2xl font-bold text-foreground">12</span>
          <span className="text-[10px] tracking-[0.2em] text-muted-foreground mt-1">STREAK</span>
        </div>
        <div className="w-px h-10 bg-border" />
        <div className="flex flex-col items-center">
          <span className="font-display text-2xl font-bold text-foreground">24</span>
          <span className="text-[10px] tracking-[0.2em] text-muted-foreground mt-1">SESSIONS</span>
        </div>
        <div className="w-px h-10 bg-border" />
        <div className="flex flex-col items-center">
          <span className="font-display text-2xl font-bold text-foreground">5.5</span>
          <span className="text-[10px] tracking-[0.2em] text-muted-foreground mt-1">HOURS</span>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
