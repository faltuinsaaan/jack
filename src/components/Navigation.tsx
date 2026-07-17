import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NavigationProps {
  scrollToSection: (id: string) => void;
}

export default function Navigation({ scrollToSection }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    // Smooth scroll after menu closes
    setTimeout(() => {
      scrollToSection(sectionId);
    }, 300);
  };

  return (
    <>
      {/* 1. Hamburger Button */}
      <div
        style={{
          padding: "0px",
          margin: "0px",
          boxSizing: "border-box",
          userSelect: "none",
          WebkitTapHighlightColor: "transparent",
        }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`NavigationBar_hamburgerMenu__qzFeO ${isOpen ? 'NavigationBar_hamburgerOpen__PkNba' : ''}`}
          aria-label="Toggle menu"
          style={{
            margin: "0px",
            boxSizing: "border-box",
            userSelect: "none",
            WebkitTapHighlightColor: "transparent",
            gap: "7px",
            background: "none",
            borderWidth: "medium",
            borderStyle: "none",
            borderColor: "currentcolor",
            borderImage: "initial",
            padding: "0px",
            height: "36px",
            width: "36px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            cursor: "pointer",
            position: "relative",
            zIndex: 100, // Stay above the overlay (z-50)
          }}
        >
          {/* Row 1 */}
          <div
            className="NavigationBar_hamburgerRow1__j740y"
            style={{
              padding: "0px",
              margin: "0px",
              boxSizing: "border-box",
              userSelect: "none",
              WebkitTapHighlightColor: "transparent",
              overflow: "hidden",
              borderRadius: "9999px",
              gap: "30px",
              transition: "transform 0.5s",
              display: "flex",
              height: "1px",
              transform: isOpen 
                ? "rotate(45deg) translate(3px, 3px)" 
                : "translateY(-2px)",
              width: "36px",
            }}
          >
            <span
              style={{
                padding: "0px",
                margin: "0px",
                boxSizing: "border-box",
                userSelect: "none",
                WebkitTapHighlightColor: "transparent",
                background: "var(--foreground)",
                borderRadius: "9999px",
                transition: "transform 0.5s",
                flexShrink: 0,
                width: "100%",
                height: "1px",
                transform: "translateX(0px)",
              }}
            />
            <span
              style={{
                padding: "0px",
                margin: "0px",
                boxSizing: "border-box",
                userSelect: "none",
                WebkitTapHighlightColor: "transparent",
                background: "var(--foreground)",
                borderRadius: "9999px",
                transition: "transform 0.5s",
                flexShrink: 0,
                width: "100%",
                height: "1px",
                transform: "translateX(0px)",
              }}
            />
          </div>

          {/* Row 2 */}
          <div
            className="NavigationBar_hamburgerRow2__Brso2"
            style={{
              padding: "0px",
              margin: "0px",
              boxSizing: "border-box",
              userSelect: "none",
              WebkitTapHighlightColor: "transparent",
              overflow: "hidden",
              borderRadius: "9999px",
              gap: "30px",
              display: "flex",
              height: "1px",
              transition: "transform 0.5s, width 0.5s",
              transform: isOpen 
                ? "rotate(-45deg) translate(3px, -2px)" 
                : "translateY(2px)",
              width: "36px",
            }}
          >
            <span
              style={{
                padding: "0px",
                margin: "0px",
                boxSizing: "border-box",
                userSelect: "none",
                WebkitTapHighlightColor: "transparent",
                background: "var(--foreground)",
                borderRadius: "9999px",
                transition: "transform 0.5s",
                flexShrink: 0,
                width: "100%",
                height: "1px",
                transform: "translateX(0px)",
              }}
            />
            <span
              style={{
                padding: "0px",
                margin: "0px",
                boxSizing: "border-box",
                userSelect: "none",
                WebkitTapHighlightColor: "transparent",
                background: "var(--foreground)",
                borderRadius: "9999px",
                transition: "transform 0.5s",
                flexShrink: 0,
                width: "100%",
                height: "1px",
                transitionDelay: "50ms",
                transform: "translateX(0px)",
              }}
            />
          </div>
        </button>
      </div>

      {/* 2. Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-app-bg z-50 flex flex-col items-center justify-center p-8 backdrop-blur-md"
          >
            <div className="w-full max-w-lg flex flex-col items-center justify-center space-y-0">
              
              {/* 01. Origins */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col items-center text-center cursor-pointer py-4 w-full select-none"
                onClick={(e) => handleLinkClick('about', e)}
              >
                <span className="font-mono text-xs text-app-text-dim/60 tracking-[0.2em] mb-2">
                  01
                </span>
                <span className="font-serif text-3xl md:text-5xl font-light text-app-text group-hover:text-app-text transition-colors duration-300 tracking-wide">
                  Origins
                </span>
                <span className="font-mono text-[10px] md:text-xs text-app-text-dim/80 font-light mt-2 tracking-widest lowercase">
                  How I think.
                </span>
              </motion.div>

              {/* Divider 1 */}
              <motion.div 
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="w-32 md:w-48 h-[1px] bg-app-border/20 my-6"
              />

              {/* 02. The Deck */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col items-center text-center cursor-pointer py-4 w-full select-none"
                onClick={(e) => handleLinkClick('work', e)}
              >
                <span className="font-mono text-xs text-app-text-dim/60 tracking-[0.2em] mb-2">
                  02
                </span>
                <span className="font-serif text-3xl md:text-5xl font-light text-app-text group-hover:text-app-text transition-colors duration-300 tracking-wide">
                  The Deck
                </span>
                <span className="font-mono text-[10px] md:text-xs text-app-text-dim/80 font-light mt-2 tracking-widest lowercase">
                  Selected work.
                </span>
              </motion.div>

              {/* Divider 2 */}
              <motion.div 
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                className="w-32 md:w-48 h-[1px] bg-app-border/20 my-6"
              />

              {/* 03. Your Move */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col items-center text-center cursor-pointer py-4 w-full select-none"
                onClick={(e) => handleLinkClick('contact', e)}
              >
                <span className="font-mono text-xs text-app-text-dim/60 tracking-[0.2em] mb-2">
                  03
                </span>
                <span className="font-serif text-3xl md:text-5xl font-light text-app-text group-hover:text-app-text transition-colors duration-300 tracking-wide">
                  Your Move
                </span>
                <span className="font-mono text-[10px] md:text-xs text-app-text-dim/80 font-light mt-2 tracking-widest lowercase">
                  Start the conversation.
                </span>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
