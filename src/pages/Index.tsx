import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import HomeScreen from "./HomeScreen";
import LeaderboardScreen from "./LeaderboardScreen";
import ProfileScreen from "./ProfileScreen";

type Tab = "home" | "rank" | "user";

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>("home");

  return (
    <div className="max-w-md mx-auto relative min-h-screen bg-background">
      {activeTab === "home" && <HomeScreen />}
      {activeTab === "rank" && <LeaderboardScreen />}
      {activeTab === "user" && <ProfileScreen />}
      <BottomNav active={activeTab} onNavigate={setActiveTab} />
    </div>
  );
};

export default Index;
