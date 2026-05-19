import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: 'autoUpdate',

      workbox: {
        globPatterns: ['**/*']
      },

      srcDir: 'src',
      filename: 'sw.js',

      strategies: 'injectManifest',

      manifest: {
        name: 'Assignment Tracker',
        short_name: 'Assignment Tracker',
        description: 'Track assignments and deadlines thoroughly and effectively',
        theme_color: '#2563EB',
        background_color: '#ffffff',

        icons: [
          {
            src: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
