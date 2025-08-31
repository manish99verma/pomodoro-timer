import { useEffect, useState } from "react";

const focusQuotes = [
  "Deep work now, freedom later.",
  "One Pomodoro at a time, progress is built.",
  "Focus is your superpower—use it wisely.",
  "Discipline today, success tomorrow.",
  "Every tick is a step closer to your goal.",
  "Stay in the zone, your future self will thank you.",
  "Focus sharpens the ordinary into extraordinary.",
  "Distractions steal minutes, focus builds dreams.",
  "Work with intention, not just attention.",
  "Push now, and watch the results push back.",
];
const breakQuotes = [
  "Rest isn’t wasted—it fuels your next win.",
  "Breathe, stretch, reset—then crush it again.",
  "Small breaks build big endurance.",
  "Relax your mind, sharpen your focus.",
  "Rest like a pro, work like a beast.",
  "Sip some water—hydration powers concentration.",
  "Coffee break now, energy boost later.",
  "Stretch your body, refresh your mind.",
  "A glass of water today keeps brain fog away.",
  "Breaks aren’t pauses—they’re pit stops for champions.",
];

const Quote = ({ isFocusTime }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(Math.floor(Math.random() * 10));
  }, [isFocusTime]);

  return (
    <p className="text-sm opacity-95">
      {isFocusTime ? focusQuotes[index] : breakQuotes[index]}
    </p>
  );
};

export default Quote;
