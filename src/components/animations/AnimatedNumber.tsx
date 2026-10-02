'use client';

import { useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { toPersianNumber } from '@/lib/format';

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  className?: string;
  duration?: number;
}

export default function AnimatedNumber({
  value,
  suffix = '',
  className,
  duration = 2,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = toPersianNumber(Math.floor(latest)) + suffix;
      }
    });
    return () => unsubscribe();
  }, [springValue, suffix]);

  return (
    <span ref={ref} className={className}>
      {toPersianNumber(0)}
      {suffix}
    </span>
  );
}