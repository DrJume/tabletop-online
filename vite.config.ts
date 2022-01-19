import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import checker from 'vite-plugin-checker'
import legacy from '@vitejs/plugin-legacy'

import svgLoader from 'vite-svg-loader'
import VueTypeImports from 'vite-plugin-vue-type-imports'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // checker({
    //   typescript: true,
    //   vueTsc: true,
    //   // eslint: {
    //   //   files: ['./src'],
    //   //   extensions: ['.js', '.ts', '.vue'],
    //   // },
    // }),
    legacy({
      renderLegacyChunks: false,
    }),
    VueTypeImports(),
    svgLoader(),
  ],
  resolve: {
    alias: {
      '@/': new URL('src/', import.meta.url).pathname,
    },
  },
})
