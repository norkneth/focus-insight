import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import HomeScreen from "./HomeScreen";
import LeaderboardScreen from "./LeaderboardScreen";
import ProfileScreen from "./ProfileScreen";
import SettingsScreen from "./SettingsScreen";
import OnboardingFlow from "./onboarding/OnboardingFlow";

type Tab = "home" | "rank" | "user";

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  if (showOnboarding) {
    return <OnboardingFlow onComplete={() => setShowOnboarding(false)} />;
  }

  if (showSettings) {
    return (
      <div className="max-w-md mx-auto relative min-h-screen bg-background">
        <SettingsScreen onBack={() => setShowSettings(false)} />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto relative min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {activeTab === "home" && <HomeScreen />}
        {activeTab === "rank" && <LeaderboardScreen />}
        {activeTab === "user" && (
          <ProfileScreen
            onSettings={() => setShowSettings(true)}
          />
        )}
      </AnimatePresence>
      <BottomNav active={activeTab} onNavigate={setActiveTab} />
    </div>
  );
};

export default Index;
