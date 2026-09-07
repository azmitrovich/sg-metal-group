import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import type { IncomingMessage } from 'node:http'

const BASE = '/sg-metal-group/'

function rewriteBareBase(req: IncomingMessage, base: string) {
  const url = req.url
  if (!url) return
  const withSlash = base.endsWith('/') ? base : `${base}/`
  const withoutSlash = withSlash.slice(0, -1)
  const q = url.indexOf('?')
  const path = q === -1 ? url : url.slice(0, q)
  if (path === withoutSlash) {
    req.url = withSlash + (q === -1 ? '' : url.slice(q))
  }
}

function allowBaseSlashVariants(base: string): Plugin {
  return {
    name: 'allow-base-slash-variants',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        rewriteBareBase(req, base)
        next()
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        rewriteBareBase(req, base)
        next()
      })
    },
  }
}

export default defineConfig({
  base: BASE,
  plugins: [allowBaseSlashVariants(BASE), react()],
})
