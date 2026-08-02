import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue } from 'motion/react';
import { Project } from '../types';
import { projects } from '../data/projects';

interface WorkGridProps {
  onSelectProject: (project: Project) => void;
}

export default function WorkGrid({ onSelectProject }: WorkGridProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Use motion values for drag coordinates to prevent React re-renders and jitter
  const x = useMotionValue(-280);
  const y = useMotionValue(-180);

  // Auto-adjust initial coordinates based on screen size on mount
  useEffect(() => {
    if (viewportRef.current) {
      const vWidth = viewportRef.current.offsetWidth;
      const vHeight = viewportRef.current.offsetHeight;
      // Center the 1700x1100 canvas perfectly in the viewport
      const targetX = -(1700 - vWidth) / 2;
      const targetY = -(1100 - vHeight) / 2;
      x.set(targetX);
      y.set(targetY);
    }
  }, [x, y]);

  // Prevent click on projects if the user was actively dragging
  const handleProjectClick = (project: Project, e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      return;
    }
    onSelectProject(project);
  };

  return (
    <div className="w-full relative select-none">
      
      {/* Viewport container */}
      <div 
        ref={viewportRef}
        className="w-full relative h-[600px] md:h-[760px] overflow-hidden bg-transparent cursor-grab active:cursor-grabbing transition-colors duration-300"
      >
        {/* The Draggable Canvas Frame */}
        <motion.div
          drag
          dragConstraints={viewportRef}
          dragElastic={0.1}
          dragTransition={{ power: 0.2, bounceStiffness: 250, bounceDamping: 30 }}
          style={{ x, y, touchAction: 'none' }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => {
            setTimeout(() => setIsDragging(false), 50);
          }}
          className="absolute w-[1700px] h-[1100px] bg-transparent p-12"
        >
          
          {/* -------------------- THE CANVAS ELEMENTS -------------------- */}

          {/* Project 1: Artistically Intelligent */}
          <div 
            className="absolute left-[80px] top-[80px] w-[280px] group cursor-pointer z-20"
            onClick={(e) => handleProjectClick(projects[0], e)}
          >
            <motion.div 
              whileHover={{ scale: 1.01, y: -2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="flex flex-col space-y-3"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-app-card-bg border border-app-border group-hover:border-app-border-strong transition-colors duration-500 rounded-lg">
                <img 
                  src={projects[0].image} 
                  alt={projects[0].title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  width="800"
                  height="600"
                  className="w-full h-full object-cover md:grayscale md:brightness-90 md:group-hover:grayscale-0 md:group-hover:brightness-100 md:group-hover:scale-102 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white font-mono text-[10px] tracking-wider">
                    VIEW DETAILS
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Project 2: Tarnished Times */}
          <div 
            className="absolute left-[1320px] top-[120px] w-[300px] group cursor-pointer z-20"
            onClick={(e) => handleProjectClick(projects[1], e)}
          >
            <motion.div 
              whileHover={{ scale: 1.01, y: -2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="flex flex-col space-y-3"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-app-card-bg border border-app-border group-hover:border-app-border-strong transition-colors duration-500 rounded-lg">
                <img 
                  src={projects[1].image} 
                  alt={projects[1].title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  width="800"
                  height="600"
                  className="w-full h-full object-cover md:grayscale md:brightness-90 md:group-hover:grayscale-0 md:group-hover:brightness-100 md:group-hover:scale-102 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white font-mono text-[10px] tracking-wider">
                    VIEW DETAILS
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Project 3: Rizzler */}
          <div 
            className="absolute left-[580px] top-[60px] w-[280px] group cursor-pointer z-20"
            onClick={(e) => handleProjectClick(projects[2], e)}
          >
            <motion.div 
              whileHover={{ scale: 1.01, y: -2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="flex flex-col space-y-3"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-app-card-bg border border-app-border group-hover:border-app-border-strong transition-colors duration-500 rounded-lg">
                <img 
                  src={projects[2].image} 
                  alt={projects[2].title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  width="800"
                  height="600"
                  className="w-full h-full object-cover md:grayscale md:brightness-90 md:group-hover:grayscale-0 md:group-hover:brightness-100 md:group-hover:scale-102 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white font-mono text-[10px] tracking-wider">
                    VIEW DETAILS
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Project 4: QR Codes Redefined */}
          <div 
            className="absolute left-[110px] top-[600px] w-[280px] group cursor-pointer z-20"
            onClick={(e) => handleProjectClick(projects[3], e)}
          >
            <motion.div 
              whileHover={{ scale: 1.01, y: -2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="flex flex-col space-y-3"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-app-card-bg border border-app-border group-hover:border-app-border-strong transition-colors duration-500 rounded-lg">
                <img 
                  src={projects[3].image} 
                  alt={projects[3].title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  width="800"
                  height="600"
                  className="w-full h-full object-cover md:grayscale md:brightness-90 md:group-hover:grayscale-0 md:group-hover:brightness-100 md:group-hover:scale-102 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white font-mono text-[10px] tracking-wider">
                    VIEW DETAILS
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Project 5: Posture Monitor */}
          <div 
            className="absolute left-[590px] top-[760px] w-[360px] group cursor-pointer z-20"
            onClick={(e) => handleProjectClick(projects[4], e)}
          >
            <motion.div 
              whileHover={{ scale: 1.01, y: -2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="flex flex-col space-y-3"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-app-card-bg border border-app-border group-hover:border-app-border-strong transition-colors duration-500 rounded-lg">
                <img 
                  src={projects[4].image} 
                  alt={projects[4].title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  width="800"
                  height="600"
                  className="w-full h-full object-cover md:grayscale md:brightness-90 md:group-hover:grayscale-0 md:group-hover:brightness-100 md:group-hover:scale-102 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white font-mono text-[10px] tracking-wider">
                    VIEW DETAILS
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Project 6: Madhubani Fusion */}
          <div 
            className="absolute left-[1280px] top-[680px] w-[340px] group cursor-pointer z-20"
            onClick={(e) => handleProjectClick(projects[5], e)}
          >
            <motion.div 
              whileHover={{ scale: 1.01, y: -2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="flex flex-col space-y-3"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-app-card-bg border border-app-border group-hover:border-app-border-strong transition-colors duration-500 rounded-lg">
                <img 
                  src={projects[5].image} 
                  alt={projects[5].title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  width="800"
                  height="600"
                  className="w-full h-full object-cover md:grayscale md:brightness-90 md:group-hover:grayscale-0 md:group-hover:brightness-100 md:group-hover:scale-102 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white font-mono text-[10px] tracking-wider">
                    VIEW DETAILS
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Project 7: ColdStack */}
          <div 
            className="absolute left-[950px] top-[320px] w-[280px] group cursor-pointer z-20"
            onClick={(e) => handleProjectClick(projects[6], e)}
          >
            <motion.div 
              whileHover={{ scale: 1.01, y: -2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="flex flex-col space-y-3"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-app-card-bg border border-app-border group-hover:border-app-border-strong transition-colors duration-500 rounded-lg">
                <img 
                  src={projects[6].image} 
                  alt={projects[6].title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  width="800"
                  height="600"
                  className="w-full h-full object-cover md:grayscale md:brightness-90 md:group-hover:grayscale-0 md:group-hover:brightness-100 md:group-hover:scale-102 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white font-mono text-[10px] tracking-wider">
                    VIEW DETAILS
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

        </motion.div>

      </div>
    </div>
  );
}
