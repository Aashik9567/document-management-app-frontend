import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
   server: {
    proxy: {
      '/api': {
        target: 'https://document-backend-y4tz.onrender.com', // your backend server
       changeOrigin: true,
          secure: false, // Set to true if your backend uses HTTPS
          rewrite: (path) => path.replace(/^\/api/, ''), 
       
      },
    },
  },
  plugins: [
    tailwindcss(),
  ],
})