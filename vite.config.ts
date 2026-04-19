import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [react()],
    optimizeDeps: {
        entries: ['src/main.tsx'],
        include: [
            'react',
            'react-dom',
            'react-dom/client',
            'react-router-dom',
            '@mui/material',
            '@mui/material/styles',
            '@emotion/react',
            '@emotion/styled',
        ],
        esbuildOptions: {
            loader: {
                '.js': 'jsx',
            },
        },
    },
    resolve: {
        alias: {
            '@components': resolve(__dirname, 'src/components'),
            '@utilities': resolve(__dirname, 'src/utilities'),
            '@assets': resolve(__dirname, 'src/assets'),
        },
    },
    server: {
        port: 3003,
        host: 'localhost',
    },
})
