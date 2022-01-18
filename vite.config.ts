import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import checker from 'vite-plugin-checker'
import legacy from '@vitejs/plugin-legacy'
import svgLoader from 'vite-svg-loader'

import path from 'path'
import url from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    checker({
      typescript: true,
      vueTsc: true,
      eslint: {
        files: ['./src'],
        extensions: ['.js', '.ts', '.vue'],
      },
    }),
    legacy({
      renderLegacyChunks: false,
    }),
    svgLoader(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '/src'),
    },
  },
})
