"use client";

import * as motion from "framer-motion/client";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

interface AboutContentProps {
  dict: any;
}

export default function AboutContent({ dict }: AboutContentProps) {
  // Animaciones básicas para revelado suave sin saturar móviles
  const revealUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-hidden selection:bg-primary selection:text-primary-foreground pt-8 md:pt-14 pb-32">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 w-full">
        
        {/* HEADER MINI-BAR AL ESTILO REVISTA */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="flex justify-between items-center border-b border-border py-4 font-mono text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground"
        >
          <span>{dict.about.header_loc_1}</span>
          <span className="hidden sm:inline-block">{dict.about.header_loc_2}</span>
          <span>{dict.about.header_loc_3}</span>
        </motion.div>

        {/* HERO SECTION - TIPOGRAFÍA EXTREMA PERO RESPIRABLE (Mobile First) */}
        <section className="relative py-12 md:py-24 border-b border-border">
          <motion.h1
            initial="hidden" animate="visible" variants={revealUp}
            className="text-[14vw] sm:text-[12vw] md:text-[9vw] leading-[0.85] font-black font-quilon uppercase tracking-tighter text-foreground text-center sm:text-left drop-shadow-sm flex flex-col items-center sm:items-start"
          >
            <span className="block text-primary">EL MOVIMIENTO</span>
            <span className="block">BORN IN LIMÓN</span>
          </motion.h1>
          
          <div className="mt-12 md:mt-20 flex flex-col md:flex-row justify-between items-center md:items-end gap-8">
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="font-mono text-sm md:text-base uppercase max-w-sm text-center md:text-left text-muted-foreground"
            >
              {dict.about.hero_subtitle_about}
            </motion.p>
            <motion.button 
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="bg-primary text-primary-foreground px-8 py-4 font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-primary/90 transition-colors w-full md:w-auto"
            >
              {dict.about.hero_btn_about}
            </motion.button>
          </div>
        </section>

        {/* MANIFESTO & MISSION STATEMENT - MEGA TEXT BLOCK */}
        <section className="py-20 md:py-32 border-b border-border">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={revealUp}
            className="flex flex-col gap-12"
          >
            <span className="font-mono text-xs text-primary uppercase tracking-widest">{dict.about.manifesto_label}</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight md:leading-[1.1] uppercase max-w-6xl">
              {dict.about.manifesto_title_1}{" "}
              <span className="text-primary font-bold">{dict.about.manifesto_title_2}</span>
            </h2>
            <p className="text-lg md:text-2xl font-light text-muted-foreground max-w-4xl leading-relaxed">
              {dict.about.mission_text}
            </p>
          </motion.div>
        </section>

        {/* ESTADÍSTICAS / INDICADORES TIPO DASHBOARD (De la referencia) */}
        <section className="border-b border-border">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0 }}
              className="py-12 flex flex-col items-center justify-center gap-4 group"
            >
              <span className="text-6xl md:text-8xl font-black font-quilon text-primary group-hover:scale-110 transition-transform duration-500">100</span>
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{dict.about.stat_1_label}</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="py-12 flex flex-col items-center justify-center gap-4 group"
            >
              <span className="text-6xl md:text-8xl font-black font-quilon text-primary group-hover:scale-110 transition-transform duration-500">2025</span>
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{dict.about.stat_2_label}</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="py-12 flex flex-col items-center justify-center gap-4 group"
            >
              <span className="text-6xl md:text-8xl font-black font-quilon text-primary group-hover:scale-110 transition-transform duration-500">∞</span>
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{dict.about.stat_3_label}</span>
            </motion.div>
          </div>
        </section>

        {/* MISION, VISION, VALORES (3 COLUMNS) */}
        <section className="py-20 md:py-32 border-b border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col border-t-2 border-primary pt-6">
              <span className="font-mono text-xs uppercase tracking-widest text-primary mb-6">[ 01 ]</span>
              <h3 className="text-3xl font-black font-quilon uppercase mb-6 tracking-tighter">{dict.about.core_mission_title}</h3>
              <p className="font-light text-muted-foreground leading-relaxed md:text-lg">{dict.about.core_mission_text}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="flex flex-col border-t-2 border-primary pt-6">
              <span className="font-mono text-xs uppercase tracking-widest text-primary mb-6">[ 02 ]</span>
              <h3 className="text-3xl font-black font-quilon uppercase mb-6 tracking-tighter">{dict.about.core_vision_title}</h3>
              <p className="font-light text-muted-foreground leading-relaxed md:text-lg">{dict.about.core_vision_text}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col border-t-2 border-primary pt-6">
              <span className="font-mono text-xs uppercase tracking-widest text-primary mb-6">[ 03 ]</span>
              <h3 className="text-3xl font-black font-quilon uppercase mb-6 tracking-tighter">{dict.about.core_values_title}</h3>
              <ul className="flex flex-col gap-6 font-mono text-sm uppercase tracking-wider text-foreground font-bold mt-2">
                <li className="flex items-center gap-4 group cursor-default"><span className="h-[2px] w-6 bg-primary group-hover:w-12 transition-all" /> {dict.about.core_value_1}</li>
                <li className="flex items-center gap-4 group cursor-default"><span className="h-[2px] w-6 bg-primary group-hover:w-12 transition-all" /> {dict.about.core_value_2}</li>
                <li className="flex items-center gap-4 group cursor-default"><span className="h-[2px] w-6 bg-primary group-hover:w-12 transition-all" /> {dict.about.core_value_3}</li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* BLOQUES CONTRASTANTES (White vs Colored Block style) */}
        <section className="py-20 md:py-32 border-b border-border flex flex-col gap-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
            <span className="font-mono text-xs text-primary uppercase tracking-widest">{dict.about.approach_label}</span>
            <h2 className="text-3xl md:text-4xl font-black font-quilon uppercase tracking-tighter text-right leading-none max-w-2xl">
              {dict.about.passion_title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0 border border-border">
            {/* White/Light Block (Para talentos con base) */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-background text-foreground p-8 md:p-16 flex flex-col justify-between min-h-[400px]"
            >
              <h3 className="text-3xl md:text-5xl font-black font-quilon uppercase mb-6 uppercase tracking-tight">
                {dict.about.vision_label} 
                <br /><span className="text-primary">{dict.about.vision_highlight}</span>
              </h3>
              <p className="text-sm md:text-base font-medium text-muted-foreground leading-relaxed font-mono">
                {dict.about.passion_p1} <br/><br/>
                {dict.about.passion_p2}
              </p>
            </motion.div>
            
            {/* Colored Block (El proceso) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-primary text-primary-foreground p-8 md:p-16 flex flex-col justify-between min-h-[400px] border-l-0 md:border-l border-t md:border-t-0 border-border md:border-primary"
            >
              <h3 className="text-3xl md:text-5xl font-black font-quilon uppercase mb-6 tracking-tight drop-shadow-md">
                {dict.about.process_title}
              </h3>
              <ul className="space-y-6 font-mono font-bold text-sm md:text-base uppercase border-t border-primary-foreground/20 pt-8 mt-auto">
                <li className="flex justify-between items-center group">
                  <span>01_ {dict.about.process_1}</span>
                  <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </li>
                <li className="flex justify-between items-center group text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  <span>02_ {dict.about.process_2}</span>
                  <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </li>
                <li className="flex justify-between items-center group text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  <span>03_ {dict.about.process_3}</span>
                  <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* LISTADO EXPANDIBLE "DIFFERENCES" (Estilo Syllabus) */}
        <section className="py-20 md:py-32">
          <div className="mb-16 md:mb-24 flex flex-col">
            <p className="text-primary font-mono text-xs uppercase mb-6 tracking-widest">{dict.about.diff_label}</p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium leading-tight uppercase max-w-4xl text-foreground">
              {dict.about.diff_title}
            </h2>
          </div>

          <div className="flex flex-col border-t border-border">
            <AccordionRow number="01" title={dict.about.diff_1_title} desc={dict.about.diff_1_desc} />
            <AccordionRow number="02" title={dict.about.diff_2_title} desc={dict.about.diff_2_desc} />
            <AccordionRow number="03" title={dict.about.diff_3_title} desc={dict.about.diff_3_desc} />
            <AccordionRow number="04" title={dict.about.diff_4_title} desc={dict.about.diff_4_desc} />
            <AccordionRow number="05" title={dict.about.diff_5_title} desc={dict.about.diff_5_desc} />
          </div>
        </section>

      </div>
    </div>
  );
}

