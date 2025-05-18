
import { useState } from "react";

export default function WealthDNAPro() {
  const steps = ["intro", "q1", "q2", "q3", "q4", "q5", "summary"];
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleAnswer = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setStep((prev) => prev + 1);
  };

  const questions = [
    {
      key: "experience",
      question: "How many years have you been investing?",
      options: ["<1", "1–5", "5–10", ">10"]
    },
    {
      key: "goal",
      question: "What is your primary investment goal?",
      options: ["Preserve capital", "Generate income", "Grow wealth", "Speculate"]
    },
    {
      key: "risk",
      question: "Invest $10,000 in:",
      options: ["1% savings", "3% bonds", "7% stocks", "15% crypto"]
    },
    {
      key: "horizon",
      question: "How long before you need the money?",
      options: ["<3y", "3–7y", "7–15y", ">15y"]
    },
    {
      key: "volatility",
      question: "Portfolio drops 20%. You:",
      options: ["Sell", "Hold", "Buy more"]
    }
  ];

  const profile = () => {
    const score = Object.values(answers).reduce((acc, val) => {
      if (["<1", "Preserve capital", "1% savings", "<3y", "Sell"].includes(val)) acc--;
      if ([">10", "Speculate", "15% crypto", ">15y", "Buy more"].includes(val)) acc++;
      return acc;
    }, 0);
    if (score <= -2) return "Conservative";
    if (score >= 2) return "Aggressive";
    return "Moderate";
  };

  if (step === 0) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Welcome to Wealth DNA Game</h2>
        <p>Discover your investor profile in 5 quick questions.</p>
        <button onClick={() => setStep(1)}>Start</button>
      </div>
    );
  }

  if (step > 0 && step <= 5) {
    const q = questions[step - 1];
    return (
      <div style={{ padding: 40 }}>
        <h3>{q.question}</h3>
        {q.options.map((opt) => (
          <button key={opt} style={{ display: "block", margin: "10px 0" }} onClick={() => handleAnswer(q.key, opt)}>
            {opt}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Your Profile: {profile()}</h2>
      <p>Based on your answers, you are a {profile().toLowerCase()} investor.</p>
    </div>
  );
}
