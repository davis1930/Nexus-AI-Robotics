import React from 'react';
import { motion } from 'framer-motion';

export const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <motion.div 
        className="relative w-12 h-12"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
          <defs>
            <linearGradient id="nexusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F97316" />   {/* Orange */}
              <stop offset="50%" stopColor="#EC4899" />   {/* Pink */}
              <stop offset="100%" stopColor="#8B5CF6" />  {/* Purple */}
            </linearGradient>
            <linearGradient id="nexusGradientReverse" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
          
          {/* Main N Shape - Fluid Style */}
          <path 
            d="M28 75 V 25 C 28 12 42 12 48 22 L 72 78 C 78 88 92 88 92 75 V 25" 
            stroke="url(#nexusGradient)" 
            strokeWidth="16" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
      <span className="text-3xl font-bold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-nexus-orange via-nexus-pink to-nexus-purple filter drop-shadow-sm">
        NEXUS AI
      </span>
    </div>
  );
};