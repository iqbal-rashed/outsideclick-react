import { resolve } from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import EsLint from 'vite-plugin-linter'
import tsConfigPaths from 'vite-tsconfig-paths'
const { EsLinter, linterPlugin } = EsLint
import * as packageJson from './package.json'
// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
    plugins: [
        react(),
        tsConfigPaths(),
        linterPlugin({
            include: ['./src}/**/*.{ts,tsx}'],
            linters: [new EsLinter({ configEnv })],
        }),
        dts({
            include: ['src/'],
        }),
    ],
    build: {
        lib: {
            entry: resolve('src', 'index.tsx'),
            name: 'OutSideClick',
            formats: ['es', 'umd'],
            fileName: (format) => `outsideclick-react.${format}.js`,
        },
        rollupOptions: {
            external: [...Object.keys(packageJson.peerDependencies)],
        },
    },
}))
