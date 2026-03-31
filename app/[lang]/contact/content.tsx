"use client";

import * as motion from "framer-motion/client";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

interface ContactContentProps {
  dict: any;
}

export default function ContactContent({ dict }: ContactContentProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simular el envío de formulario
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Form submitted! (Simulation)");
    }, 1500);
  };

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
          <span>{dict.about?.header_loc_1 || "[ LIMÓN, CR ]"}</span>
          <span>{dict.contact.header_sub}</span>
        </motion.div>

        {/* HERO SECTION - TIPOGRAFÍA EXTREMA (Mobile First) */}
        <section className="relative py-12 md:py-24 border-b border-border">
          <motion.h1
            initial="hidden" animate="visible" variants={revealUp}
            className="text-[14vw] sm:text-[12vw] md:text-[9vw] leading-[0.85] font-black font-quilon uppercase tracking-tighter text-foreground text-center sm:text-left drop-shadow-sm flex flex-col items-center sm:items-start"
          >
            <span className="block text-primary">{dict.contact.title_1}</span>
            {dict.contact.title_2 && <span className="block">{dict.contact.title_2}</span>}
          </motion.h1>
          
          <div className="mt-12 md:mt-20 flex justify-center sm:justify-start">
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="font-mono text-sm md:text-base uppercase max-w-sm text-center md:text-left text-muted-foreground"
            >
              {dict.contact.hero_desc}
            </motion.p>
          </div>
        </section>

        {/* MAIN SPLIT CONTENT */}
        <section className="py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-24">
            
            {/* LEFT COL: BRUTALIST FORM */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <form onSubmit={handleSubmit} className="flex flex-col gap-10 lg:pr-12">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-mono text-xs text-primary uppercase tracking-widest">{dict.contact.form_name}</label>
                  <input required type="text" id="name" className="bg-transparent border-b-2 border-border focus:border-primary text-xl font-medium placeholder:text-muted-foreground/30 rounded-none py-4 outline-none transition-colors" placeholder="John Doe" />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-mono text-xs text-primary uppercase tracking-widest">{dict.contact.form_email}</label>
                  <input required type="email" id="email" className="bg-transparent border-b-2 border-border focus:border-primary text-xl font-medium placeholder:text-muted-foreground/30 rounded-none py-4 outline-none transition-colors" placeholder="booking@umpmusic.com" />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="font-mono text-xs text-primary uppercase tracking-widest">{dict.contact.form_subject}</label>
                  <select required id="subject" defaultValue="" className="bg-transparent border-b-2 border-border focus:border-primary text-xl font-medium text-foreground py-4 outline-none transition-colors appearance-none cursor-pointer rounded-none">
                    <option value="" disabled className="text-muted-foreground">Seleccionar...</option>
                    <option value="booking" className="bg-background text-foreground">{dict.contact.form_subject_opt1}</option>
                    <option value="press" className="bg-background text-foreground">{dict.contact.form_subject_opt2}</option>
                    <option value="distribution" className="bg-background text-foreground">{dict.contact.form_subject_opt3}</option>
                    <option value="other" className="bg-background text-foreground">{dict.contact.form_subject_opt4}</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="font-mono text-xs text-primary uppercase tracking-widest">{dict.contact.form_message}</label>
                  <textarea required id="message" rows={4} className="bg-transparent border-b-2 border-border focus:border-primary text-xl font-medium placeholder:text-muted-foreground/30 rounded-none py-4 outline-none transition-colors resize-none" placeholder="..." />
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className="bg-primary text-primary-foreground px-8 py-5 font-black uppercase tracking-widest text-sm hover:bg-primary/90 transition-all border border-primary disabled:opacity-50 disabled:cursor-not-allowed group flex gap-4 items-center justify-center lg:justify-between w-full mt-4"
                >
                  <span className="flex-grow text-center lg:text-left">{isSubmitting ? "..." : dict.contact.form_submit}</span>
                  {!isSubmitting && <ArrowUpRight className="hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity" size={20} />}
                </motion.button>
              </form>
            </motion.div>

            {/* RIGHT COL: DIRECT INFO */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col gap-12 mt-12 lg:mt-0">
              <span className="font-mono text-xs text-primary uppercase tracking-widest inline-block">{dict.contact.info_title}</span>
              
              <div className="flex flex-col border-t-2 border-primary">
                <InfoRow label={dict.contact.info_email_label} value={dict.contact.info_email_val} isLink={true} href={`mailto:${dict.contact.info_email_val}`} />
                <InfoRow label={dict.contact.info_hq_label} value={dict.contact.info_hq_val} />
                
                <div className="border-b border-border border-dashed py-8 px-2 flex flex-col sm:flex-row gap-4 sm:items-center group">
                  <span className="font-mono text-xs md:text-sm text-muted-foreground uppercase tracking-widest w-32 md:w-40 shrink-0 group-hover:text-primary transition-colors">{dict.contact.info_social_label}</span>
                  <div className="flex gap-6 sm:gap-8 flex-wrap">
                    <SocialLink platform="Instagram" href="https://instagram.com" />
                    <SocialLink platform="Spotify" href="https://spotify.com" />
                    <SocialLink platform="YouTube" href="https://youtube.com" />
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

      </div>
    </div>
  );
}

// Subcomponents para reuso limpio

function InfoRow({ label, value, isLink, href }: { label: string; value: string; isLink?: boolean; href?: string }) {
  return (
    <div className="border-b border-border border-dashed flex flex-col md:flex-row md:items-center py-8 px-2 group cursor-default">
      <span className="font-mono text-xs md:text-sm text-muted-foreground uppercase tracking-widest w-40 shrink-0 mb-2 md:mb-0 transition-colors group-hover:text-primary">{label}</span>
      {isLink && href ? (
        <a href={href} className="text-xl md:text-2xl font-bold uppercase tracking-tight hover:text-primary transition-colors hover:underline">
          {value}
        </a>
      ) : (
        <span className="text-xl md:text-2xl font-bold uppercase tracking-tight group-hover:text-primary transition-colors">
          {value}
        </span>
      )}
    </div>
  );
}

function SocialLink({ platform, href }: { platform: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center group cursor-pointer">
      <span className="font-bold text-lg uppercase group-hover:text-primary transition-colors">{platform}</span>
      <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-primary transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 ml-1" />
    </a>
  );
}
