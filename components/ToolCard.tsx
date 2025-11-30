import React from 'react';
import { motion } from 'framer-motion';
import { Tool } from '../types';
import { ExternalLink, ArrowRight, Lock, Zap } from 'lucide-react';

interface ToolCardProps {
  tool: Tool;
  onAction?: (tool: Tool) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onAction }) => {
  const isComingSoon = tool.status === 'coming_soon';
  const hasAction = !!tool.action;

  const CardContent = (
    <motion.div 
      className={`relative h-full w-full bg-slate-900 border rounded-2xl p-6 flex flex-col justify-between overflow-hidden backdrop-blur-sm transition-colors duration-300
        ${isComingSoon ? 'border-slate-800 opacity-90' : 'border-slate-800 group-hover:bg-slate-800/90'}
      `}
      whileHover={!isComingSoon ? { translateY: -5 } : {}}
    >
      {/* Top Section: Icon and Status Badge */}
      <div className="flex justify-between items-start z-10">
        <div className={`p-3 rounded-xl border transition-colors duration-300 ${
          isComingSoon 
            ? 'bg-slate-800 border-slate-700' 
            : 'bg-slate-800 group-hover:bg-white/10 border-slate-700 group-hover:border-white/20'
        }`}>
          <tool.icon className={`w-8 h-8 transition-colors duration-300 ${
            isComingSoon ? 'text-slate-500' : 'text-white group-hover:text-nexus-pink'
          }`} />
        </div>
        
        {isComingSoon ? (
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-nexus-orange text-white shadow-lg shadow-nexus-orange/20 animate-pulse border border-nexus-orange">
            PRÓXIMAMENTE
          </span>
        ) : (
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
            {tool.category}
          </span>
        )}
      </div>

      {/* Middle/Bottom: Text Content */}
      <div className="z-10 mt-6">
        <h3 className={`text-xl font-bold mb-3 transition-all duration-300 ${
          isComingSoon 
            ? 'text-slate-300' 
            : 'text-white group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-nexus-orange group-hover:via-nexus-pink group-hover:to-nexus-purple'
        }`}>
          {tool.name}
        </h3>
        
        <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
          {tool.description}
        </p>

        {!isComingSoon && (
          <div className="flex items-center text-sm font-semibold text-nexus-pink opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
            <span>{hasAction ? 'Activar Herramienta' : 'Acceder Herramienta'}</span>
            {hasAction ? <Zap className="w-4 h-4 ml-2" /> : <ArrowRight className="w-4 h-4 ml-2" />}
          </div>
        )}
        
        {isComingSoon && (
           <div className="flex items-center text-sm font-medium text-slate-600 mt-2">
             <Lock className="w-3 h-3 mr-2" />
             <span>En desarrollo</span>
           </div>
        )}
      </div>

      {/* Decorative background elements inside card */}
      {!isComingSoon && (
        <>
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-nexus-purple/20 rounded-full blur-3xl group-hover:bg-nexus-purple/30 transition-all duration-500" />
          <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-nexus-orange/20 rounded-full blur-3xl group-hover:bg-nexus-orange/30 transition-all duration-500" />
        </>
      )}
    </motion.div>
  );

  if (isComingSoon) {
    return (
      <div className="relative block w-full h-72 cursor-default grayscale-[0.2]">
        {CardContent}
      </div>
    );
  }

  // If Tool has an action, render as a clickable div/button
  if (hasAction) {
    return (
      <motion.div
        onClick={() => onAction && onAction(tool)}
        className="group relative block w-full h-72 perspective cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-nexus-orange via-nexus-pink to-nexus-purple rounded-2xl opacity-0 group-hover:opacity-75 blur transition duration-500 group-hover:duration-200" />
        {CardContent}
      </motion.div>
    );
  }

  // Default External Link
  return (
    <motion.a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block w-full h-72 perspective cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-nexus-orange via-nexus-pink to-nexus-purple rounded-2xl opacity-0 group-hover:opacity-75 blur transition duration-500 group-hover:duration-200" />
      {CardContent}
    </motion.a>
  );
};