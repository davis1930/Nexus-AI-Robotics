import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Loader2, Minus } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface ChatbotProps {
  isVisible: boolean;
  onHide: () => void;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

// System Context for the Bot
const NEXUS_CONTEXT = `
Eres Nexus Bot, el asistente virtual oficial de Nexus AI & Robotics.
Tu única función es responder preguntas sobre nuestra empresa, servicios y visión.

INFORMACIÓN CORPORATIVA:
- Misión: Democratizar la inteligencia artificial y la robótica para las empresas colombianas y de la Región Andina.
- Visión: Ser líderes en 2030 en soluciones de hiper-automatización.
- Valores: Datos sobre intuición, Ética en IA, Adaptabilidad.

NUESTROS SERVICIOS:
1. Automatización Robótica de Procesos (RPA): Bots de software para facturación, nómina y tareas repetitivas.
2. Consultoría en IA: Modelos predictivos para ventas e inventarios.
3. Robótica Colaborativa (Cobots): Asesoría e integración de robots para manufactura.
4. Academia Corporativa 4.0: Capacitación y talleres de "Upskilling" para empleados.

REGLAS DE COMPORTAMIENTO:
1. Responde de manera breve, profesional y motivadora.
2. Usa guiones (-) para las listas, evita usar asteriscos para viñetas.
3. SI EL USUARIO PREGUNTA ALGO QUE NO TIENE QUE VER CON NEXUS (Ej: recetas, chistes, cultura general), RESPONDE: "Lo siento, como asistente de Nexus AI solo puedo responder consultas sobre nuestros servicios y soluciones tecnológicas. Para otro tipo de información, por favor contáctate directamente con la empresa."
`;

export const Chatbot: React.FC<ChatbotProps> = ({ isVisible, onHide }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false); // Track if user has clicked it
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: '¡Hola! Soy Nexus Bot. ¿En qué puedo ayudarte hoy sobre automatización o IA?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  // Handle Send
  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash', // Faster model for quick interactions
        contents: userText,
        config: {
          systemInstruction: NEXUS_CONTEXT,
          temperature: 0.3, // Lower temperature for more factual/focused responses
        }
      });
      
      const text = response.text || "Lo siento, no pude procesar tu solicitud.";
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Tuve un problema de conexión. Intenta de nuevo más tarde." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!hasInteracted) setHasInteracted(true);
  };

  // Helper function to format bold text (**text**) and preserve newlines
  const formatMessage = (text: string) => {
    // Split by double asterisks
    const parts = text.split(/(\*\*.*?\*\*)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        // Remove the asterisks and return a strong element
        return <strong key={index} className="font-bold text-white">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="w-[90vw] sm:w-[350px] h-[500px] bg-slate-900 border border-nexus-purple/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-2"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-nexus-purple to-nexus-pink flex justify-between items-center">
              <div className="flex items-center gap-2 text-white font-bold">
                <Bot className="w-5 h-5" />
                <span>Nexus AI Assistant</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors p-1 rounded hover:bg-white/10"
                  title="Minimizar"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <button 
                  onClick={onHide}
                  className="text-white/80 hover:text-white transition-colors p-1 rounded hover:bg-white/10"
                  title="Cerrar completamente"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/95">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user' 
                        ? 'bg-nexus-purple text-white rounded-br-none' 
                        : 'bg-slate-800 text-slate-300 border border-slate-700 rounded-bl-none'
                    }`}
                  >
                    {formatMessage(msg.text)}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 rounded-2xl p-3 rounded-bl-none border border-slate-700">
                    <Loader2 className="w-4 h-4 animate-spin text-nexus-pink" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu pregunta..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-nexus-pink transition-colors"
              />
              <button 
                type="submit" 
                disabled={isLoading}
                className="bg-nexus-pink hover:bg-nexus-orange text-white p-2 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <div className="relative group">
        {/* Pulse Waves Effect - Only shows until first interaction */}
        {!hasInteracted && !isOpen && (
          <>
            <span className="absolute inline-flex h-full w-full rounded-full bg-nexus-orange opacity-75 animate-ping duration-1000"></span>
            <span className="absolute inline-flex h-full w-full rounded-full bg-nexus-purple opacity-50 animate-ping delay-150 duration-1000"></span>
          </>
        )}
        
        <motion.button
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20 
          }}
          onClick={handleToggle}
          className="relative w-14 h-14 bg-gradient-to-r from-nexus-orange via-nexus-pink to-nexus-purple rounded-full flex items-center justify-center shadow-lg shadow-nexus-pink/40 border-2 border-white/20 z-50 text-white"
        >
          {isOpen ? <Minus className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </motion.button>
        
        {/* Tooltip hint that appears once */}
        {!hasInteracted && !isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="absolute right-16 top-1/2 -translate-y-1/2 bg-white text-nexus-dark px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap shadow-lg mr-2"
          >
            ¡Hazme una pregunta! ✨
            <div className="absolute right-0 top-1/2 translate-x-1 -translate-y-1/2 w-2 h-2 bg-white rotate-45"></div>
          </motion.div>
        )}
      </div>

    </div>
  );
};