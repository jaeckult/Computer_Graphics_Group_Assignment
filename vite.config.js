/**
* @type {import('vite').UserConfig}
*/
export default {
  // Remove GitHub Pages base path for Vercel deployment
  base: '/',
  build: {
    outDir: './dist',
    sourcemap: true,
  },
  publicDir: './public',
}