import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig, type Plugin } from 'vite'

// The entry stylesheet (~22 KB raw, ~4 KB gzipped) is render-blocking; inlining it into index.html
// removes that extra round trip before first paint. The .css file is still emitted for any other reference.
const inlineEntryCss = (): Plugin => ({
    name: 'inline-entry-css',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
        const html = bundle['index.html']
        if (html?.type !== 'asset') return
        let source = String(html.source)
        for (const [fileName, file] of Object.entries(bundle)) {
            if (file.type !== 'asset' || !fileName.endsWith('.css')) continue
            const linkTag = new RegExp(`<link rel="stylesheet"[^>]*href="/${fileName}"[^>]*>`)
            source = source.replace(linkTag, () => `<style>${String(file.source)}</style>`)
        }
        html.source = source
    },
})

export default defineConfig({
    plugins: [react(), inlineEntryCss()],
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
