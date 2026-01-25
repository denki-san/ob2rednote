import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  // 加载当前模式下的环境变量
  const env = loadEnv(mode, process.cwd())

  return {
    root: '.',
    base: env.VITE_BASE_URL || '/',
    server: {
      port: 5173,
      open: false,
      allowedHosts: (env.VITE_ALLOWED_HOSTS || 'localhost').split(','),
      hmr: {
        host: env.VITE_HMR_HOST || 'localhost',
        protocol: 'wss',
        clientPort: 443
      }
    },
    build: {
      outDir: 'dist'
    }
  }
})
