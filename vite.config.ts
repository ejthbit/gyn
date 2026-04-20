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
    build: {
        emptyOutDir: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor-react': ['react', 'react-dom', 'react-router-dom', 'react-router-hash-link'],
                    'vendor-mui': ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
                    'vendor-misc': ['axios', 'date-fns', 'ramda', 'react-hook-form', '@hookform/resolvers', 'yup'],
                },
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
