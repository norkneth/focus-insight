import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import HomeScreen from "./HomeScreen";
import LeaderboardScreen from "./LeaderboardScreen";
import ProfileScreen from "./ProfileScreen";
import SettingsScreen from "./SettingsScreen";
import OnboardingFlow from "./onboarding/OnboardingFlow";
import FocusTimer from "@/components/FocusTimer";

type Tab = "home" | "rank" | "user";

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [username, setUsername] = useState("You");

  if (showOnboarding) {
    return (
      <OnboardingFlow
        onComplete={(name) => {
          setUsername(name);
          setShowOnboarding(false);
        }}
      />
    );
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
        {activeTab === "home" && <HomeScreen username={username} onOpenTimer={() => setShowTimer(true)} />}
        {activeTab === "rank" && <LeaderboardScreen username={username} />}
        {activeTab === "user" && (
          <ProfileScreen
            username={username}
            onSettings={() => setShowSettings(true)}
          />
        )}
      </AnimatePresence>
      <BottomNav active={activeTab} onNavigate={setActiveTab} />
      <AnimatePresence>
        {showTimer && <FocusTimer onClose={() => setShowTimer(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default Index;
