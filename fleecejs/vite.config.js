/// <reference types="vitest" />

import { resolve } from 'path'
import { defineConfig } from 'vite'
import typescript from '@rollup/plugin-typescript'

export default defineConfig({
    build:  {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'Fleece',
            fileName: 'fleece'

        }
    },
    plugins: [
        typescript({
            target: 'es2020',
            rootDir: resolve(__dirname, 'src'),
            declaration: true,
            declarationDir: resolve(__dirname, 'dist'),
            exclude: [
                'node_modules',
                '**/*.spec.ts'
            ],
            allowSyntheticDefaultImports: true,
            
        })
    ],
    test: {
        testMatch: ['**/*.spec.ts'],
        files: [
            'src/**/*.spec.ts'
        ],
    }
})