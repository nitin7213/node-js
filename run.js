const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(800, { 'Content-Type': 'text/html' }); ///(error code (ok), content-type:text/plain or text/html
  res.write('<h1>hello world</h1>');
  res.end('we can also write here');
});

server.listen(8000, () => {
  console.log('server is running');
});

console.log('connection established at http://localhost:8000');
