import { useEffect, useState } from "react";

interface FocusRingProps {
  score: number;
}

const FocusRing = ({ score }: FocusRingProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(eased * score));
      if (progress < 1) requestAnimationFrame(animate);
    };
    animate();
  }, [score]);

  const radius = 130;
  const stroke = 3;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: 300, height: 300 }}>
      {/* Outer dashed ring */}
      <svg className="absolute" width={300} height={300} style={{ animation: "ring-rotate 60s linear infinite" }}>
        <circle
          cx={150} cy={150} r={145}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth={1}
          strokeDasharray="4 8"
          opacity={0.4}
        />
      </svg>

      {/* Score ring */}
      <svg className="absolute -rotate-90" width={300} height={300}>
        {/* Background ring */}
        <circle
          cx={150} cy={150} r={radius}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth={stroke}
          opacity={0.3}
        />
        {/* Active ring */}
        <circle
          cx={150} cy={150} r={radius}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className="transition-all duration-1000 ease-out"
          style={{
            filter: "drop-shadow(0 0 8px hsla(0, 0%, 100%, 0.3))",
          }}
        />
      </svg>

      {/* Inner dark circle */}
      <div className="absolute rounded-full bg-background flex flex-col items-center justify-center"
        style={{ width: 230, height: 230 }}>
        <span className="font-display text-7xl font-bold text-foreground tracking-tight">
          {animatedScore}
        </span>
        <span className="text-[11px] tracking-[0.3em] text-muted-foreground mt-1 font-medium">
          FOCUS SCORE
        </span>
      </div>
    </div>
  );
};

export default FocusRing;
