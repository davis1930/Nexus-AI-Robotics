import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ToolCard } from './components/ToolCard';
import { Footer } from './components/Footer';
import { Chatbot } from './components/Chatbot';
import { ViewState, Tool } from './types';
import { 
  MessageCircleHeart,
  CalendarClock,
  Bot,
  BrainCircuit,
  Factory,
  GraduationCap,
  ChartBar,
  ShieldCheck,
  Globe,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Specific Tools Requested
const tools: Tool[] = [
  {
    id: '4',
    name: 'Chatbot Conversacional',
    description: 'Asistente virtual potenciado por Gemini 3.0. Resuelve dudas al instante sobre nuestros servicios y automatización.',
    url: '#',
    icon: Sparkles, // Using Sparkles for magic feel
    category: 'IA',
    status: 'active',
    action: 'toggle_chatbot'
  },
  {
    id: '1',
    name: 'Chat Dr. Nex Triage',
    description: 'Conversa con un doctor inteligente para realizar triage. Obtén un diagnóstico breve y recomendaciones sobre si necesitas acudir a una clínica según tus síntomas.',
    url: 'https://drnex.netlify.app/',
    icon: MessageCircleHeart,
    category: 'Salud',
    status: 'active'
  },
  {
    id: '2',
    name: 'Agendamiento Inteligente',
    description: 'Sistema avanzado conectado con Google Calendar para gestionar tus citas médicas de forma automática y eficiente.',
    url: '#',
    icon: CalendarClock,
    category: 'Productividad',
    status: 'coming_soon'
  },
  {
    id: '3',
    name: 'Avatar IA Guía Turístico',
    description: 'Un compañero conversacional que se adapta a tu personalidad. Descubre historias, sitios de interés y secretos de la región con un guía virtual único.',
    url: '#',
    icon: Bot,
    category: 'Viajes',
    status: 'coming_soon'
  }
];

// Expanded About Section with Corporate Identity
const AboutSection = () => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    exit={{ opacity: 0 }}
    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
  >
    {/* Header */}
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
        Quiénes Somos
      </h2>
      <p className="text-slate-400 max-w-3xl mx-auto text-lg">
        Nexus AI & Robotics es el aliado estratégico para la transformación digital en la Región Andina.
      </p>
    </div>

    {/* Misión & Visión */}
    <div className="grid md:grid-cols-2 gap-8 mb-20">
      <motion.div 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-900/50 border border-nexus-purple/30 p-8 rounded-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-nexus-purple/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
        <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
          <Globe className="w-6 h-6 mr-2 text-nexus-purple" /> Misión
        </h3>
        <p className="text-slate-300 leading-relaxed">
          Democratizar la inteligencia artificial y la robótica para las empresas colombianas, 
          transformando tareas repetitivas en eficiencia estratégica y capacitando al talento humano 
          para los retos del futuro.
        </p>
      </motion.div>

      <motion.div 
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-slate-900/50 border border-nexus-orange/30 p-8 rounded-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-nexus-orange/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
        <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
          <ChartBar className="w-6 h-6 mr-2 text-nexus-orange" /> Visión 2030
        </h3>
        <p className="text-slate-300 leading-relaxed">
          Ser el referente líder en la Región Andina para 2030 en la implementación de soluciones 
          de hiper-automatización, reconocidos por aumentar la productividad de nuestros clientes 
          en un mínimo del 30%.
        </p>
      </motion.div>
    </div>

    {/* Nuestros Valores */}
    <div className="mb-20">
      <h3 className="text-3xl font-bold text-center mb-10 text-white">Nuestros Valores</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: ChartBar, title: "Datos sobre Intuición", desc: "Todo se decide con métricas. No adivinamos, medimos.", color: "text-blue-400" },
          { icon: ShieldCheck, title: "Ética en IA", desc: "Transparencia total en el uso de datos y algoritmos.", color: "text-green-400" },
          { icon: Globe, title: "Adaptabilidad", desc: "Soluciones a la medida del mercado local y sus necesidades.", color: "text-nexus-pink" },
        ].map((val, idx) => (
          <motion.div 
            key={idx}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-slate-800/40 p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors"
          >
            <val.icon className={`w-10 h-10 mb-4 ${val.color}`} />
            <h4 className="text-xl font-semibold text-white mb-2">{val.title}</h4>
            <p className="text-slate-400 text-sm">{val.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Portafolio de Servicios */}
    <div>
      <h3 className="text-3xl font-bold text-center mb-4 text-white">Portafolio de Servicios</h3>
      <p className="text-center text-slate-400 mb-12">Soluciones reales para problemas empresariales</p>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Servicio 1 */}
        <div className="group bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-nexus-purple/50 transition-all duration-300">
          <div className="bg-nexus-purple/20 w-14 h-14 rounded-lg flex items-center justify-center mb-6 text-nexus-purple">
            <Bot className="w-8 h-8" />
          </div>
          <h4 className="text-xl font-bold text-white mb-3">Automatización Robótica (RPA)</h4>
          <p className="text-slate-400 mb-4 text-sm">
            Eliminamos la "burocracia operativa". Implementamos bots de software para facturación, nómina y conciliación 24/7.
          </p>
          <ul className="text-sm text-slate-500 space-y-2">
            <li className="flex items-center">• Reducción del 80% en tiempos de proceso</li>
            <li className="flex items-center">• 0% de errores por digitación</li>
          </ul>
        </div>

        {/* Servicio 2 */}
        <div className="group bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-nexus-pink/50 transition-all duration-300">
          <div className="bg-nexus-pink/20 w-14 h-14 rounded-lg flex items-center justify-center mb-6 text-nexus-pink">
            <BrainCircuit className="w-8 h-8" />
          </div>
          <h4 className="text-xl font-bold text-white mb-3">Consultoría en IA</h4>
          <p className="text-slate-400 mb-4 text-sm">
            Transformamos datos en ventas. Modelos predictivos para segmentación de clientes y optimización de inventarios.
          </p>
          <ul className="text-sm text-slate-500 space-y-2">
            <li className="flex items-center">• Predicción de demanda</li>
            <li className="flex items-center">• Aumento en conversión de ventas</li>
          </ul>
        </div>

        {/* Servicio 3 */}
        <div className="group bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-nexus-orange/50 transition-all duration-300">
          <div className="bg-nexus-orange/20 w-14 h-14 rounded-lg flex items-center justify-center mb-6 text-nexus-orange">
            <Factory className="w-8 h-8" />
          </div>
          <h4 className="text-xl font-bold text-white mb-3">Robótica Colaborativa (Cobots)</h4>
          <p className="text-slate-400 mb-4 text-sm">
            Automatización accesible para Pymes. Asesoría e integración de robots colaborativos para empaquetado y ensamblaje.
          </p>
          <ul className="text-sm text-slate-500 space-y-2">
            <li className="flex items-center">• Aumento de capacidad de producción</li>
            <li className="flex items-center">• Integración IIoT (Internet Industrial)</li>
          </ul>
        </div>

        {/* Servicio 4 */}
        <div className="group bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-blue-500/50 transition-all duration-300">
          <div className="bg-blue-500/20 w-14 h-14 rounded-lg flex items-center justify-center mb-6 text-blue-500">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h4 className="text-xl font-bold text-white mb-3">Academia Corporativa 4.0</h4>
          <p className="text-slate-400 mb-4 text-sm">
            Talleres de "Upskilling" para que tu equipo pierda el miedo a la IA y aprenda a usarla a su favor.
          </p>
          <ul className="text-sm text-slate-500 space-y-2">
            <li className="flex items-center">• Prompt Engineering y RPA básico</li>
            <li className="flex items-center">• Alta tasa de adopción tecnológica</li>
          </ul>
        </div>
      </div>
    </div>
  </motion.div>
);

