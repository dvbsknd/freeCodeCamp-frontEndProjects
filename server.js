const ENV = process.env.NODE_ENV || 'production';
const PORT = 3000;
const http = require('http'),
  fs = require('fs');

const server = http.createServer((req, res) => {
  console.log('[Request]', req.url);
  const file = getFilePath(req.url);
  console.log('[File]', file);
  fs.readFile(file, (err, data) => {
    if (err) {
      res.end(err.message, console.log('[Error]', err));
    } else {
      res.writeHead(200, getContentType(req.url));
      res.end(data, console.log('[Response]', req.url));
    }
  });
});

const getFilePath = (url) => __dirname + '/challenges' + getFileName(url);
const getFileName = (url) => url;

const getContentType = (url) => {
  const fileType = url.match(/\.(html|css|js|png|m4a)$/g);
  switch (fileType[0]) {
    case '.html':
      return { 'Content-Type': 'text/html' };
    case '.css':
      return { 'Content-Type': 'text/css' };
    case '.js':
      return { 'Content-Type': 'text/javascript' };
    case '.png':
      return { 'Content-Type': 'image/png' };
    case '.m4a':
      return { 'Content-Type': 'audio/m4a' };
    default:
      return { 'Content-Type': 'text/plain' };
  }
};

server.listen(PORT, console.log(`[Status] Server (${ENV}) listening on ${PORT}`));
