import React from 'react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  const scrollToTools = () => {
    const element = document.getElementById('herramientas');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden min-h-[85vh] flex items-center justify-center">
      {/* Animated Background Blobs - Infinite & Fluid */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden bg-[#020617]">
        
        {/* Orb 1: Purple (Top Left) */}
        <motion.div
          animate={{
            x: [ -50, 50, -50],
            y: [ -50, 50, -50],
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.25, 0.2], // Reduced intensity to stay subtle
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut"
          }}
          className="absolute -top-[10%] -left-[10%] w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] bg-nexus-purple rounded-full mix-blend-screen filter blur-[80px] sm:blur-[120px]"
        />

        {/* Orb 2: Pink (Bottom Right) */}
        <motion.div
          animate={{
            x: [ 50, -50, 50],
            y: [ 50, -50, 50],
            scale: [1.1, 1, 1.1],
            opacity: [0.15, 0.2, 0.15], // Reduced intensity to stay subtle
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut"
          }}
          className="absolute top-[20%] -right-[10%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-nexus-pink rounded-full mix-blend-screen filter blur-[80px] sm:blur-[120px]"
        />

        {/* Orb 3: Orange Accent (Center Floating) */}
        <motion.div
          animate={{
            x: [ -30, 30, -30],
            y: [ 30, -30, 30],
            scale: [0.9, 1, 0.9],
            opacity: [0.05, 0.1, 0.05], // Very subtle accent
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut"
          }}
          className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-nexus-orange rounded-full mix-blend-screen filter blur-[80px] sm:blur-[120px]"
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-8">
            <span className="block text-white drop-shadow-xl">Eficiencia Estratégica</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-nexus-orange via-nexus-pink to-nexus-purple filter drop-shadow-lg">
              Nexus AI & Robotics
            </span>
          </h1>
          
          <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-slate-300 font-light leading-relaxed">
            Democratizamos la inteligencia artificial y la robótica. Transformamos tareas repetitivas en productividad y capacitando al talento humano para el futuro.
          </p>
          
          <div className="mt-12 flex justify-center gap-4">
            <motion.button 
              onClick={scrollToTools}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-nexus-orange via-nexus-pink to-nexus-purple text-white font-bold text-lg shadow-lg shadow-nexus-pink/30 hover:shadow-nexus-pink/50 transition-shadow ring-1 ring-white/20"
            >
              Explorar Herramientas
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};