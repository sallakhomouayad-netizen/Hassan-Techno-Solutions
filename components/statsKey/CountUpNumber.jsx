"use client";

import { useEffect, useRef, useState } from "react";

export default function CountUpNumber({ end, duration = 2000, start }) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);
  const frameRef = useRef(null);
  const lastRenderedValueRef = useRef(-1);

  useEffect(() => {
    if (!start || startedRef.current) return;

    startedRef.current = true;

    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const nextValue = Math.floor(progress * end);

      if (nextValue !== lastRenderedValueRef.current) {
        lastRenderedValueRef.current = nextValue;
        setCount(nextValue);
      }

      if (progress < 1) {
        frameRef.current = window.requestAnimationFrame(animate);
      }
    };

    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [start, end, duration]);

  return <>{count.toLocaleString()}</>;
}