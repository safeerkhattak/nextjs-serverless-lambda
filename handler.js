const serverless = require('serverless-http')
const path = require('path')
const fs = require('fs')

// Get the project root directory
const projectRoot = __dirname
const standaloneDir = path.join(projectRoot, '.next', 'standalone')

// Set environment variables
process.env.NODE_ENV = 'production'
process.env.NEXT_TELEMETRY_DISABLED = '1'

// Store original working directory
const originalCwd = process.cwd()

// Change to standalone directory for Next.js
process.chdir(standaloneDir)

// Load Next.js
const next = require('next')

const app = next({ 
  dev: false,
  dir: standaloneDir,
  conf: {
    distDir: path.join(standaloneDir, '.next'),
  }
})

let serverReady = false
let handler = null

// Helper function to serve static files
const serveStaticFile = (req, res, filePath) => {
  try {
    console.log(`[Static File] Attempting to serve: ${filePath}`)
    
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath)
      const contentType = {
        '.css': 'text/css; charset=utf-8',
        '.js': 'application/javascript; charset=utf-8',
        '.json': 'application/json; charset=utf-8',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2',
        '.ttf': 'font/ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.map': 'application/json',
        '.webp': 'image/webp',
        '.ico': 'image/x-icon',
      }[ext] || 'application/octet-stream'
      
      res.setHeader('Content-Type', contentType)
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS')
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
      
      const fileContent = fs.readFileSync(filePath)
      console.log(`[Static File] Successfully served: ${filePath} (${fileContent.length} bytes)`)
      res.writeHead(200)
      res.end(fileContent)
      return true
    } else {
      console.log(`[Static File] File not found or not a file: ${filePath}`)
    }
  } catch (error) {
    console.error(`[Static File] Error serving static file ${filePath}:`, error.message)
  }
  return false
}

// Prepare the Next.js app and create server
const prepareApp = async () => {
  if (!serverReady) {
    await app.prepare()
    const handle = app.getRequestHandler()
    
    // Create a simple HTTP server
    const server = require('http').createServer(async (req, res) => {
      // Restore original working directory for path resolution
      process.chdir(originalCwd)
      
      const url = req.url || '/'
      console.log(`[Request] ${req.method} ${url}`)
      
      // Handle OPTIONS requests for CORS
      if (req.method === 'OPTIONS') {
        console.log(`[CORS] Handling OPTIONS request for ${url}`)
        res.writeHead(200, {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        })
        res.end()
        return
      }
      
      // Handle static files from .next/static (at project root) - this is critical for JS chunks
      if (url.startsWith('/_next/static/')) {
        const relativePath = url.replace('/_next/static/', '')
        const staticPath = path.join(projectRoot, '.next', 'static', relativePath)
        console.log(`[Static] Attempting to serve static file: ${staticPath}`)
        
        if (serveStaticFile(req, res, staticPath)) {
          return
        }
        
        // Also try from standalone directory
        const standaloneStaticPath = path.join(standaloneDir, '.next', 'static', relativePath)
        console.log(`[Static] Trying standalone path: ${standaloneStaticPath}`)
        if (serveStaticFile(req, res, standaloneStaticPath)) {
          return
        }
        
        console.log(`[Static] Failed to serve static file for: ${url}`)
      }
      
      // Handle _next/image and other Next.js internal routes
      if (url.startsWith('/_next/')) {
        console.log(`[Next.js Internal] Handling: ${url}`)
        // Try to serve from project root first (where static files actually are)
        const projectStaticPath = path.join(projectRoot, '.next', url.replace('/_next/', ''))
        if (serveStaticFile(req, res, projectStaticPath)) {
          return
        }
        
        // Fall back to standalone directory
        const standaloneStaticPath = path.join(standaloneDir, '.next', url.replace('/_next/', ''))
        if (serveStaticFile(req, res, standaloneStaticPath)) {
          return
        }
      }
      
      // Change back to standalone directory for Next.js handler
      process.chdir(standaloneDir)
      
      // Handle all other requests with Next.js
      console.log(`[Next.js] Handling request with Next.js: ${url}`)
      try {
        await handle(req, res)
        console.log(`[Next.js] Successfully handled: ${url}`)
      } catch (error) {
        console.error(`[Next.js] Error handling request ${url}:`, error.message)
        if (!res.headersSent) {
          res.writeHead(500, { 'Content-Type': 'text/plain' })
          res.end('Internal Server Error')
        }
      }
    })
    
    // Wrap with serverless-http
    handler = serverless(server, {
      binary: ['image/*', 'font/*', 'application/font-*', 'application/javascript', 'text/javascript'],
      request: (request, event, context) => {
        // Ensure proper headers for API Gateway
        request.headers['x-forwarded-proto'] = 'https'
        request.headers['x-forwarded-for'] = event.requestContext?.http?.sourceIp || ''
        request.headers['host'] = event.requestContext?.domainName || request.headers['host'] || ''
      },
    })
    serverReady = true
  }
}

// Lambda handler
exports.handler = async (event, context) => {
  console.log(`[Lambda] Handler invoked - Path: ${event.path || event.requestContext?.http?.path || 'unknown'}`)
  
  // Ensure app is ready
  await prepareApp()
  
  // Use serverless-http to handle the request
  try {
    const result = await handler(event, context)
    console.log(`[Lambda] Request completed - Status: ${result?.statusCode || 'unknown'}`)
    return result
  } catch (error) {
    console.error('[Lambda] Handler error:', error.message, error.stack)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Internal Server Error', message: error.message }),
    }
  }
}
