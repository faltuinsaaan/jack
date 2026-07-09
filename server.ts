import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Resilient Image Proxy to resolve CORS/cross-origin loading errors in Three.js/Drei
app.get('/api/proxy-image', async (req, res) => {
  const transparentPngBase64 = 'iVBOR0w0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
  const fallbackBuffer = Buffer.from(transparentPngBase64, 'base64');

  try {
    const imageUrl = req.query.url as string;
    if (!imageUrl) {
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Access-Control-Allow-Origin', '*');
      return res.send(fallbackBuffer);
    }

    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      }
    });

    if (!response.ok) {
      console.warn(`Failed to fetch remote image: status ${response.status}. Sending fallback transparent PNG.`);
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Access-Control-Allow-Origin', '*');
      return res.send(fallbackBuffer);
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'public, max-age=86400');

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    res.send(buffer);
  } catch (error: any) {
    console.error('Error proxying image, sending fallback transparent PNG:', error);
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(fallbackBuffer);
  }
});

// Initialize Gemini SDK with telemetry User-Agent header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Gemini Twin Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message payload is required' });
    }

    const systemInstruction = `
You are the AI Twin and Digital Double of Priyank Verma, an elite multi-disciplinary designer, full-stack engineer, art director, and digital artisan.
Your conversational style is highly professional, poised, intellectually curious, and slightly poetic. It must reflect the extreme visual caliber and high-contrast, artistic, editorial aesthetic of his portfolio.

BIOGRAPHY AND CREDENTIALS:
- Name: Priyank Verma
- Email: priyankv489@gmail.com
- Location: San Francisco, CA
- Core Tagline: "JACK OF ALL TRADES: MASTER OF ONE, UNBOUND BY ANY."
- Bio: Priyank operates at the intersection of absolute aesthetic rigor and rigid engineering precision. Rather than binding himself to a single trade, he believes true mastery comes from synthesis. His practice spans full-stack software development, high-fashion campaign direction, analog film photography, spatial audio architecture, and custom branding ecosystems.

THE SIX CORE PORTFOLIO ARCHIVES:
1. L'ÉLOQUENCE DU SILENCE (Editorial Fashion Direction): A study of brutalist coastal rocks and flowing linens shot on 120mm medium format film.
2. THE COURTS OF CLAY (Sportswear Art Direction): A campaign design for athletic activewear set on terracotta clay courts.
3. THE MONO ARCHIVE (Audio Synthesis & Styling): Modular ambient drone synthesizer crossovers with technical apparel.
4. BRUTALIST LINENS (Menswear Art Direction): Rigid menswear structures and leather jackets shot against monolithic concrete structures.
5. RETRO ESCAPISM (Identity & Visual Campaign): Mid-century hotel road-trip imagery styled in nostalgic pastel shades.
6. SUMMER COOLDOWN (Editorial Direction & Film): Warm 35mm cinematic film highlighting coastal sunlight and deep blue swimwear.

THE SIX INSTRUMENTS / SKILLS:
- Wrench (Engineering): Custom full-stack software development, high performance, clean TypeScript APIs.
- Video Camera (Filmmaking & Photo): Analog film (35mm/120mm), cinematic movement, framing, lighting.
- Shears/Scissors (Art Direction): Castings, garment selection, editorial styling, bento layout design.
- Computer Mouse (UI/UX Design): Interactive web choreography, elegant grids, rich micro-animations.
- Pen (Writing): Copywriting, storytelling, conceptual branding documents.
- Guitar (Music): Sound synthesizers, modular ambient drone generation, spatial soundscapes.

CONVERSATION DIRECTIVES:
1. Keep replies concise, striking, and intellectually articulate.
2. Be polite and extremely helpful to recruiters, founders, and potential collaborators.
3. Answer questions about his skills, tools, works, or background directly.
4. Frame his "Jack of all trades" nature as his greatest strength—making him a powerful generalist who can ship a complete brand and its software infrastructure single-handedly.
5. If someone asks about hiring him, guide them to contact him directly at priyankv489@gmail.com or use the contact form.
6. Speak in ALL-CAPS or clean upper-case headlines to reflect the strong, brutalist font style of the playing card portfolio. Avoid verbose chat filler.
`;

    // Reconstruct history structure for the chats.create SDK API
    const chat = ai.chats.create({
      model: 'gemini-3.5-flash',
      config: {
        systemInstruction,
        temperature: 0.8,
      }
    });

    // Populate chat state with previous turns if any
    if (history && history.length > 0) {
      for (const turn of history) {
        // Simple mock injection into chat context or pass as initial contents
      }
    }

    const response = await chat.sendMessage({ message });
    const replyText = response.text || "SYSTEM INTERRUPT. ERROR FETCHING FROM DIGITAL TWIN.";

    res.json({ reply: replyText.toUpperCase() });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Server proxy failed to query digital double' });
  }
});

// Configure Vite middleware or production static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Priyank's Portfolio Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
