import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

function inlineCssPlugin(): Plugin {
  return {
    name: 'inline-css-plugin',
    apply: 'build',
    enforce: 'post',
    transformIndexHtml(html, ctx) {
      if (!ctx.bundle) return html;
      let newHtml = html;
      for (const [fileName, file] of Object.entries(ctx.bundle)) {
        if (fileName.endsWith('.css') && file.type === 'asset') {
          const cssContent = file.source.toString();
          const escapedFileName = fileName.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
          const regex = new RegExp(`<link[^>]*href="[^"]*${escapedFileName}"[^>]*>`, 'g');
          newHtml = newHtml.replace(regex, `<style>${cssContent}</style>`);
        }
      }
      return newHtml;
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), inlineCssPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      modulePreload: {
        resolveDependencies(filename, deps) {
          return deps.filter(
            dep =>
              !dep.includes('AboutAccordion') &&
              !dep.includes('WorkGrid') &&
              !dep.includes('LegalModal') &&
              !dep.includes('vendor-motion') &&
              !dep.includes('vendor-lucide')
          );
        },
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/lucide-react')) {
              return 'vendor-lucide';
            }
            if (id.includes('node_modules/motion') || id.includes('node_modules/framer-motion')) {
              return 'vendor-motion';
            }
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
