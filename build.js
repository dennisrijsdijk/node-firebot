import esbuild from 'esbuild';
import { rimraf } from 'rimraf';

async function build() {
    await rimraf('dist');

    const commonOptions = {
        entryPoints: ['src/index.ts'],
        bundle: true,
        minify: true,
        sourcemap: true,
        platform: 'node',
        target: 'node20',
        packages: 'external'
    };

    // Build for CommonJS
    await esbuild.build({
        ...commonOptions,
        format: 'cjs',
        outfile: 'dist/node-firebot.cjs'
    });

    // Build for ESM
    await esbuild.build({
        ...commonOptions,
        format: 'esm',
        outfile: 'dist/node-firebot.mjs'
    });

    console.log('Build complete');
}

build().catch(() => process.exit(1));
