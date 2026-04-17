"use client";

import { useEffect, useMemo, useState } from "react";

interface CountdownButtonProps {
  targetDate: string | Date;
  label?: string;
  className?: string;
}

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} | null;

export default function CountdownButton({
  targetDate,
  label = "Event Started 🎉",
  className = "",
}: CountdownButtonProps) {
  const targetTime = useMemo(
    () => new Date(targetDate).getTime(),
    [targetDate],
  );

  const calculateTimeLeft = (): TimeLeft => {
    const difference = targetTime - new Date().getTime();

    if (difference <= 0) return null;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  return (
    <button
      className={`px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg ${className}`}
    >
      {timeLeft ? (
        <span>
          {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m :{" "}
          {timeLeft.seconds}s
        </span>
      ) : (
        label
      )}
    </button>
  );
}
