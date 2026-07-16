import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

interface CustomAccordionSection {
  id: string;
  number: string;
  title: string;
  quote: string;
  teaser: string;
  content: string;
  suit: string;
  cardTitle: string;
  cardItems: string[];
}

export default function AboutAccordion() {
  const [openSectionId, setOpenSectionId] = useState<string | null>(null);
  const [readMoreSectionId, setReadMoreSectionId] = useState<string | null>(null);

  const sections: CustomAccordionSection[] = [
    {
      id: 'phil',
      number: '01.',
      title: 'The Way I Think',
      quote: 'Every discipline is another way of solving the same problem.',
      teaser: "I don't collect disciplines. I collect perspectives.",
      content: "I don't separate design from engineering, or creativity from execution. Every product is a system where visuals, technology, interaction, and strategy should work together. The most interesting ideas emerge when disciplines stop competing and start collaborating.",
      suit: '♠',
      cardTitle: 'PRINCIPLES',
      cardItems: ['Curiosity', 'Clarity', 'Taste', 'Systems']
    },
    {
      id: 'tech',
      number: '02.',
      title: 'The Things I Build',
      quote: 'Ideas become real only when someone builds them.',
      teaser: 'A wireframe is just a promise. Software is the proof.',
      content: 'From the first wireframe to production deployment, I enjoy building products that people actually use. My work spans web applications, AI systems, automation, developer tools, and experimental interfaces.',
      suit: '♦',
      cardTitle: 'CURRENT STACK',
      cardItems: ['React', 'FastAPI', 'Postgres', 'AI Agents']
    },
    {
      id: 'art',
      number: '03.',
      title: 'Design Beyond Screens',
      quote: 'Good design is understood before it\'s noticed.',
      teaser: 'Design is how things work, not just how they look.',
      content: "Design isn't decoration—it's how people understand products. Whether it's an interface, a brand, a shoe concept, or a miniature architectural model, I focus on clarity, proportion, and storytelling.",
      suit: '♥',
      cardTitle: 'FIELDS',
      cardItems: ['Product', 'Brand', 'Footwear', '3D', 'Interfaces']
    },
    {
      id: 'sound',
      number: '04.',
      title: "What I'm Exploring",
      quote: 'Curiosity has no roadmap.',
      teaser: 'The frontier isn\'t ahead. It\'s wherever you look closer.',
      content: "My best work often begins as an experiment. I'm constantly exploring AI-native products, memory systems, creative tools, computational design, and new ways for humans and software to collaborate.",
      suit: '♣',
      cardTitle: 'NOW LEARNING',
      cardItems: ['Memory Systems', 'Spatial UI', 'Generative Design', 'Human-AI Collaboration']
    },
    {
      id: 'contact',
      number: '05.',
      title: 'Working Together',
      quote: 'The best partnerships are built on curiosity and craft.',
      teaser: 'The best work isn\'t commissioned. It\'s co-authored.',
      content: "Whether you're building a startup, refining a product, or exploring an ambitious idea, I enjoy collaborating with people who value thoughtful execution as much as bold thinking.",
      suit: '♠',
      cardTitle: 'THE CARD',
      cardItems: ['Product partnerships', 'Freelance collaborations', 'Creative consulting', 'Open to interesting ideas']
    }
  ];

  const toggleSection = (id: string) => {
    if (openSectionId === id) {
      setOpenSectionId(null);
      setReadMoreSectionId(null);
    } else {
      setOpenSectionId(id);
      setReadMoreSectionId(null); // reset read more state so they enter "curious" mode
    }
  };

  return (
    <div className="w-full space-y-0 divide-y divide-app-border/40 border-t border-b border-app-border/40 select-none">
      {sections.map((section, idx) => {
        const isOpen = openSectionId === section.id;
        const hasReadMore = readMoreSectionId === section.id;
        
        // Alternating tilt angles for physical card effect on hover
        const tiltAngle = idx % 2 === 0 ? 0.8 : -0.8;

        const isRedSuit = section.suit === '♥' || section.suit === '♦';
        const suitColorClass = isRedSuit ? 'text-red-500/80' : 'text-app-text/80';

        return (
          <motion.div 
            key={section.id} 
            className="group overflow-hidden relative"
            whileHover={{ 
              rotate: isOpen ? 0 : tiltAngle, 
              scale: 1.002,
              x: isOpen ? 0 : tiltAngle * 3
            }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
          >
            {/* Custom line that brightens on hover */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-app-border/20 group-hover:bg-app-border-strong/60 transition-colors duration-300 pointer-events-none" />

            <button
              onClick={() => toggleSection(section.id)}
              className="w-full py-8 flex items-center justify-between text-left focus:outline-none transition-all duration-300 px-2"
            >
              <div className="flex items-baseline space-x-6">
                {/* Clean index number that shifts left slightly on hover */}
                <span className="font-mono text-xs md:text-sm text-app-text-dim/60 font-light tracking-widest transition-transform duration-300 group-hover:-translate-x-[6px]">
                  {section.number}
                </span>
                
                {/* Title that fades to clean white on hover */}
                <span className="font-sans text-lg md:text-xl font-light tracking-wide text-app-text/85 group-hover:text-white transition-colors duration-300">
                  {section.title}
                </span>
              </div>

              {/* Plus icon rotating to minus, or 45 degrees */}
              <div className="text-app-text-dim group-hover:text-white transition-colors duration-300 pr-2">
                <motion.div
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Plus size={18} />
                </motion.div>
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="pb-10 pt-2 px-2 md:pl-14 text-app-text-body font-sans leading-relaxed text-sm md:text-base grid md:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Column: Quiet Manifesto & Storytelling */}
                    <div className="md:col-span-7 flex flex-col justify-start">
                      {/* Section Quote */}
                      <p className="text-app-text-muted/60 font-light italic text-xs md:text-sm mb-4 leading-relaxed max-w-md">
                        "{section.quote}"
                      </p>

                      {/* Teaser text / Curious trigger */}
                      <p className="text-base md:text-lg text-app-text font-light tracking-wide leading-relaxed max-w-md">
                        {section.teaser}
                      </p>

                      {/* Read More button expanding to full deck content */}
                      {!hasReadMore ? (
                        <button
                          onClick={() => setReadMoreSectionId(section.id)}
                          className="mt-6 flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-app-text-dim hover:text-white group/btn transition-colors duration-200 focus:outline-none"
                        >
                          <span>Read Details</span>
                          <motion.span
                            animate={{ y: [0, 4, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                          >
                            ↓
                          </motion.span>
                        </button>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          className="mt-4 border-t border-app-border/20 pt-4"
                        >
                          <p className="text-sm md:text-base text-app-text-muted/90 font-light tracking-wide leading-relaxed max-w-md">
                            {section.content}
                          </p>
                        </motion.div>
                      )}
                    </div>

                    {/* Right Column: Custom Playing Card */}
                    <div className="md:col-span-5 flex justify-center md:justify-end min-h-[280px]">
                      {hasReadMore ? (
                        <motion.div
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                          className="relative w-full max-w-[200px] aspect-[2.5/3.5] bg-app-card-bg-elevated border border-app-border-strong rounded-[14px] p-4 flex flex-col justify-between font-mono text-xs select-none shadow-2xl backdrop-blur-sm group/card overflow-hidden"
                        >
                          {/* Animated SVG border drawing */}
                          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <motion.rect
                              x="0.5"
                              y="0.5"
                              width="99"
                              height="99"
                              rx="6"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1"
                              className="text-app-border/60"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.15 }}
                            />
                          </svg>

                          {/* Card Suit & Value - Top Left */}
                          <div className="flex flex-col items-center self-start leading-none">
                            <span className="text-xs font-semibold tracking-tighter">J</span>
                            <span className={`text-sm ${suitColorClass}`}>{section.suit}</span>
                          </div>
                          
                          {/* Card Center - Title & Items */}
                          <div className="flex flex-col items-center justify-center py-4 text-center my-auto z-10">
                            <h5 className="text-[9px] uppercase tracking-widest text-app-text-dim mb-3 font-semibold border-b border-app-border/20 pb-1 px-2">
                              {section.cardTitle}
                            </h5>
                            <ul className="space-y-1.5 text-[10px] text-app-text/90 font-light">
                              {section.cardItems.map((item, tagIdx) => (
                                <motion.li
                                  key={tagIdx}
                                  className="tracking-wide"
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.3 + tagIdx * 0.1, duration: 0.4 }}
                                >
                                  {item}
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                          
                          {/* Card Suit & Value - Bottom Right */}
                          <div className="flex flex-col items-center self-end leading-none rotate-180">
                            <span className="text-xs font-semibold tracking-tighter">J</span>
                            <span className={`text-sm ${suitColorClass}`}>{section.suit}</span>
                          </div>
                        </motion.div>
                      ) : (
                        <div className="hidden md:flex w-full max-w-[200px] aspect-[2.5/3.5] rounded-[14px] border border-app-border/30 bg-app-card-bg/35 items-center justify-center font-mono text-[9px] text-app-text-dim/60 tracking-widest">
                          [ CARD FACE DOWN ]
                        </div>
                      )}
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

