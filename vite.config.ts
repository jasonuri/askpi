
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import path from 'path';
  import prerender from '@prerenderer/rollup-plugin';
  import PuppeteerRenderer from '@prerenderer/renderer-puppeteer';

  // Disable prerender on CI (Vercel) since Puppeteer isn't available
  const isCI = process.env.CI || process.env.VERCEL;

  export default defineConfig({
    plugins: [
      react(),
      // Only use prerender locally, not on CI/Vercel
      ...(!isCI ? [prerender({
        routes: ['/', '/about'],
        staticDir: path.resolve(__dirname, 'build'),
        renderer: new PuppeteerRenderer({
          renderAfterTime: 2000,
          headless: true,
        }),
      })] : []),
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        'vaul@1.1.2': 'vaul',
        'sonner@2.0.3': 'sonner',
        'recharts@2.15.2': 'recharts',
        'react-resizable-panels@2.1.7': 'react-resizable-panels',
        'react-hook-form@7.55.0': 'react-hook-form',
        'react-day-picker@8.10.1': 'react-day-picker',
        'next-themes@0.4.6': 'next-themes',
        'lucide-react@0.487.0': 'lucide-react',
        'input-otp@1.4.2': 'input-otp',
        'figma:asset/ef16e9c5a9bcd6bd5253075f0a483958be79f3de.png': path.resolve(__dirname, './src/assets/ef16e9c5a9bcd6bd5253075f0a483958be79f3de.png'),
        'figma:asset/e665c9f11ea03326d5d353882467fee42dd5af19.png': path.resolve(__dirname, './src/assets/e665c9f11ea03326d5d353882467fee42dd5af19.png'),
        'figma:asset/d226d88d03af27ba316f2c80bdbe64f77c542eb7.png': path.resolve(__dirname, './src/assets/d226d88d03af27ba316f2c80bdbe64f77c542eb7.png'),
        'figma:asset/c7a094102c04770a049649678bee8972612e4311.png': path.resolve(__dirname, './src/assets/c7a094102c04770a049649678bee8972612e4311.png'),
        'figma:asset/c40581f9b8c7e5e828be9449db64f4c9ece84071.png': path.resolve(__dirname, './src/assets/c40581f9b8c7e5e828be9449db64f4c9ece84071.png'),
        'figma:asset/88f726e79209f872fda913d076035b2df8f0b8a9.png': path.resolve(__dirname, './src/assets/88f726e79209f872fda913d076035b2df8f0b8a9.png'),
        'figma:asset/84de9bd378b84833b5d3c9a87db70b876161a95a.png': path.resolve(__dirname, './src/assets/84de9bd378b84833b5d3c9a87db70b876161a95a.png'),
        'figma:asset/840fa504e4320458f1b634a3fb3954aab9226079.png': path.resolve(__dirname, './src/assets/840fa504e4320458f1b634a3fb3954aab9226079.png'),
        'figma:asset/6be16f7f596dd076321aa52cf56618b9901eae4e.png': path.resolve(__dirname, './src/assets/6be16f7f596dd076321aa52cf56618b9901eae4e.png'),
        'figma:asset/6ab84fec85d56d5fcd2fa1ddbe335d165e340b86.png': path.resolve(__dirname, './src/assets/6ab84fec85d56d5fcd2fa1ddbe335d165e340b86.png'),
        'figma:asset/6955d5d8200c43264a095dbe397d6301c04edf05.png': path.resolve(__dirname, './src/assets/6955d5d8200c43264a095dbe397d6301c04edf05.png'),
        'figma:asset/3bd959c6124b8a4784ba9df8e5e8a6729e00e7f9.png': path.resolve(__dirname, './src/assets/3bd959c6124b8a4784ba9df8e5e8a6729e00e7f9.png'),
        'figma:asset/22f125e73dc7b00276116335ee29315f06475c2f.png': path.resolve(__dirname, './src/assets/22f125e73dc7b00276116335ee29315f06475c2f.png'),
        'figma:asset/118fb2ba60607b99fb4d5193cf25fce24fd162e7.png': path.resolve(__dirname, './src/assets/118fb2ba60607b99fb4d5193cf25fce24fd162e7.png'),
        // WebP aliases (optimized versions)
        'figma:asset/ef16e9c5a9bcd6bd5253075f0a483958be79f3de.webp': path.resolve(__dirname, './src/assets/ef16e9c5a9bcd6bd5253075f0a483958be79f3de.webp'),
        'figma:asset/e665c9f11ea03326d5d353882467fee42dd5af19.webp': path.resolve(__dirname, './src/assets/e665c9f11ea03326d5d353882467fee42dd5af19.webp'),
        'figma:asset/d226d88d03af27ba316f2c80bdbe64f77c542eb7.webp': path.resolve(__dirname, './src/assets/d226d88d03af27ba316f2c80bdbe64f77c542eb7.webp'),
        'figma:asset/c7a094102c04770a049649678bee8972612e4311.webp': path.resolve(__dirname, './src/assets/c7a094102c04770a049649678bee8972612e4311.webp'),
        'figma:asset/c40581f9b8c7e5e828be9449db64f4c9ece84071.webp': path.resolve(__dirname, './src/assets/c40581f9b8c7e5e828be9449db64f4c9ece84071.webp'),
        'figma:asset/88f726e79209f872fda913d076035b2df8f0b8a9.webp': path.resolve(__dirname, './src/assets/88f726e79209f872fda913d076035b2df8f0b8a9.webp'),
        'figma:asset/84de9bd378b84833b5d3c9a87db70b876161a95a.webp': path.resolve(__dirname, './src/assets/84de9bd378b84833b5d3c9a87db70b876161a95a.webp'),
        'figma:asset/840fa504e4320458f1b634a3fb3954aab9226079.webp': path.resolve(__dirname, './src/assets/840fa504e4320458f1b634a3fb3954aab9226079.webp'),
        'figma:asset/6be16f7f596dd076321aa52cf56618b9901eae4e.webp': path.resolve(__dirname, './src/assets/6be16f7f596dd076321aa52cf56618b9901eae4e.webp'),
        'figma:asset/6ab84fec85d56d5fcd2fa1ddbe335d165e340b86.webp': path.resolve(__dirname, './src/assets/6ab84fec85d56d5fcd2fa1ddbe335d165e340b86.webp'),
        'figma:asset/6955d5d8200c43264a095dbe397d6301c04edf05.webp': path.resolve(__dirname, './src/assets/6955d5d8200c43264a095dbe397d6301c04edf05.webp'),
        'figma:asset/3bd959c6124b8a4784ba9df8e5e8a6729e00e7f9.webp': path.resolve(__dirname, './src/assets/3bd959c6124b8a4784ba9df8e5e8a6729e00e7f9.webp'),
        'figma:asset/22f125e73dc7b00276116335ee29315f06475c2f.webp': path.resolve(__dirname, './src/assets/22f125e73dc7b00276116335ee29315f06475c2f.webp'),
        'figma:asset/118fb2ba60607b99fb4d5193cf25fce24fd162e7.webp': path.resolve(__dirname, './src/assets/118fb2ba60607b99fb4d5193cf25fce24fd162e7.webp'),
        // Responsive image variants for hero image
        'figma:asset/e665c9f11ea03326d5d353882467fee42dd5af19-480w.webp': path.resolve(__dirname, './src/assets/e665c9f11ea03326d5d353882467fee42dd5af19-480w.webp'),
        'figma:asset/e665c9f11ea03326d5d353882467fee42dd5af19-800w.webp': path.resolve(__dirname, './src/assets/e665c9f11ea03326d5d353882467fee42dd5af19-800w.webp'),
        'figma:asset/e665c9f11ea03326d5d353882467fee42dd5af19-1200w.webp': path.resolve(__dirname, './src/assets/e665c9f11ea03326d5d353882467fee42dd5af19-1200w.webp'),
        // Responsive image variants for founder photos
        'figma:asset/c7a094102c04770a049649678bee8972612e4311-160w.webp': path.resolve(__dirname, './src/assets/c7a094102c04770a049649678bee8972612e4311-160w.webp'),
        'figma:asset/d226d88d03af27ba316f2c80bdbe64f77c542eb7-160w.webp': path.resolve(__dirname, './src/assets/d226d88d03af27ba316f2c80bdbe64f77c542eb7-160w.webp'),
        'figma:asset/84de9bd378b84833b5d3c9a87db70b876161a95a-160w.webp': path.resolve(__dirname, './src/assets/84de9bd378b84833b5d3c9a87db70b876161a95a-160w.webp'),
        'embla-carousel-react@8.6.0': 'embla-carousel-react',
        'cmdk@1.1.1': 'cmdk',
        'class-variance-authority@0.7.1': 'class-variance-authority',
        '@radix-ui/react-tooltip@1.1.8': '@radix-ui/react-tooltip',
        '@radix-ui/react-toggle@1.1.2': '@radix-ui/react-toggle',
        '@radix-ui/react-toggle-group@1.1.2': '@radix-ui/react-toggle-group',
        '@radix-ui/react-tabs@1.1.3': '@radix-ui/react-tabs',
        '@radix-ui/react-switch@1.1.3': '@radix-ui/react-switch',
        '@radix-ui/react-slot@1.1.2': '@radix-ui/react-slot',
        '@radix-ui/react-slider@1.2.3': '@radix-ui/react-slider',
        '@radix-ui/react-separator@1.1.2': '@radix-ui/react-separator',
        '@radix-ui/react-select@2.1.6': '@radix-ui/react-select',
        '@radix-ui/react-scroll-area@1.2.3': '@radix-ui/react-scroll-area',
        '@radix-ui/react-radio-group@1.2.3': '@radix-ui/react-radio-group',
        '@radix-ui/react-progress@1.1.2': '@radix-ui/react-progress',
        '@radix-ui/react-popover@1.1.6': '@radix-ui/react-popover',
        '@radix-ui/react-navigation-menu@1.2.5': '@radix-ui/react-navigation-menu',
        '@radix-ui/react-menubar@1.1.6': '@radix-ui/react-menubar',
        '@radix-ui/react-label@2.1.2': '@radix-ui/react-label',
        '@radix-ui/react-hover-card@1.1.6': '@radix-ui/react-hover-card',
        '@radix-ui/react-dropdown-menu@2.1.6': '@radix-ui/react-dropdown-menu',
        '@radix-ui/react-dialog@1.1.6': '@radix-ui/react-dialog',
        '@radix-ui/react-context-menu@2.2.6': '@radix-ui/react-context-menu',
        '@radix-ui/react-collapsible@1.1.3': '@radix-ui/react-collapsible',
        '@radix-ui/react-checkbox@1.1.4': '@radix-ui/react-checkbox',
        '@radix-ui/react-avatar@1.1.3': '@radix-ui/react-avatar',
        '@radix-ui/react-aspect-ratio@1.1.2': '@radix-ui/react-aspect-ratio',
        '@radix-ui/react-alert-dialog@1.1.6': '@radix-ui/react-alert-dialog',
        '@radix-ui/react-accordion@1.2.3': '@radix-ui/react-accordion',
        '@jsr/supabase__supabase-js@2.49.8': '@jsr/supabase__supabase-js',
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'build',
    },
    server: {
      port: 3000,
      open: true,
    },
  });