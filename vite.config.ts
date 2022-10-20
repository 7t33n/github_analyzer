import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: { additionalData: '@import "./src/assets/scss/variables";@import "./src/assets/scss/mixins";' },
    },
  },
  server: {
    proxy: {
      '/login/oauth/': 'https://github.com/',
    },
  },
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg/')],
      symbolId: 'icon-[dir]-[name]',
    }),
    Components({
      dirs: ['./src/components/ui/'],
      exclude: ['./src/types/'],
    }),
  ],
});
