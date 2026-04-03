import { Home, BarChart3, User } from "lucide-react";

type Tab = "home" | "rank" | "user";

interface BottomNavProps {
  active: Tab;
  onNavigate: (tab: Tab) => void;
}

const BottomNav = ({ active, onNavigate }: BottomNavProps) => {
  const tabs: { id: Tab; icon: typeof Home; label: string }[] = [
    { id: "home", icon: Home, label: "HOME" },
    { id: "rank", icon: BarChart3, label: "RANK" },
    { id: "user", icon: User, label: "USER" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto px-6 pb-4 pt-2 z-50">
      <div className="rounded-2xl flex items-center justify-around py-3 px-4 backdrop-blur-xl border border-border glow-md"
        style={{ background: "linear-gradient(145deg, hsl(240 5% 11%), hsl(240 6% 7%))" }}>
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${
              active === id ? "text-nav-active" : "text-nav-inactive"
            }`}
          >
            <Icon size={22} strokeWidth={active === id ? 2.5 : 1.5} />
            <span className="text-[10px] tracking-[0.15em] font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
