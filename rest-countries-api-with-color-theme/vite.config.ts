import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        app: './main.html', // Specify main.html as the entry point for the build
      },
    },
  },
  server: {
    open: '/main.html', // Automatically open main.html when you run the dev server
  }
})
