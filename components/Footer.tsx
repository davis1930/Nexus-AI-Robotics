import React from 'react';
import { Logo } from './ui/Logo';
import { Github, Twitter, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/5 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start">
          <Logo className="mb-4 scale-75 origin-left" />
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Nexus Platform. Todos los derechos reservados.
          </p>
        </div>
        
        <div className="flex gap-6">
          <a href="#" className="text-slate-400 hover:text-nexus-orange transition-colors"><Twitter className="w-5 h-5" /></a>
          <a href="#" className="text-slate-400 hover:text-nexus-pink transition-colors"><Github className="w-5 h-5" /></a>
          <a href="#" className="text-slate-400 hover:text-nexus-purple transition-colors"><Linkedin className="w-5 h-5" /></a>
        </div>
      </div>
    </footer>
  );
};