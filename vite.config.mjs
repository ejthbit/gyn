import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import federation from '@originjs/vite-plugin-federation'
import path from 'node:path'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
    return defineConfig({
        plugins: [
            react(),
            TanStackRouterVite(),
            federation({
                name: 'app',
                filename: 'app.js',
                remotes: {
                    'reservation-app': {
                        external: `${process.env.VITE_RESERVATION_APP_URL}/assets/remoteEntry.js`,
                        from: 'vite',
                        externalType: 'url',
                    },
                },
                exposes: {
                    './theme': './src/theme.js',
                },
                shared: ['react', 'react-dom', '@tanstack/react-router'],
            }),
        ],
        resolve: {
            alias: {
                '@components': path.resolve(__dirname, 'src/components/'),
                '@utilities': path.resolve(__dirname, 'src/utils/'),
                '@assets': path.resolve(__dirname, 'src/assets/'),
            },
        },
        preview: {
            host: '127.0.0.1',
            port: 5001,
            strictPort: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        },
        build: {
            target: 'esnext',
            minify: false,
            cssCodeSplit: false,
        },
        base: process.env.VITE_WEB_BASE_URL,
    })
}