// Componente para la lista de "Syllabus/Diferencias" interactiva
function AccordionRow({ number, title, desc }: { number: string; title: string; desc: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={false}
      animate={{ backgroundColor: isOpen ? "hsl(var(--primary) / 0.05)" : "transparent" }}
      className="border-b border-border border-dashed overflow-hidden transition-colors duration-300"
    >
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center py-6 md:py-8 cursor-pointer group px-2"
      >
        <div className="flex items-center gap-6 md:gap-12 w-full">
          <span className="font-mono text-xs md:text-sm text-muted-foreground group-hover:text-primary transition-colors w-6">
            {number}
          </span>
          <h3 className="text-lg md:text-2xl font-bold uppercase tracking-tight group-hover:text-primary transition-colors flex-grow">
            {title}
          </h3>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs opacity-0 md:opacity-100 group-hover:opacity-100 text-primary uppercase tracking-widest w-24 text-right transition-opacity">
            {isOpen ? "[ - ] Ocultar" : "[ + ] Explorar"}
          </span>
          <div className="h-8 w-8 flex items-center justify-center bg-muted group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
             <ArrowUpRight 
              size={18} 
              className={`transform transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} 
            />
          </div>
        </div>
      </div>
      
      {/* Contenido expandible */}
      <motion.div 
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="pl-14 md:pl-24 pr-4 pb-8 md:pb-12 text-sm md:text-lg font-light text-muted-foreground max-w-3xl">
          {desc}
        </div>
      </motion.div>
    </motion.div>
  );
}
