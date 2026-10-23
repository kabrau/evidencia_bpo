const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 4173);
const HOST = process.env.HOST || '0.0.0.0';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
};

function safeJoin(root, urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const clean = decodeURIComponent(decoded).replace(/\\/g, '/');
  const resolved = path.normalize(path.join(root, clean));
  return resolved.startsWith(path.normalize(root)) ? resolved : null;
}

function send(res, status, body, headers) {
  res.writeHead(status, Object.assign({
    'Content-Type': 'text/plain; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'no-referrer',
  }, headers || {}));
  res.end(body);
}

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    send(res, 405, 'Method not allowed');
    return;
  }

  const urlPath = req.url === '/' ? '/index.html' : req.url;
  let file = safeJoin(ROOT, urlPath);
  if (!file) {
    send(res, 403, 'Forbidden');
    return;
  }

  fs.stat(file, (err, stat) => {
    if (err || !stat.isFile()) {
      const hasExtension = path.extname(file) !== '';
      if (hasExtension) {
        send(res, 404, 'Not found');
        return;
      }
      file = path.join(ROOT, 'index.html');
    }

    fs.readFile(file, (readErr, buf) => {
      if (readErr) {
        send(res, 500, 'Internal error');
        return;
      }
      const ext = path.extname(file).toLowerCase();
      const isHtml = ext === '.html';
      res.writeHead(200, {
        'Content-Type': MIME[ext] || 'application/octet-stream',
        'Content-Length': buf.length,
        'Cache-Control': isHtml ? 'no-store' : 'public, max-age=300',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'no-referrer',
      });
      if (req.method === 'HEAD') res.end();
      else res.end(buf);
    });
  });
});

server.listen(PORT, HOST, () => {
  console.log('Evidência · protótipo rodando em http://' + HOST + ':' + PORT);
});
