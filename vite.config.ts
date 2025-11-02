import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.SAFE2PAY_API_KEY': JSON.stringify(env.SAFE2PAY_API_KEY),
        'process.env.SAFE2PAY_SECRET_KEY': JSON.stringify(env.SAFE2PAY_SECRET_KEY),
        'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY) // Corrected variable name
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'), // Adjusted alias to point to src
        }
      },
      build: {
        rollupOptions: {
          input: {
            main: path.resolve(__dirname, 'index.html'),
            admin: path.resolve(__dirname, 'admin.html')
          }
        }
      }
    };
});