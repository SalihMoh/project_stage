import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    server: {
        hmr: {
            host: 'localhost', // Use 'localhost' or '127.0.0.1'
            port: 5173, // Default WebSocket port for Vite
            clientPort: 5173, // Ensure the client connects to the correct port
        },
    },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
    ],
});
