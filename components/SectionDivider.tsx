'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function SectionDivider({ flip = false }: { flip?: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <div ref={ref} className={`flex justify-center py-2 overflow-hidden ${flip ? 'scale-x-[-1]' : ''}`}>
      <svg width="100%" height="36" viewBox="0 0 800 36" preserveAspectRatio="xMidYMid meet">
        <motion.path
          d="M0,18 H160 L185,6 H320 L345,30 H480 L505,18 H640 L660,8 H800"
          fill="none" stroke="#14b8a6" strokeWidth="1" strokeOpacity="0.25"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        />
        {/* Pad dots */}
        {[0, 160, 320, 480, 640, 800].map((cx, i) => (
          <motion.circle
            key={cx} cx={cx === 0 ? 0 : cx} cy={18} r="3"
            fill="#14b8a6" fillOpacity="0.4"
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
          />
        ))}
      </svg>
    </div>
  );
}
