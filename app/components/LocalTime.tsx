"use client";

import { useEffect, useState } from "react";

export default function LocalTime() {
  const [time, setTime] = useState("");
  const [tz, setTz] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString());
      setTz(Intl.DateTimeFormat().resolvedOptions().timeZone);
    };

    update();
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!time) return null;

  return (
    <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
      it's {time} ({tz}) 👀
    </span>
  );
}