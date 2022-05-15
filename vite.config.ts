import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import prismjs from 'vite-plugin-prismjs'
import viteEjs from './vite-plugin-ejs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), viteEjs(), prismjs({
    languages: 'all',
    plugins: ['toolbar', 'show-language', 'copy-to-clipboard'],
    theme: 'tomorrow',
    css: true
  }), svgLoader()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/scss/base/var.scss";
          @import "./src/scss/base/mixins.scss";
          @import "./src/scss/base/functions.scss";
        `
      }
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        article: resolve(__dirname, 'article/index.html'),
        about: resolve(__dirname, 'about/index.html')
      }
    }
  }
})