const ContactSection = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }} 
    className="max-w-xl mx-auto px-4 py-20"
  >
    <h2 className="text-4xl font-bold mb-2 text-center text-white">Contáctanos</h2>
    <p className="text-center text-slate-400 mb-8">¿Listo para automatizar tu empresa?</p>
    <form className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-400 mb-2">Nombre / Empresa</label>
        <input type="text" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-nexus-pink focus:ring-1 focus:ring-nexus-pink transition-all" placeholder="Nombre" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-400 mb-2">Email Corporativo</label>
        <input type="email" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-nexus-pink focus:ring-1 focus:ring-nexus-pink transition-all" placeholder="tu@empresa.com" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-400 mb-2">Servicio de Interés</label>
        <select className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-nexus-pink focus:ring-1 focus:ring-nexus-pink transition-all">
          <option>Seleccionar opción...</option>
          <option>Automatización (RPA)</option>
          <option>Consultoría IA</option>
          <option>Robótica (Cobots)</option>
          <option>Capacitación (Academia)</option>
          <option>Otro</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-400 mb-2">Mensaje</label>
        <textarea rows={4} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-nexus-pink focus:ring-1 focus:ring-nexus-pink transition-all" placeholder="Cuéntanos sobre tus retos operativos..."></textarea>
      </div>
      <button className="w-full bg-gradient-to-r from-nexus-orange to-nexus-pink text-white font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-nexus-pink/20 transition-all transform hover:scale-[1.02]">
        Solicitar Asesoría
      </button>
    </form>
  </motion.div>
);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);

  const handleToolAction = (tool: Tool) => {
    if (tool.action === 'toggle_chatbot') {
      setIsChatbotVisible(true);
      // Optional: scroll slightly to ensure visibility if needed, 
      // but the animation is fixed position so it will be seen.
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-nexus-pink selection:text-white">
      <Navbar currentView={currentView} onNavigate={setCurrentView} />

      {/* Global Chatbot Component */}
      <Chatbot isVisible={isChatbotVisible} onHide={() => setIsChatbotVisible(false)} />

      <main className="relative z-10 min-h-screen">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Hero />
              
              <div id="herramientas" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center justify-between mb-10">
                  <h2 className="text-2xl font-semibold text-white">Panel de Herramientas</h2>
                  <div className="h-px bg-slate-800 flex-1 ml-6"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
                  {tools.map((tool) => (
                    <div key={tool.id} className="w-full max-w-sm">
                      <ToolCard tool={tool} onAction={handleToolAction} />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {currentView === 'about' && (
            <AboutSection key="about" />
          )}

          {currentView === 'contact' && (
            <ContactSection key="contact" />
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default App;