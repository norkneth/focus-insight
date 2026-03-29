import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Question {
  title: string;
  subtitle?: string;
  options: string[];
}

const questions: Question[] = [
  {
    title: "What do you spend most of your time on?",
    subtitle: "Be honest — no judgment here.",
    options: ["Social media (Instagram, reels)", "Studying / productive work", "Gaming", "Chatting"],
  },
  {
    title: "How many hours do you use your phone daily?",
    subtitle: "Your best estimate is fine.",
    options: ["2–3 hours", "3–5 hours", "5–7 hours", "7+ hours"],
  },
  {
    title: "When do you feel most distracted?",
    subtitle: "Everyone has a weak spot.",
    options: ["Morning", "Afternoon", "Evening", "Late night"],
  },
  {
    title: "Do you feel you're wasting time on your phone?",
    options: ["Not really", "Sometimes", "Yes, often"],
  },
  {
    title: "What do you want to improve?",
    subtitle: "Pick what matters most.",
    options: ["Focus", "Reduce screen time", "Better study consistency", "Build discipline"],
  },
  {
    title: "How serious are you about improving?",
    subtitle: "This helps us personalize your experience.",
    options: ["Just exploring", "Somewhat serious", "Fully committed"],
  },
];

interface QuestionScreenProps {
  onComplete: (answers: number[]) => void;
}

const QuestionScreen = ({ onComplete }: QuestionScreenProps) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [direction, setDirection] = useState(1);

  const q = questions[currentQ];
  const progress = ((currentQ + 1) / questions.length) * 100;

  const handleSelect = (idx: number) => {
    const newAnswers = [...answers, idx];
    setAnswers(newAnswers);

    if (currentQ < questions.length - 1) {
      setDirection(1);
      setTimeout(() => setCurrentQ((prev) => prev + 1), 300);
    } else {
      setTimeout(() => onComplete(newAnswers), 400);
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 pt-8 pb-6">
      {/* Progress bar */}
      <div className="w-full h-1 bg-secondary rounded-full overflow-hidden mb-2">
        <motion.div
          className="h-full bg-foreground rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      <p className="text-[10px] text-muted-foreground tracking-widest mb-10 text-right">
        {currentQ + 1} / {questions.length}
      </p>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentQ}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="flex-1 flex flex-col"
        >
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="font-display text-2xl font-bold text-foreground leading-tight mb-2"
          >
            {q.title}
          </motion.h2>

          {q.subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-sm text-muted-foreground mb-8"
            >
              {q.subtitle}
            </motion.p>
          )}
          {!q.subtitle && <div className="mb-8" />}

          <div className="flex flex-col gap-3">
            {q.options.map((option, idx) => (
              <motion.button
                key={option}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + idx * 0.08, duration: 0.35 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSelect(idx)}
                className="w-full py-4 px-5 rounded-2xl border border-border bg-secondary/50 text-foreground text-sm font-medium text-left transition-colors duration-200 hover:bg-secondary active:bg-accent"
              >
                {option}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuestionScreen;
