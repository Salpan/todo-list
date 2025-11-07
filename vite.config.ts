import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            _components: '/src/components',
            _types: '/src/types',
        },
    },
    plugins: [react()],
});
