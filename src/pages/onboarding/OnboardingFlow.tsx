import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AuthScreen from "./AuthScreen";
import QuestionScreen from "./QuestionScreen";
import PermissionScreen from "./PermissionScreen";
import AnalysisScreen from "./AnalysisScreen";
import ResultScreen from "./ResultScreen";
import UsernameScreen from "./UsernameScreen";

type Step = "auth" | "questions" | "permissions" | "analysis" | "result" | "username";

interface OnboardingFlowProps {
  onComplete: (username: string) => void;
}

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [step, setStep] = useState<Step>("auth");
  const [focusScore, setFocusScore] = useState(68);

  const handleQuestionsComplete = (answers: number[]) => {
    const base = 55;
    const seriousness = answers[5] || 0;
    const bonus = seriousness * 8 + Math.floor(Math.random() * 15);
    setFocusScore(Math.min(base + bonus, 92));
    setStep("permissions");
  };

  return (
    <div className="max-w-md mx-auto relative min-h-screen bg-background overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen"
        >
          {step === "auth" && <AuthScreen onContinue={() => setStep("questions")} />}
          {step === "questions" && <QuestionScreen onComplete={handleQuestionsComplete} />}
          {step === "permissions" && <PermissionScreen onContinue={() => setStep("analysis")} />}
          {step === "analysis" && <AnalysisScreen onComplete={() => setStep("result")} />}
          {step === "result" && <ResultScreen score={focusScore} onContinue={() => setStep("username")} />}
          {step === "username" && <UsernameScreen onComplete={(name) => onComplete(name)} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default OnboardingFlow;
