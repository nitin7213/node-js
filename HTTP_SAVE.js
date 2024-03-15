const http = require('http');

http
  .createServer((req, res) => {
    res.setHeader('Location', 'https://kuizzer.in/'); /// For this redirection to work set the error code to 302 & should written first
    res.writeHead(302, { 'Content-Type': 'text/html' }); ///(error code (ok), content-type:text/plain or text/html
    res.write('<h1>hello world</h1>');
    res.end('we can also write here');
  })
  .listen(8000);

console.log('connection established at http://localhost:8000');

/// Creating my first localhost server using node.js via http

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// just make some variables like reqListener and confirmCallback and insert their values

const http = require('http');

const reqListener = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('hello everybody');
  res.end();
};

const server = http.createServer(reqListener);

const confirmCallback = () => {
  console.log('Server is running at http://localhost:8000');
};
server.listen(8000, confirmCallback);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////Reading a file in Sync (nested manner)
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const str = fs.readFileSync('index.html', 'utf8');
  res.writeHead(800, { 'content-type': 'text/html' });
  res.write(str);
  res.end();
});

server.listen(8000, () => {
  console.log('http://localhost:8000');
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////Reading a file in ASync (nested manner)
//////////Using Callbacks

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  fs.readFile('index.html', 'utf8', (err, data) => {
    if (err) {
      res.writeHead(500, { 'content-type': 'text/html' });
      res.end('Internal server error');
    } else {
      res.writeHead(200, { 'content-type': 'text/html' });
      res.write(data);
      res.end();
    }
  });
});

const PORT = 8000;

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

/////////Using Async/await
const http = require('http');
const fs = require('fs/promises'); //because Async

const server = http.createServer(async (req, res) => {
  try {
    const data = await fs.readFile('index.html', 'utf8'); ///promise handled
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write(data);
    res.end();
  } catch (err) {
    console.log(err);
  }
});

const PORT = 8000;

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////Reading a file in Sync (different function)

const http = require('http');
const fs = require('fs');

// Read file synchronously
function readFile() {
  const data = fs.readFileSync('index.html', 'utf8'); //use of readFileSync
  return data;
}

/// Server Start
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/html' });
  const data = readFile();
  res.write(data);
  res.end();
});
server.listen(8000, () => {
  console.log('addr: http://localhost:8000');
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////Reading a file in ASync (different function)

/////////Using Async/await
const http = require('http');
const fs = require('fs/promises'); //async

//Read function
async function readFile() {
  const data = await fs.readFile('index.html', 'utf8');
  return data;
}

/// Server Start
const server = http.createServer(async (req, res) => {
  res.writeHead(200, { 'content-type': 'text/html' });

  const data = await readFile(); ///need to handle again because its async
  res.write(data);
  res.end();
});
server.listen(8000, () => {
  console.log('addr: http://localhost:8000');
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const http = require('http');

const reqListener = (req, res) => {
  console.dir(req, { depth: 0 }); /// log all the request on terminal without going in depth and it will request 'twice'
  console.dir(res, { depth: 0 });
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('ended Successfuly');
};

const server = http.createServer(reqListener);

server.listen(8000, () => {
  console.log('http://localhost:8000');
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
Http Methods: Not used much
GET: Retrieve data from a server using a URL.
POST: Send data to a server to create a resource.
PUT: Update an existing resource on the server.(File Upload)
DELETE: Remove a resource from the server.
PATCH: Partially update a resource on the server.(Update)
*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Use of  req.url === "/"
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  // In web development, when you access a website, the default path is
  // often specified as the root patsh ("/").For example, if you enter "http://localhost:8000/"
  // in your browser,the server receives a request with the URL "/" because it's the root path.

  if (req.url === '/') {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        console.log(req.url); ///print req.url
        res.end();
      }
    });
  } else {
    // Handle other routes
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const PORT = 8000;

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////Url Module --> useful when you need to manipulate or analyze URLs in a Node.js application
//req.url---> /?name=nitin&age=25  Doesn't give whole address

const url = require('url');

const inputUrl = 'http://localhost:9000/user?country=India&city=Delhi';
const parsedUrl = url.parse(inputUrl, true); //true, parses the query string into an object

console.log(parsedUrl.host);
console.log(parsedUrl.pathname);
console.log(parsedUrl.search);

console.log(parsedUrl.query.country);
console.log(parsedUrl.query.city);

/*
Url {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host/Domain: 'localhost:9000',
  port: '9000',
  hostname: 'localhost',
  hash: null,
  search: '?country=India&city=Delhi',
  query: [Object: null prototype] { country: 'India', city: 'Delhi' },
  pathname: '/user',
  path: '/user?country=India&city=Delhi',
  href: 'http://localhost:9000/user?country=India&city=Delhi'
}
*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////req.url used in localhost
///Steps-->http sever ---> grab url---> server.listen

const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/html' }); // text/json is also there
  const parsed = url.parse(req.url, true); //true, parses the query string into an object
  const str = JSON.stringify(parsed, null, 2);
  res.write(str);

  const name = parsed.query.name || 'N/A'; // NA should be there by chance if not have argument return error
  const age = parsed.query.age || 'N/A';
  const host = req.headers.host || 'N/A'; //req.headers.host--> for hostname

  // Concatenate query parameters with line breaks
  const responseText = `Name: ${name} Age: ${age} Host: ${host}`;
  res.end(responseText);
});

server.listen(8000, () => {
  console.log('addr: http://localhost:8000/?name=nitin&age=25');
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//HTTP Methods But not used much (Express)
// GET: Used to retrieve data from the server.
// POST: Used to submit data to be processed by the server.
// PUT: Used to update data on the server.
// DELETE: Used to delete data from the server.
// PATCH: Used to partially update data on the server.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
