import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Camera, 
  Wrench, 
  Scissors, 
  MousePointer, 
  PenTool, 
  Music,
  Code2,
  Heart,
  Spade,
  Club,
  Diamond
} from 'lucide-react';

interface PlayingCardProps {
  isHeadlineHovered?: boolean;
  scrollRotation?: number;
  onHoverChange?: (hovered: boolean) => void;
}

export default function PlayingCard({ isHeadlineHovered, scrollRotation, onHoverChange }: PlayingCardProps) {
  const [hoveredTrade, setHoveredTrade] = useState<string | null>(null);

  const trades = [
    { id: 'film', label: 'Filmmaking', icon: Camera, color: 'hover:text-red-500', coord: { top: '25%', left: '72%' }, desc: 'Cinema/Photography' },
    { id: 'dev', label: 'Software Eng', icon: Code2, color: 'hover:text-blue-500', coord: { top: '26%', left: '22%' }, desc: 'Full-stack development' },
    { id: 'design', label: 'Art Direction', icon: Scissors, color: 'hover:text-amber-500', coord: { top: '35%', left: '16%' }, desc: 'Fashion & Brand Layouts' },
    { id: 'uiux', label: 'UI/UX Design', icon: MousePointer, color: 'hover:text-emerald-500', coord: { top: '51%', left: '22%' }, desc: 'Interactive Interfaces' },
    { id: 'music', label: 'Sound Synth', icon: Music, color: 'hover:text-purple-500', coord: { top: '34%', left: '78%' }, desc: 'Ambient Soundscapes' },
    { id: 'writing', label: 'Creative Pen', icon: PenTool, color: 'hover:text-pink-500', coord: { top: '51%', left: '72%' }, desc: 'Narrative Storytelling' },
  ];

  return (
    <motion.div 
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
      animate={{
        rotate: (scrollRotation || 0) + (isHeadlineHovered ? -2.5 : 0),
        scale: isHeadlineHovered ? 1.025 : 1,
        y: isHeadlineHovered ? -4 : 0
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      className="relative w-full max-w-[380px] aspect-[2.5/3.5] bg-white border-[3px] border-black rounded-2xl overflow-hidden shadow-2xl group flex flex-col p-6 select-none text-black cursor-default"
    >
      {/* Corner Indexes */}
      <div className="absolute top-4 left-4 flex flex-col items-center leading-none text-black font-serif">
        <span className="text-4xl font-extrabold tracking-tighter">J</span>
        <span className="text-xl mt-0.5">♠</span>
      </div>
      
      <div className="absolute bottom-4 right-4 flex flex-col items-center leading-none text-black font-serif rotate-180">
        <span className="text-4xl font-extrabold tracking-tighter">J</span>
        <span className="text-xl mt-0.5">♠</span>
      </div>

      {/* Symmetrical Suits decoration on sides */}
      <div className="absolute top-4 right-4 flex space-x-1.5 opacity-60 text-xs text-black">
        <span className="text-black">♠</span>
        <span className="text-red-600">♦</span>
        <span className="text-black">♣</span>
        <span className="text-red-600">♥</span>
      </div>

      <div className="absolute bottom-4 left-4 flex space-x-1.5 opacity-60 text-xs text-black rotate-180">
        <span className="text-black">♠</span>
        <span className="text-red-600">♦</span>
        <span className="text-black">♣</span>
        <span className="text-red-600">♥</span>
      </div>

      {/* Main Illustration Area */}
      <div className="flex-1 border-2 border-black rounded-lg relative overflow-hidden bg-white flex items-center justify-center">
        {/* Subtle decorative split line */}
        <div className="absolute w-full h-[1px] bg-black/10 top-1/2 left-0 z-0" />

        {/* Custom highly detailed symmetrical Jack of All Trades vector */}
        <svg 
          viewBox="0 0 400 560" 
          className="w-full h-full max-h-[95%] object-contain relative z-10 p-2"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top Half of Jack of All Trades */}
          <g id="top-jack">
            {/* Crown */}
            <path d="M 140,140 L 260,140 L 250,110 L 150,110 Z" fill="#ef4444" stroke="#000" strokeWidth="2.5" />
            <path d="M 150,110 L 165,70 L 200,95 L 235,70 L 250,110 Z" fill="#ef4444" stroke="#000" strokeWidth="2.5" />
            <circle cx="165" cy="65" r="5" fill="#fec006" stroke="#000" strokeWidth="2" />
            <circle cx="200" cy="90" r="5" fill="#fec006" stroke="#000" strokeWidth="2" />
            <circle cx="235" cy="65" r="5" fill="#fec006" stroke="#000" strokeWidth="2" />
            <path d="M 145,130 L 255,130 L 252,140 L 148,140 Z" fill="#fec006" stroke="#000" strokeWidth="1.5" />

            {/* Hair (Yellow, matching user image) */}
            <path d="M 140,140 C 130,160 130,220 150,225 C 155,225 155,180 155,150 Z" fill="#fec006" stroke="#000" strokeWidth="2" />
            <path d="M 260,140 C 270,160 270,220 250,225 C 245,225 245,180 245,150 Z" fill="#fec006" stroke="#000" strokeWidth="2" />
            <path d="M 145,150 L 145,210" stroke="#000" strokeWidth="1.5" />
            <path d="M 150,155 L 150,215" stroke="#000" strokeWidth="1.5" />
            <path d="M 255,150 L 255,210" stroke="#000" strokeWidth="1.5" />
            <path d="M 250,155 L 250,215" stroke="#000" strokeWidth="1.5" />

            {/* Face */}
            <path d="M 152,140 L 248,140 C 255,175 250,225 200,240 C 150,225 145,175 152,140 Z" fill="#ffffff" stroke="#000" strokeWidth="3" />
            
            {/* Face Details */}
            <ellipse cx="180" cy="180" rx="6" ry="3.5" fill="#fff" stroke="#000" strokeWidth="2" />
            <circle cx="180" cy="180" r="2.5" fill="#000" />
            <ellipse cx="220" cy="180" rx="6" ry="3.5" fill="#fff" stroke="#000" strokeWidth="2" />
            <circle cx="220" cy="180" r="2.5" fill="#000" />
            <path d="M 172,174 C 176,171 184,171 188,174" stroke="#000" strokeWidth="2" fill="none" />
            <path d="M 212,174 C 216,171 224,171 228,174" stroke="#000" strokeWidth="2" fill="none" />
            <path d="M 200,180 L 195,200 C 195,203 205,203 205,200" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
            
            {/* Magnificent Mustache */}
            <path d="M 180,212 C 185,204 195,206 200,212 C 205,206 215,204 220,212 C 228,210 226,220 220,218 C 210,215 200,222 200,222 C 200,222 190,215 180,218 C 174,220 172,210 180,212 Z" fill="#000" stroke="#000" strokeWidth="1" />
            <path d="M 194,232 L 206,232 L 200,238 Z" fill="#000" />

            {/* Robe/Outfit */}
            <path d="M 140,225 C 110,240 100,270 95,280 L 305,280 C 300,270 290,240 260,225 Z" fill="#ef4444" stroke="#000" strokeWidth="2.5" />
            <path d="M 160,225 L 200,255 L 240,225" fill="none" stroke="#fec006" strokeWidth="5.5" strokeLinecap="round" />
            <path d="M 160,225 L 200,255 L 240,225" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />

            {/* Shoulder Trim Details */}
            <path d="M 115,250 C 110,260 120,275 130,280 L 150,280 Z" fill="#fec006" stroke="#000" strokeWidth="1.5" />
            <path d="M 285,250 C 290,260 280,275 270,280 L 250,280 Z" fill="#fec006" stroke="#000" strokeWidth="1.5" />

            {/* Hands & Symmetrical Creator/Developer Tools */}
            
            {/* 1. Wrench (Top-Left) */}
            <path d="M 130,240 L 95,140 L 115,135 L 145,230 Z" fill="#1e293b" stroke="#000" strokeWidth="2" />
            <path d="M 105,145 L 85,95" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" />
            <path d="M 105,145 L 85,95" stroke="#000" strokeWidth="1.5" />
            <path d="M 85,95 C 75,90 70,75 80,65 C 90,55 105,65 100,80 L 85,95 Z" fill="#cbd5e1" stroke="#000" strokeWidth="2" />
            <path d="M 77,75 L 92,65" stroke="#000" strokeWidth="3" strokeLinecap="round" />
            <rect x="88" y="80" width="6" height="8" rx="1" fill="#475569" stroke="#000" strokeWidth="1" />
            <circle cx="102" cy="138" r="10" fill="#000" />
            <path d="M 92,130 C 95,130 96,134 94,136" stroke="#fff" strokeWidth="1.5" fill="none" />
            <path d="M 94,136 C 97,136 98,140 96,142" stroke="#fff" strokeWidth="1.5" fill="none" />
            <path d="M 96,142 C 99,142 100,146 98,148" stroke="#fff" strokeWidth="1.5" fill="none" />

            {/* 2. Film Strip & Scissors (Left Middle) */}
            <path d="M 30,210 Q 50,150 80,180" fill="none" stroke="#94a3b8" strokeWidth="18" strokeLinecap="round" />
            <path d="M 30,210 Q 50,150 80,180" fill="none" stroke="#1e293b" strokeWidth="14" />
            <path d="M 30,210 Q 50,150 80,180" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="3 5" />
            <path d="M 45,155 L 75,165" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
            <path d="M 50,170 L 70,150" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
            <circle cx="60" cy="160" r="2" fill="#000" />
            <circle cx="40" cy="150" r="6" fill="none" stroke="#ef4444" strokeWidth="2.5" />
            <circle cx="45" cy="175" r="6" fill="none" stroke="#ef4444" strokeWidth="2.5" />
            <circle cx="65" cy="180" r="9" fill="#000" />

            {/* 3. Computer Mouse (Center-Left) */}
            <path d="M 150,260 L 130,225" stroke="#1e293b" strokeWidth="12" strokeLinecap="round" />
            <path d="M 115,225 C 105,225 95,240 100,255 C 105,265 125,265 130,255 C 135,240 125,225 115,225 Z" fill="#f8fafc" stroke="#000" strokeWidth="2" />
            <line x1="115" y1="225" x2="115" y2="242" stroke="#000" strokeWidth="1.5" />
            <rect x="113" y="230" width="4" height="6" rx="1" fill="#ef4444" />
            <circle cx="120" cy="235" r="9" fill="#000" />
            <path d="M 112,230 Q 115,240 120,240" stroke="#fff" strokeWidth="1" fill="none" />

            {/* 4. Multi-tool Pliers (Center-Right) */}
            <path d="M 270,260 Q 280,240 290,250" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" />
            <path d="M 285,265 Q 295,245 300,255" stroke="#fec006" strokeWidth="5" strokeLinecap="round" />
            <path d="M 265,230 L 255,215 C 252,210 262,210 265,215 Z" fill="#cbd5e1" stroke="#000" strokeWidth="1.5" />
            <path d="M 272,232 L 268,212 C 265,208 275,208 275,215 Z" fill="#cbd5e1" stroke="#000" strokeWidth="1.5" />
            <circle cx="270" cy="235" r="3" fill="#475569" stroke="#000" strokeWidth="1" />
            <circle cx="278" cy="250" r="9" fill="#000" />

            {/* 5. Video Camera (Top-Right) */}
            <path d="M 265,240 L 295,145 L 315,150 L 275,235 Z" fill="#1e293b" stroke="#000" strokeWidth="2" />
            <rect x="290" y="75" width="32" height="22" rx="3" fill="#f8fafc" stroke="#000" strokeWidth="2" />
            <path d="M 290,80 L 272,82 L 272,92 L 290,94 Z" fill="#475569" stroke="#000" strokeWidth="2" />
            <rect x="298" y="68" width="16" height="7" fill="#cbd5e1" stroke="#000" strokeWidth="1.5" />
            <circle cx="305" cy="100" r="8" fill="#000" />

            {/* 6. Guitar (Right Middle) */}
            <path d="M 310,210 L 355,160" stroke="#78350f" strokeWidth="9" strokeLinecap="round" />
            <path d="M 355,160 L 375,140 C 378,135 385,142 380,147 L 362,168 Z" fill="#451a03" stroke="#000" strokeWidth="2" />
            <circle cx="372" cy="142" r="2.5" fill="#cbd5e1" stroke="#000" strokeWidth="1" />
            <circle cx="377" cy="148" r="2.5" fill="#cbd5e1" stroke="#000" strokeWidth="1" />
            <circle cx="363" cy="155" r="2.5" fill="#cbd5e1" stroke="#000" strokeWidth="1" />
            <circle cx="330" cy="190" r="9" fill="#000" />
            <path d="M 324,185 Q 330,195 336,190" stroke="#fff" strokeWidth="1" fill="none" />

            {/* 7. Stylus / Drawing Pen (Right Bottom) */}
            <path d="M 305,230 L 335,200" stroke="#000" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M 305,230 L 298,237 L 303,237 Z" fill="#cbd5e1" stroke="#000" strokeWidth="1" />
            <circle cx="318" cy="215" r="8" fill="#000" />
          </g>

          {/* Symmetrical Bottom Half of Jack of All Trades (180-degree rotation around center 200, 280) */}
          <g id="bottom-jack" transform="rotate(180 200 280)">
            {/* Crown */}
            <path d="M 140,140 L 260,140 L 250,110 L 150,110 Z" fill="#ef4444" stroke="#000" strokeWidth="2.5" />
            <path d="M 150,110 L 165,70 L 200,95 L 235,70 L 250,110 Z" fill="#ef4444" stroke="#000" strokeWidth="2.5" />
            <circle cx="165" cy="65" r="5" fill="#fec006" stroke="#000" strokeWidth="2" />
            <circle cx="200" cy="90" r="5" fill="#fec006" stroke="#000" strokeWidth="2" />
            <circle cx="235" cy="65" r="5" fill="#fec006" stroke="#000" strokeWidth="2" />
            <path d="M 145,130 L 255,130 L 252,140 L 148,140 Z" fill="#fec006" stroke="#000" strokeWidth="1.5" />

            {/* Hair */}
            <path d="M 140,140 C 130,160 130,220 150,225 C 155,225 155,180 155,150 Z" fill="#fec006" stroke="#000" strokeWidth="2" />
            <path d="M 260,140 C 270,160 270,220 250,225 C 245,225 245,180 245,150 Z" fill="#fec006" stroke="#000" strokeWidth="2" />
            <path d="M 145,150 L 145,210" stroke="#000" strokeWidth="1.5" />
            <path d="M 150,155 L 150,215" stroke="#000" strokeWidth="1.5" />
            <path d="M 255,150 L 255,210" stroke="#000" strokeWidth="1.5" />
            <path d="M 250,155 L 250,215" stroke="#000" strokeWidth="1.5" />

            {/* Face */}
            <path d="M 152,140 L 248,140 C 255,175 250,225 200,240 C 150,225 145,175 152,140 Z" fill="#ffffff" stroke="#000" strokeWidth="3" />
            
            {/* Face Details */}
            <ellipse cx="180" cy="180" rx="6" ry="3.5" fill="#fff" stroke="#000" strokeWidth="2" />
            <circle cx="180" cy="180" r="2.5" fill="#000" />
            <ellipse cx="220" cy="180" rx="6" ry="3.5" fill="#fff" stroke="#000" strokeWidth="2" />
            <circle cx="220" cy="180" r="2.5" fill="#000" />
            <path d="M 172,174 C 176,171 184,171 188,174" stroke="#000" strokeWidth="2" fill="none" />
            <path d="M 212,174 C 216,171 224,171 228,174" stroke="#000" strokeWidth="2" fill="none" />
            <path d="M 200,180 L 195,200 C 195,203 205,203 205,200" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
            
            {/* Mustache */}
            <path d="M 180,212 C 185,204 195,206 200,212 C 205,206 215,204 220,212 C 228,210 226,220 220,218 C 210,215 200,222 200,222 C 200,222 190,215 180,218 C 174,220 172,210 180,212 Z" fill="#000" stroke="#000" strokeWidth="1" />
            <path d="M 194,232 L 206,232 L 200,238 Z" fill="#000" />

            {/* Robe/Outfit */}
            <path d="M 140,225 C 110,240 100,270 95,280 L 305,280 C 300,270 290,240 260,225 Z" fill="#ef4444" stroke="#000" strokeWidth="2.5" />
            <path d="M 160,225 L 200,255 L 240,225" fill="none" stroke="#fec006" strokeWidth="5.5" strokeLinecap="round" />
            <path d="M 160,225 L 200,255 L 240,225" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />

            {/* Shoulder Trim Details */}
            <path d="M 115,250 C 110,260 120,275 130,280 L 150,280 Z" fill="#fec006" stroke="#000" strokeWidth="1.5" />
            <path d="M 285,250 C 290,260 280,275 270,280 L 250,280 Z" fill="#fec006" stroke="#000" strokeWidth="1.5" />

            {/* Hands & Symmetrical Creator/Developer Tools */}
            
            {/* 1. Wrench (Top-Left) */}
            <path d="M 130,240 L 95,140 L 115,135 L 145,230 Z" fill="#1e293b" stroke="#000" strokeWidth="2" />
            <path d="M 105,145 L 85,95" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" />
            <path d="M 105,145 L 85,95" stroke="#000" strokeWidth="1.5" />
            <path d="M 85,95 C 75,90 70,75 80,65 C 90,55 105,65 100,80 L 85,95 Z" fill="#cbd5e1" stroke="#000" strokeWidth="2" />
            <path d="M 77,75 L 92,65" stroke="#000" strokeWidth="3" strokeLinecap="round" />
            <rect x="88" y="80" width="6" height="8" rx="1" fill="#475569" stroke="#000" strokeWidth="1" />
            <circle cx="102" cy="138" r="10" fill="#000" />
            <path d="M 92,130 C 95,130 96,134 94,136" stroke="#fff" strokeWidth="1.5" fill="none" />
            <path d="M 94,136 C 97,136 98,140 96,142" stroke="#fff" strokeWidth="1.5" fill="none" />
            <path d="M 96,142 C 99,142 100,146 98,148" stroke="#fff" strokeWidth="1.5" fill="none" />

            {/* 2. Film Strip & Scissors (Left Middle) */}
            <path d="M 30,210 Q 50,150 80,180" fill="none" stroke="#94a3b8" strokeWidth="18" strokeLinecap="round" />
            <path d="M 30,210 Q 50,150 80,180" fill="none" stroke="#1e293b" strokeWidth="14" />
            <path d="M 30,210 Q 50,150 80,180" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="3 5" />
            <path d="M 45,155 L 75,165" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
            <path d="M 50,170 L 70,150" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
            <circle cx="60" cy="160" r="2" fill="#000" />
            <circle cx="40" cy="150" r="6" fill="none" stroke="#ef4444" strokeWidth="2.5" />
            <circle cx="45" cy="175" r="6" fill="none" stroke="#ef4444" strokeWidth="2.5" />
            <circle cx="65" cy="180" r="9" fill="#000" />

            {/* 3. Computer Mouse (Center-Left) */}
            <path d="M 150,260 L 130,225" stroke="#1e293b" strokeWidth="12" strokeLinecap="round" />
            <path d="M 115,225 C 105,225 95,240 100,255 C 105,265 125,265 130,255 C 135,240 125,225 115,225 Z" fill="#f8fafc" stroke="#000" strokeWidth="2" />
            <line x1="115" y1="225" x2="115" y2="242" stroke="#000" strokeWidth="1.5" />
            <rect x="113" y="230" width="4" height="6" rx="1" fill="#ef4444" />
            <circle cx="120" cy="235" r="9" fill="#000" />
            <path d="M 112,230 Q 115,240 120,240" stroke="#fff" strokeWidth="1" fill="none" />

            {/* 4. Multi-tool Pliers (Center-Right) */}
            <path d="M 270,260 Q 280,240 290,250" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" />
            <path d="M 285,265 Q 295,245 300,255" stroke="#fec006" strokeWidth="5" strokeLinecap="round" />
            <path d="M 265,230 L 255,215 C 252,210 262,210 265,215 Z" fill="#cbd5e1" stroke="#000" strokeWidth="1.5" />
            <path d="M 272,232 L 268,212 C 265,208 275,208 275,215 Z" fill="#cbd5e1" stroke="#000" strokeWidth="1.5" />
            <circle cx="270" cy="235" r="3" fill="#475569" stroke="#000" strokeWidth="1" />
            <circle cx="278" cy="250" r="9" fill="#000" />

            {/* 5. Video Camera (Top-Right) */}
            <path d="M 265,240 L 295,145 L 315,150 L 275,235 Z" fill="#1e293b" stroke="#000" strokeWidth="2" />
            <rect x="290" y="75" width="32" height="22" rx="3" fill="#f8fafc" stroke="#000" strokeWidth="2" />
            <path d="M 290,80 L 272,82 L 272,92 L 290,94 Z" fill="#475569" stroke="#000" strokeWidth="2" />
            <rect x="298" y="68" width="16" height="7" fill="#cbd5e1" stroke="#000" strokeWidth="1.5" />
            <circle cx="305" cy="100" r="8" fill="#000" />

            {/* 6. Guitar (Right Middle) */}
            <path d="M 310,210 L 355,160" stroke="#78350f" strokeWidth="9" strokeLinecap="round" />
            <path d="M 355,160 L 375,140 C 378,135 385,142 380,147 L 362,168 Z" fill="#451a03" stroke="#000" strokeWidth="2" />
            <circle cx="372" cy="142" r="2.5" fill="#cbd5e1" stroke="#000" strokeWidth="1" />
            <circle cx="377" cy="148" r="2.5" fill="#cbd5e1" stroke="#000" strokeWidth="1" />
            <circle cx="363" cy="155" r="2.5" fill="#cbd5e1" stroke="#000" strokeWidth="1" />
            <circle cx="330" cy="190" r="9" fill="#000" />
            <path d="M 324,185 Q 330,195 336,190" stroke="#fff" strokeWidth="1" fill="none" />

            {/* 7. Stylus / Drawing Pen (Right Bottom) */}
            <path d="M 305,230 L 335,200" stroke="#000" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M 305,230 L 298,237 L 303,237 Z" fill="#cbd5e1" stroke="#000" strokeWidth="1" />
            <circle cx="318" cy="215" r="8" fill="#000" />
          </g>
        </svg>

        {/* Trade nodes floating around Jack */}
        {trades.map((trade) => {
          const IconComponent = trade.icon;
          const isCurrentlyHovered = hoveredTrade === trade.id;
          return (
            <div
              key={trade.id}
              className="absolute z-20"
              style={trade.coord}
              onMouseEnter={() => setHoveredTrade(trade.id)}
              onMouseLeave={() => setHoveredTrade(null)}
            >
              <motion.div
                whileHover={{ scale: 1.25 }}
                className={`w-10 h-10 rounded-full bg-app-card-bg-elevated border border-app-border-strong hover:border-app-text text-app-text flex items-center justify-center cursor-help transition-colors duration-300 ${trade.color} shadow-lg`}
              >
                <IconComponent size={18} />
              </motion.div>
              
              {/* Individual Tooltip */}
              {isCurrentlyHovered && (
                <div className="absolute left-1/2 -translate-x-1/2 bottom-12 bg-app-bg border border-app-text text-app-text text-[10px] uppercase font-mono tracking-wider py-1 px-2 rounded-md whitespace-nowrap z-50 shadow-2xl pointer-events-none">
                  <span className="font-bold">{trade.label}</span>
                  <span className="block text-[8px] text-app-text-muted lowercase mt-0.5">{trade.desc}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Text */}
      <div className="mt-4 text-center">
        <h3 className="font-serif italic text-app-text-dim text-xs tracking-wider uppercase">
          {hoveredTrade ? 'ACTIVE TRADE IN FOCUS' : 'JACK OF ALL TRADES'}
        </h3>
        <p className="font-sans text-app-text text-sm font-light mt-1 tracking-wide h-6 transition-all duration-300">
          {hoveredTrade 
            ? trades.find(t => t.id === hoveredTrade)?.desc 
            : "Hover the instruments to reveal trades"
          }
        </p>
      </div>
    </motion.div>
  );
}
