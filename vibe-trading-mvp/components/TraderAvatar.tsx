import React from 'react';
import { motion } from 'framer-motion';

interface TraderAvatarProps {
  seed: string;
  size?: number;
}

export const TraderAvatar: React.FC<TraderAvatarProps> = ({ seed, size = 48 }) => {
  // Simple hash function for seed to generate consistent patterns
  const hash = seed.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
  
  const colors = [
    '#00D4FF', // Cyan
    '#7B61FF', // Purple
    '#00E5A0', // Green
    '#FF7043', // Orange
    '#E8F4FF', // Whiteish
  ];

  const getColor = (offset: number) => colors[Math.abs(hash + offset) % colors.length];

  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ width: size, height: size }}
      className="relative rounded-xl bg-card-elevated border border-border/60 overflow-hidden shadow-lg group shadow-cyan/5"
    >
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full"
      >
        <defs>
          <linearGradient id={`grad-${hash}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: getColor(0), stopOpacity: 0.2 }} />
            <stop offset="100%" style={{ stopColor: getColor(1), stopOpacity: 0.1 }} />
          </linearGradient>
        </defs>
        
        <rect width="100" height="100" fill={`url(#grad-${hash})`} />
        
        {/* Procedural elements */}
        <motion.rect 
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 0.4, pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          x={(hash % 30) + 10} 
          y={(hash % 30) + 10} 
          width="50" 
          height="50" 
          rx="8"
          fill={getColor(2)} 
          className="mix-blend-overlay"
          transform={`rotate(${hash % 90} 50 50)`}
        />
        
        <motion.circle 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          cx={40 + (hash % 20)} 
          cy={40 + (hash % 20)} 
          r={20 + (hash % 15)} 
          fill={getColor(3)} 
          fillOpacity="0.3"
          className="mix-blend-screen"
        />
        
        <motion.path 
          d={`M${hash % 40} 20 L80 ${hash % 60} L20 80 Z`} 
          fill={getColor(4)} 
          fillOpacity="0.15"
          transform={`rotate(${hash % 180} 50 50)`}
          className="mix-blend-lighten"
        />
      </svg>
      
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
};
