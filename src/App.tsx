import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowUpRight,
  Sparkles,
  Plus,
  MessageSquare,
  Send,
  Check,
  Heart,
  Mail,
  Instagram,
  Github,
  Copy
} from 'lucide-react';

import PlayingCard from './components/PlayingCard';
import AboutAccordion from './components/AboutAccordion';
import WorkGrid from './components/WorkGrid';
import AiCompanion from './components/AiCompanion';
import Navigation from './components/Navigation';
import { Project } from './types';
import { projects } from './data/projects';
import jackImage from '../assets/.aistudio/jack.png';
import priyankImage from '../assets/.aistudio/priyank.png';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactInterests, setContactInterests] = useState<string[]>([]);
  const [contactProjectStage, setContactProjectStage] = useState('');
  const [contactStory, setContactStory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  // States for Hero Interaction Cohesion
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isHeadlineHovered, setIsHeadlineHovered] = useState(false);
  const [scrollRotation, setScrollRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Rotate up to 2 degrees based on scroll position (300px of scroll rotates 2 degrees)
      const rotation = Math.min(2, Math.max(-2, (window.scrollY / 300) * 2));
      setScrollRotation(rotation);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  // Custom Cursor state and smooth tracking
  const cursorRef = React.useRef<HTMLDivElement>(null);
  const cursorRingRef = React.useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorRing = cursorRingRef.current;
    if (!cursor || !cursorRing) return;

    let cursorX = -100;
    let cursorY = -100;
    let ringX = -100;
    let ringY = -100;

    const onMouseMove = (e: MouseEvent) => {
      cursorX = e.clientX;
      cursorY = e.clientY;

      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
    };

    let animationFrameId: number;
    const animateRing = () => {
      ringX += (cursorX - ringX) * 0.15;
      ringY += (cursorY - ringY) * 0.15;

      if (cursorRing) {
        cursorRing.style.left = `${ringX}px`;
        cursorRing.style.top = `${ringY}px`;
      }

      animationFrameId = requestAnimationFrame(animateRing);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive = target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer') !== null;
      setIsHovering(isInteractive);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    animateRing();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail.trim() || !contactStory.trim()) return;

    setIsSubmitting(true);

    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdvobImOiRQwvk4RYWpIf_R6gqw3v9IJNrOD6xTvSxXk0FYVg/formResponse';
    const formData = new URLSearchParams();
    formData.append('entry.1832554151', contactName);
    formData.append('entry.1582321881', contactEmail);
    
    // Multi-select goals/focus
    contactInterests.forEach((interest) => {
      formData.append('entry.1088163848', interest);
    });

    // Project Stage
    formData.append('entry.234642022', contactProjectStage);

    // Current State/Mood
    formData.append('entry.1836483478', contactStory);

    try {
      await fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
      setContactName('');
      setContactEmail('');
      setContactInterests([]);
      setContactProjectStage('');
      setContactStory('');
      
      // Reset success state after a few seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      
      // Fallback: still show the success message to the user
      setIsSubmitted(true);
      setContactName('');
      setContactEmail('');
      setContactInterests([]);
      setContactProjectStage('');
      setContactStory('');
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-app-bg min-h-screen text-app-text font-sans antialiased relative transition-colors duration-300">

      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className={`cursor hidden md:block ${isHovering ? 'hovering' : ''}`}
      />
      <div
        ref={cursorRingRef}
        className={`cursor-ring hidden md:block ${isHovering ? 'hovering' : ''}`}
      />

      {/* 1. Viewport Outer Framing (Desktop & Mobile Sidebars) */}
      <div className="fixed top-0 left-0 bottom-0 w-6 md:w-12 border-r border-app-border flex flex-col items-center justify-between py-12 z-40 bg-app-bg transition-colors duration-300 select-none">
        <div className="my-auto" />
        <div className="text-app-text-dim text-[9px]">♠</div>
      </div>
      <div className="fixed top-0 right-0 bottom-0 w-6 md:w-12 border-l border-app-border flex flex-col items-center justify-between py-12 z-40 bg-app-bg transition-colors duration-300 select-none">
        <div className="my-auto" />
        <div className="text-app-text-dim text-[9px]">♥</div>
      </div>

      {/* Main Content Wrapper (Compensates for fixed sidebars on all screen sizes) */}
      <div className="pl-6 pr-6 md:pl-12 md:pr-12 min-h-screen flex flex-col">

        {/* 2. Global Editorial Header */}
        <header className="w-full max-w-7xl mx-auto px-6 md:px-12 py-8 flex justify-between items-center z-30 select-none">
          {/* Card Suits Brand Indicator */}
          <div className="flex items-center space-x-3 text-sm text-app-text font-mono tracking-widest">
            <span className="hover:text-red-500 transition-colors cursor-default">♠</span>
            <span className="hover:text-red-500 transition-colors cursor-default">♦</span>
            <span className="hover:text-red-500 transition-colors cursor-default">♣</span>
            <span className="hover:text-red-500 transition-colors cursor-default">♥</span>
          </div>

          {/* Custom Theme Switcher Toggle & Navigation grouped together */}
          <div className="flex items-center space-x-6 z-30">
            {/* Custom Theme Switcher Sliding Toggle */}
            <div
              onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
              className="relative w-16 h-9 bg-[#222222] rounded-full p-1 flex items-center cursor-pointer select-none transition-colors duration-300 shadow-inner hover:scale-[1.03] active:scale-[0.97]"
              title="Toggle theme"
            >
              {/* Crescent Moon Icon */}
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              </div>

              {/* Sun/Light mode icon (visible when thumb is on the right) */}
              <div className="absolute left-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 text-neutral-400 transition-opacity duration-300 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}>
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              </div>

              {/* Sliding Thumb */}
              <motion.div
                className="w-7 h-7 bg-white rounded-full shadow-sm pointer-events-none"
                animate={{
                  x: theme === 'light' ? 0 : 28
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 28 }}
              />
            </div>

            {/* Custom Fullscreen Navigation & Animated Hamburger Button */}
            <Navigation scrollToSection={scrollToSection} />
          </div>
        </header>

        {/* 3. Hero / Brand Segment */}
        <main className="flex-1 flex flex-col justify-center w-full border-b border-app-border py-12 md:py-20">
          <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Image Placeholder Area */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start">
              <motion.div
                onMouseEnter={() => setIsCardHovered(true)}
                onMouseLeave={() => setIsCardHovered(false)}
                animate={{
                  rotate: (scrollRotation || 0) + (isHeadlineHovered ? -2.5 : 0),
                  scale: isHeadlineHovered ? 1.025 : 1,
                  y: isHeadlineHovered ? -4 : 0
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                className="relative w-full max-w-[360px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-neutral-900 border border-app-border/20 group cursor-default"
              >
                <img
                  src={jackImage}
                  alt="Priyank Verma - The Jack"
                  className="w-full h-full object-cover opacity-100 md:grayscale md:opacity-50 md:group-hover:scale-105 md:group-hover:grayscale-0 md:group-hover:opacity-75 transition-all duration-700 ease-[0.16, 1, 0.3, 1]"
                  referrerPolicy="no-referrer"
                />

                {/* Premium Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              </motion.div>
            </div>

            {/* Typography taglines */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <motion.div
                onMouseEnter={() => setIsHeadlineHovered(true)}
                onMouseLeave={() => setIsHeadlineHovered(false)}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-app-text-dim/80 font-medium select-none mb-2">
                  Priyank Verma
                </div>
                <motion.h1
                  animate={{
                    scale: isCardHovered ? 1.015 : 1,
                    x: isCardHovered ? 8 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                  className="font-serif text-4xl md:text-6xl xl:text-7xl font-light text-app-text leading-[1.08] tracking-tight"
                >
                  Jack of all trades.
                  <span className={`block italic mt-1 transition-all duration-500 ${isCardHovered ? 'text-app-text/100 scale-[1.005] origin-left' : 'text-app-text-muted'}`}>Master of building.</span>
                  <span className={`block mt-1 font-normal transition-all duration-500 ${isCardHovered ? 'text-app-text scale-[1.005] origin-left' : 'text-app-text-dim'}`}>Limited by none.</span>
                </motion.h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                className="max-w-xl text-app-text-body text-sm md:text-base font-light leading-relaxed space-y-4 font-sans"
              >
                <p>
                  I design, engineer, prototype, and ship products where software, AI, and business strategy converge.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="pt-4 flex flex-wrap gap-4"
              >
                <button
                  onClick={() => scrollToSection('work')}
                  className="bg-app-inverse-bg text-app-inverse-text font-mono text-xs uppercase tracking-widest px-6 py-4 rounded-full font-medium hover:bg-app-inverse-hover transition-colors cursor-pointer flex items-center space-x-2 shadow-sm"
                >
                  <span>Explore the Deck</span>
                  <span>↓</span>
                </button>
              </motion.div>
            </div>
          </div>
        </main>

        {/* 4. About & Biography Segment */}
        <section id="about" className="w-full border-b border-app-border py-20 md:py-32">
          <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col space-y-16">

            {/* Section Heading */}
            <div className="space-y-4">
              <span className="font-mono text-[10px] text-app-text-dim uppercase tracking-[0.3em] block">
                Origins
              </span>
            </div>

            {/* Top Bio Block: Left Text, Right Portrait */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-stretch">

              {/* Biography Text Block */}
              <div className="md:col-span-8 text-app-text-body font-light text-base md:text-lg leading-relaxed space-y-4">
                <p>
                  I wasn't interested in collecting job titles.
                  <br /><br />
                  I was interested in understanding how ideas become reality.
                  <br /><br />
                  A sketch becomes a prototype.
                  <br />
                  A prototype becomes software.
                  <br />
                  Software becomes a company.
                  <br />
                  A company becomes a brand.
                  <br /><br />
                  Somewhere along the way, I stopped seeing disciplines as separate things.
                  <br /><br />
                  I started seeing them as different cards from the same deck.
                </p>
              </div>

              {/* Image Placeholder Column */}
              <div className="md:col-span-4 flex justify-center md:justify-end">
                <div className="w-full max-w-[280px] h-full min-h-[350px] md:min-h-0 relative flex items-center justify-center group select-none">
                  <img
                    src={priyankImage}
                    alt="Priyank Verma - Origins"
                    className="w-full h-full object-cover opacity-100 md:opacity-90 md:group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle, elegant overlay for modern aesthetic */}
                  <div className="absolute inset-0 bg-gradient-to-t from-app-bg via-transparent to-transparent opacity-80 pointer-events-none" />
                </div>
              </div>

            </div>

            {/* Bottom Accordion Block: Full-width */}
            <div className="w-full pt-4">
              <AboutAccordion />
            </div>

          </div>
        </section>

        {/* 5. Work Grid Segment */}
        <section id="work" className="w-full border-b border-app-border py-20 md:py-32">
          <div className="max-w-7xl mx-auto w-full px-6 md:px-12">
            <span className="font-mono text-[10px] text-app-text-dim uppercase tracking-[0.3em] block mb-12 text-left">
              The Deck
            </span>
            <WorkGrid onSelectProject={(proj) => setSelectedProject(proj)} />
          </div>
        </section>

        {/* 6. Contact & Collaboration Segment */}
        <section id="contact" className="w-full py-20 md:py-32">
          <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* Meta details */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <span className="font-mono text-[10px] text-app-text-dim uppercase tracking-[0.3em] block">
                Your Move
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-app-text tracking-tight leading-none">
                Every remarkable project begins with a single conversation.
              </h2>
              <p className="text-app-text-body font-light text-sm md:text-base leading-relaxed">
                Whether you're building a company, refining a product, exploring an AI idea, or simply looking for someone who can connect design, engineering, and strategy—I'd love to hear your story.
              </p>

              <div className="space-y-4 pt-4">
                <a
                  href="mailto:priyankv489@gmail.com"
                  className="flex items-center space-x-3 text-app-text md:text-app-text-muted md:hover:text-app-text transition-colors text-xs font-mono tracking-wider"
                >
                  <Mail size={16} className="text-app-text-dim" />
                  <span>PRIYANKV489@GMAIL.COM</span>
                </a>
                <a
                  href="https://github.com/faltuinsaaan"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-3 text-app-text md:text-app-text-muted md:hover:text-app-text transition-colors text-xs font-mono tracking-wider"
                >
                  <Github size={16} className="text-app-text-dim" />
                  <span>GITHUB / faltuinsaaan</span>
                </a>
                <a
                  href="https://www.instagram.com/aiknpry/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-3 text-app-text md:text-app-text-muted md:hover:text-app-text transition-colors text-xs font-mono tracking-wider"
                >
                  <Instagram size={16} className="text-app-text-dim" />
                  <span>INSTAGRAM / @aiknpry</span>
                </a>
              </div>

              <div className="pt-10 border-t border-app-border/30 mt-10 max-w-xs">
                <p className="text-app-text-muted/60 font-light italic text-sm md:text-base leading-relaxed tracking-wide space-y-1">
                  <span className="block">The Jack doesn't collect skills.</span>
                  <span className="block">It collects perspectives.</span>
                  <span className="block">Every project is another card added to the deck.</span>
                </p>
              </div>
            </div>

            {/* Elegant Minimalist Contact Form */}
            <div className="lg:col-span-7 p-0 relative transition-colors duration-300">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleContactSubmit}
                    className="space-y-8 text-left"
                    style={{
                      fontFamily: '"Plus Jakarta Sans", sans-serif',
                    }}
                  >
                    {/* Form Inputs (Name & Email) */}
                    <div
                      className="form__inputs tr-1 flex flex-col md:flex-row gap-6 md:gap-8"
                      style={{
                        marginBottom: "2rem",
                      }}
                    >
                      <div
                        className="text-input flex-1"
                        style={{
                          boxSizing: "border-box",
                        }}
                      >
                        <label
                          htmlFor="Name & Company"
                          className="font-sans text-xs uppercase tracking-widest text-app-text-muted"
                          style={{
                            fontWeight: 500,
                            display: "block",
                            marginBottom: "0.5rem",
                          }}
                        >
                          Who are you?
                        </label>
                        <input
                          id="Name & Company"
                          name="entry.1832554151"
                          type="text"
                          required
                          placeholder="John from Apple"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          className="w-full bg-transparent text-app-text focus:outline-none focus:border-app-text transition-colors py-3"
                          style={{
                            borderBottom: `.0625rem solid ${theme === 'light' ? '#eaeaea' : '#2a2a2a'}`,
                            fontSize: "0.875rem",
                            fontWeight: 400,
                          }}
                        />
                      </div>

                      <div
                        className="text-input flex-1"
                        style={{
                          boxSizing: "border-box",
                        }}
                      >
                        <label
                          htmlFor="Your Email"
                          className="font-sans text-xs uppercase tracking-widest text-app-text-muted"
                          style={{
                            fontWeight: 500,
                            display: "block",
                            marginBottom: "0.5rem",
                          }}
                        >
                          Your Email
                        </label>
                        <input
                          id="Your Email"
                          name="entry.1582321881"
                          type="email"
                          required
                          placeholder="john@apple.com"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          className="w-full bg-transparent text-app-text focus:outline-none focus:border-app-text transition-colors py-3"
                          style={{
                            borderBottom: `.0625rem solid ${theme === 'light' ? '#eaeaea' : '#2a2a2a'}`,
                            fontSize: "0.875rem",
                            fontWeight: 400,
                          }}
                        />
                      </div>
                    </div>

                    {/* I'm interested in... section */}
                    <div
                      className="form__interested"
                      style={{
                        marginBottom: "2rem",
                      }}
                    >
                      <h5
                        className="font-serif text-lg text-app-text tracking-tight mb-4"
                        style={{
                          fontWeight: 500,
                        }}
                      >
                        What brings you here?
                      </h5>
                      <div
                        className="flex flex-wrap"
                        style={{
                          margin: "-0.4rem",
                          maxWidth: "100%",
                        }}
                      >
                        {[
                          "Building a product",
                          "AI & Automation",
                          "Design System",
                          "Brand Identity",
                          "Creative Direction",
                          "Technical Consulting",
                          "Something Different"
                        ].map((interest) => {
                          const isChecked = contactInterests.includes(interest);
                          return (
                            <button
                              key={interest}
                              type="button"
                              onClick={() => {
                                setContactInterests(prev =>
                                  prev.includes(interest)
                                    ? prev.filter(item => item !== interest)
                                    : [...prev, interest]
                                );
                              }}
                              className={`px-5 py-3 rounded-full text-xs md:text-sm font-medium tracking-wide border transition-all duration-300 select-none cursor-pointer hover:scale-[1.02] active:scale-[0.98]
                                ${isChecked
                                  ? 'bg-app-text text-app-bg border-app-text shadow-md font-semibold'
                                  : 'bg-app-card-bg/50 text-app-text border-app-border hover:border-app-border-strong hover:bg-app-card-bg'
                                }
                              `}
                              style={{
                                margin: "0.4rem",
                              }}
                            >
                              {interest}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Project budget section */}
                    <div
                      className="form__budget"
                      style={{
                        marginBottom: "2rem",
                      }}
                    >
                      <h5
                        className="font-serif text-lg text-app-text tracking-tight mb-4"
                        style={{
                          fontWeight: 500,
                        }}
                      >
                        Project Stage
                      </h5>
                      <div
                        className="flex flex-wrap"
                        style={{
                          margin: "-0.4rem",
                          maxWidth: "100%",
                        }}
                      >
                        {[
                          "Just an idea",
                          "Prototype",
                          "Growing",
                          "Existing Product"
                        ].map((stage) => {
                          const isChecked = contactProjectStage === stage;
                          return (
                            <button
                              key={stage}
                              type="button"
                              onClick={() => setContactProjectStage(stage)}
                              className={`px-5 py-3 rounded-full text-xs md:text-sm font-medium tracking-wide border transition-all duration-300 select-none cursor-pointer hover:scale-[1.02] active:scale-[0.98]
                                ${isChecked
                                  ? 'bg-app-text text-app-bg border-app-text shadow-md font-semibold'
                                  : 'bg-app-card-bg/50 text-app-text border-app-border hover:border-app-border-strong hover:bg-app-card-bg'
                                }
                              `}
                              style={{
                                margin: "0.4rem",
                              }}
                            >
                              {stage}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Tell us more about your project section */}
                    <div
                      className="form__project tr-6"
                      style={{
                        marginBottom: "2rem",
                        opacity: 1,
                        transform: "none",
                        transition: "transform 0.5s 0.9s, opacity 0.3s 0.9s",
                      }}
                    >
                      <div
                        className="text-input"
                        style={{
                          boxSizing: "border-box",
                          width: "100%",
                        }}
                      >
                        <label
                          htmlFor="Tell us more about your project"
                          className="font-sans text-xs uppercase tracking-widest text-app-text-muted"
                          style={{
                            fontWeight: 500,
                            display: "block",
                            marginBottom: "0.5rem",
                          }}
                        >
                          Tell me your story.
                        </label>
                        <input
                          id="Tell us more about your project"
                          name="entry.1836483478"
                          type="text"
                          required
                          placeholder="What's the idea? What's exciting about it? What's blocking you?"
                          value={contactStory}
                          onChange={(e) => setContactStory(e.target.value)}
                          className="w-full bg-transparent text-app-text focus:outline-none focus:border-app-text transition-colors py-3"
                          style={{
                            borderBottom: `.0625rem solid ${theme === 'light' ? '#eaeaea' : '#2a2a2a'}`,
                            fontSize: "0.875rem",
                            fontWeight: 400,
                          }}
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div
                      className="button-pulse tr-7 sbmt-btn"
                      style={{
                        position: "relative",
                        width: "fit-content",
                        marginTop: "1.5rem",
                      }}
                    >
                      <button
                        className="button relative group overflow-hidden"
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                          cursor: "pointer",
                          background: theme === 'light' ? '#000000' : '#ffffff',
                          borderRadius: "6.25rem",
                          padding: "1.125rem 2.25rem",
                          alignItems: "center",
                          color: theme === 'light' ? '#ffffff' : '#000000',
                          display: "flex",
                          fontFamily: '"Plus Jakarta Sans", sans-serif',
                          fontWeight: 600,
                          justifyContent: "center",
                        }}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center space-x-2">
                            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                          </div>
                        ) : (
                          <span
                            className="text"
                            style={{
                              margin: "0px 0.25rem",
                              display: "flex",
                              fontSize: "0.9375rem",
                              maxWidth: "15rem",
                              opacity: 1,
                            }}
                          >
                            Deal the First Card
                          </span>
                        )}
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4"
                  >
                    <div className="w-12 h-12 bg-app-card-hover border border-app-text rounded-full flex items-center justify-center text-emerald-500">
                      <Check size={20} />
                    </div>
                    <h3 className="font-serif text-2xl text-app-text">Your Move Has Been Received</h3>
                    <p className="font-mono text-xs text-app-text-muted max-w-sm leading-relaxed">
                      The conversation has begun.
                      I'll respond to the email you provided shortly.                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </section>

        <footer className="w-full border-t border-app-border py-12 select-none">
          <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-[10px] sm:text-xs font-mono text-app-text-dim space-y-4 md:space-y-0 text-center md:text-left">
            <span>© 2026 Priyank Verma · Crafted with curiosity.</span>
            <div className="flex space-x-6">
              <span>♠ Imagine</span>
              <span>♥ Design</span>
              <span>♦ Build</span>
              <span>♣ Evolve</span>
            </div>
          </div>
        </footer>
      </div>

      {/* 7. Full-Screen Sliding Project Details Panel (Matches Image 4 exactly!) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-app-bg flex flex-col pl-6 pr-6 md:pl-12 md:pr-12"
          >
            {/* Inner frame borders for Project details view */}
            <div className="fixed top-0 left-0 bottom-0 w-6 md:w-12 border-r border-app-border pointer-events-none" />
            <div className="fixed top-0 right-0 bottom-0 w-6 md:w-12 border-l border-app-border pointer-events-none" />

            {/* Back Bar */}
            <div className="w-full border-b border-app-border z-10">
              <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex justify-between items-center">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="flex items-center space-x-3 text-app-text md:text-app-text-muted md:hover:text-app-text font-mono text-xs uppercase tracking-widest cursor-pointer group"
                >
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                  <span>Back to The Deck</span>
                </button>
                <span className="font-mono text-[9px] text-app-text-dim uppercase tracking-[0.2em]">
                  CARD 0{selectedProject.id.split('-')[1]} // {selectedProject.year}
                </span>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto scrollbar-none pb-24">
              <div className="max-w-4xl mx-auto w-full px-6 md:px-12 py-12 lg:py-16 space-y-16">

                {/* 01 Landing Page (Mock Browser Window) */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <span className="font-mono text-[10px] text-app-text-dim uppercase tracking-[0.25em] block">
                      {selectedProject.category} // 01 LANDING PAGE
                    </span>
                    <h2 className="font-serif text-4xl md:text-5xl xl:text-6xl text-app-text tracking-tight leading-none">
                      {selectedProject.title}
                    </h2>
                    <p className="font-serif italic text-app-text-muted text-lg md:text-xl font-light">
                      {selectedProject.subtitle}
                    </p>
                  </div>

                  {/* Browser Window Mockup Container */}
                  <div className="w-full flex flex-col rounded-xl overflow-hidden border border-[#2e2e2e] shadow-2xl">
                    {/* Browser Window Frame */}
                    <div className="w-full bg-[#161616] border-b border-[#2e2e2e] px-4 py-3 flex items-center space-x-2">
                      <div className="flex space-x-1.5 flex-shrink-0">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#eab308]/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]/80" />
                      </div>
                      {selectedProject.link ? (
                        <a
                          href={selectedProject.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-[#0f0f0f] hover:bg-[#141414] border border-[#2e2e2e] rounded py-1 px-4 text-center font-mono text-[9px] text-white md:text-app-text-dim md:hover:text-white tracking-wider max-w-sm md:max-w-md mx-auto truncate transition-colors cursor-pointer block"
                          style={{ textDecoration: 'none' }}
                        >
                          {selectedProject.link}
                        </a>
                      ) : (
                        <div className="flex-1 bg-[#0f0f0f] border border-[#2e2e2e] rounded py-1 px-4 text-center font-mono text-[9px] text-app-text-dim tracking-wider max-w-sm md:max-w-md mx-auto truncate">
                          https://{selectedProject.title.toLowerCase().replace(/[^a-z0-9]/g, '')}.studio
                        </div>
                      )}
                    </div>
                    {/* Browser Window Body (Image) */}
                    <div className="bg-app-card-bg aspect-[16/10] relative overflow-hidden group">
                      <img
                        src={selectedProject.image}
                        alt={`${selectedProject.title} Landing Page`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-1000"
                      />
                    </div>
                  </div>
                </div>

                {/* Editorial Copy & Spec Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 items-start">
                  {/* Copy Column */}
                  <div className="lg:col-span-8 space-y-8 text-left">
                    <div>
                      <h4 className="font-mono text-[9px] text-app-text-dim uppercase tracking-[0.25em] mb-4">THE CONCEPT</h4>
                      <p className="font-serif italic text-lg md:text-xl text-app-text-body leading-relaxed">
                        {selectedProject.description}
                      </p>
                    </div>

                    {selectedProject.challenge && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-app-border/40 pt-8">
                        <div className="space-y-2">
                          <h5 className="font-mono text-[9px] text-app-text-dim uppercase tracking-[0.25em]">THE CHALLENGE</h5>
                          <p className="font-sans text-sm md:text-base font-light text-app-text-muted leading-relaxed whitespace-pre-line">
                            {selectedProject.challenge}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h5 className="font-mono text-[9px] text-app-text-dim uppercase tracking-[0.25em]">THE APPROACH</h5>
                          <p className="font-sans text-sm md:text-base font-light text-app-text-muted leading-relaxed whitespace-pre-line">
                            {selectedProject.approach}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Spec Sheet Column */}
                  <div className="lg:col-span-4 space-y-6 bg-app-card-hover/30 border border-app-border/50 p-6 rounded-xl font-mono text-[11px] text-left">
                    <div>
                      <span className="text-app-text-dim uppercase tracking-widest text-[9px] block mb-2 font-semibold">MY ROLE</span>
                      <div className="space-y-1.5">
                        {selectedProject.role.split(/(?:, | & | and )/).map((r, i) => (
                          <span key={i} className="block text-app-text font-light">{r.trim()}</span>
                        ))}
                      </div>
                    </div>

                    {selectedProject.creativeTech && (
                      <div className="border-t border-app-border/40 pt-4 space-y-3">
                        <span className="text-app-text-dim uppercase tracking-widest text-[9px] block font-semibold">TECHNOLOGY STACK</span>
                        <div className="space-y-2">
                          <div className="space-y-0.5">
                            <span className="text-[9px] text-app-text-dim/60 block lowercase">creative</span>
                            <div className="text-app-text font-light">{selectedProject.creativeTech.join(', ')}</div>
                          </div>
                          {selectedProject.devTech && (
                            <>
                              <div className="text-app-text-dim/30 text-center select-none">↓</div>
                              <div className="space-y-0.5">
                                <span className="text-[9px] text-app-text-dim/60 block lowercase">development</span>
                                <div className="text-app-text font-light">{selectedProject.devTech.join(', ')}</div>
                              </div>
                            </>
                          )}
                          {selectedProject.deploymentTech && (
                            <>
                              <div className="text-app-text-dim/30 text-center select-none">↓</div>
                              <div className="space-y-0.5">
                                <span className="text-[9px] text-app-text-dim/60 block lowercase">deployment</span>
                                <div className="text-app-text font-light">{selectedProject.deploymentTech.join(', ')}</div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    {selectedProject.metricsFocus && (
                      <div className="border-t border-app-border/40 pt-4 space-y-3">
                        <span className="text-app-text-dim uppercase tracking-widest text-[9px] block font-semibold">METRICS</span>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-[9px] text-app-text-dim/60 block lowercase">focus</span>
                            <div className="text-app-text font-light">{selectedProject.metricsFocus}</div>
                          </div>
                          <div>
                            <span className="text-[9px] text-app-text-dim/60 block lowercase">status</span>
                            <div className="text-app-text font-light flex items-center space-x-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              <span>{selectedProject.metricsStatus}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <span className="text-[9px] text-app-text-dim/60 block lowercase">deliverables</span>
                          <div className="text-app-text font-light">{selectedProject.metricsDeliverables?.join(', ')}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 02 Typography System */}
                {selectedProject.fonts && (
                  <div className="space-y-6 text-left">
                    <h4 className="font-mono text-[9px] text-app-text-dim uppercase tracking-[0.25em]">02 // TYPOGRAPHY SYSTEM</h4>
                    <div className="bg-app-card-hover/20 border border-app-border p-6 md:p-8 rounded-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-md">
                      <div className="md:col-span-5 space-y-4 font-mono text-[10px]">
                        <span className="text-app-text-dim uppercase tracking-wider block font-semibold">TYPEFACES</span>
                        <div className="space-y-2">
                          {selectedProject.fonts.map((font, idx) => (
                            <div key={idx} className="flex items-baseline justify-between border-b border-app-border/20 pb-2">
                              <span className="text-app-text font-medium text-xs">{font}</span>
                              <span className="text-[8px] text-app-text-dim">{idx === 0 ? 'PRIMARY' : idx === 1 ? 'ACCENT' : 'BODY'}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="md:col-span-7 border-t md:border-t-0 md:border-l border-app-border/30 pt-6 md:pt-0 md:pl-8 space-y-6 select-none">
                        <div className="space-y-1">
                          <span className="font-mono text-[8px] text-app-text-dim uppercase tracking-widest block">scale.h1 // display title</span>
                          <div className="font-serif text-3xl text-app-text leading-none font-light">
                            Abcdefghijklm
                          </div>
                        </div>
                        <div className="space-y-1">
                          <span className="font-mono text-[8px] text-app-text-dim uppercase tracking-widest block">scale.body // font sample</span>
                          <div className="font-sans text-xs text-app-text-muted font-light leading-relaxed">
                            Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 03 Brand Colours */}
                {selectedProject.colors && (
                  <div className="space-y-6 text-left">
                    <h4 className="font-mono text-[9px] text-app-text-dim uppercase tracking-[0.25em]">03 // BRAND COLOURS</h4>
                    <div className="flex flex-wrap gap-6 items-center">
                      {selectedProject.colors.map((color, idx) => (
                        <div key={idx} className="flex flex-col items-center space-y-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              navigator.clipboard.writeText(color);
                              setCopiedColor(color);
                              setTimeout(() => setCopiedColor(null), 1500);
                            }}
                            className="w-14 h-14 rounded-full border border-app-border-strong/60 shadow-lg cursor-pointer focus:outline-none relative group flex items-center justify-center"
                            style={{ backgroundColor: color }}
                            title={`Copy ${color}`}
                          >
                            <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                              <Copy size={12} />
                            </div>
                          </motion.button>
                          <div className="text-center font-mono text-[9px]">
                            <span className="text-app-text block font-semibold uppercase">{color}</span>
                            <span className="text-[7px] text-app-text-dim uppercase block">
                              {copiedColor === color ? 'COPIED!' : `SWATCH_0${idx + 1}`}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Interactive Actions Redirection */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-8 border-t border-app-border/30">
                  {selectedProject.link && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto bg-app-text hover:bg-app-text/90 text-app-bg font-mono text-xs uppercase tracking-widest px-8 py-5 rounded-lg transition-all cursor-pointer flex items-center justify-center space-x-3 group"
                      style={{ textDecoration: 'none' }}
                    >
                      <span className="font-semibold">LAUNCH EXPERIENCE</span>
                      <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      setTimeout(() => scrollToSection('contact'), 300);
                    }}
                    className="w-full sm:w-auto border border-app-text hover:bg-app-inverse-bg hover:text-app-inverse-text font-mono text-xs uppercase tracking-widest px-8 py-5 rounded-lg transition-all cursor-pointer flex items-center justify-center space-x-3 group"
                  >
                    <span>INQUIRE ABOUT THIS BRAND</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>

                {/* Unified Lesson Takeaway Footer */}
                {selectedProject.lesson && (
                  <div className="mt-16 pt-16 border-t border-app-border-strong/60 max-w-3xl mx-auto text-center select-none">
                    <span className="font-mono text-[9px] text-app-text-dim uppercase tracking-[0.3em] block">
                      WHAT THIS CARD TAUGHT ME
                    </span>
                    <h3 className="font-serif italic text-2xl md:text-3xl text-app-text mt-6 leading-tight max-w-xl mx-auto">
                      "{selectedProject.lesson}"
                    </h3>
                    {selectedProject.lessonDetail && (
                      <p className="font-sans text-app-text-muted text-sm leading-relaxed mt-5 max-w-lg mx-auto font-light">
                        {selectedProject.lessonDetail}
                      </p>
                    )}
                    <div className="flex items-center justify-center space-x-2 mt-12 text-[8px] font-mono text-app-text-dim/40 uppercase tracking-[0.25em]">
                      <span>♣ THE JACK</span>
                      <span>//</span>
                      <span>CARD 0{selectedProject.id.split('-')[1]}</span>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 8. Sliding AI Companion Double Sidebar */}
      <AiCompanion isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />

    </div>
  );
}
