//Express: Framework Built on http protocol
/*
Nodemon :automatically restarts the Node.js server when changes are detected
Install-->npm install -D nodemon
Run   --->nodemon run.js
*/
const express = require('express');

const app = express(); // App is instance of express

//route always should start from '/'
app.get('/', (req, res) => {
  return res.send('hello from home page'); //for rendering
});

app.get('/users', (req, res) => {
  return res.send(`Hello ${req.query.name}`); //http://localhost:8000/users?name=nitin
}); //query=?name=nitin

app.listen(8000, () => {
  console.log('http://localhost:8000/');
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
RESTFUL API:(Representational State Transfer API)
1. Works on CSR(Client side rendering): Database-->JSON--> Client Render(slow)
------SSR(Server side rendering):Used when our client is a browser as it sends direct html form server(fast)
2. Respect HTTP METHODS / Route Handler Functions:
 GET: Used to retrieve data from the server
 POST: Used to submit data to be processed by the server
 DELETE: Used to delete data from the server
 PATCH: only updates the fields that we pass
 PUT: updates the entire resource at once


*/

//Common Route tag
app
  .route('/api/users/:id')
  .get((req, res) => {
    return res.json(user);
  })
  .delete((req, res) => {
    return res.json({ status: 'pending' });
  })
  .patch((req, res) => {
    return res.json({ status: 'pending' });
  })
  .put((req, res) => {
    return res.json({ status: 'pending' });
  });

//GET (return the whole API used in CSR)
app.get('/api/users', (req, res) => {
  return res.json(users);
});

//-->Get the User with ID 1(Params)
app.get('/api/users/:id', (req, res) => {
  const id = JSON.parse(req.params.id);
  const index = users.findIndex((user) => user.id === id);
  if (index == -1) return res.json({ error: 'ID not found' });
  return res.json(users[index]);
});

//-->EXTRACT NAMES from the list used in SSR
app.get('/users', (req, res) => {
  const html = `<ul>
  ${users
    .map((idx) => {
      return `<li>${idx.first_name}</li>`;
    })
    .join('')}}</ul>`;
  res.send(html);
});

//POST (Create new User)
app.use(express.urlencoded({ extended: false })); //Middleware(req.body='undefined')

app.post('/api/users', (req, res) => {
  const cid = users.length + 1;
  //Spread Operator :for expanding iterables like arrays, strings, or objects into individual elements
  const info = { id: cid, ...req.body };

  users.splice(cid, 0, info);

  //TO make the data accessible even after the server is restart
  fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), () => {
    return res.status(201).json({ status: 'Success', id: cid });
  });
});

//PATCH (Partially Edit User with ID)
app.use(express.urlencoded({ extended: false })); //Middleware(req.body='undefined')

app.patch('/api/users/:id', (req, res) => {
  const cid = JSON.parse(req.params.id);
  const index = users.findIndex((user) => user.id === cid);

  if (index == -1) return res.json({ error: 'ID not found' });

  users[index] = { ...users[index], ...req.body };

  fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), () => {
    return res.json({ Status: 'Updated', id: cid });
  });
});

//PUT (Edit User with ID)
app.use(express.urlencoded({ extended: false })); //Middleware(req.body='undefined')

app.put('/api/users/:id', (req, res) => {
  const cid = JSON.parse(req.params.id);
  const index = users.findIndex((user) => user.id === cid);

  if (index == -1) return res.json({ error: 'ID not found' });

  users[index] = { ...users[index], ...req.body };

  fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), () => {
    return res.json({ Status: 'Updated', id: cid });
  });
});

//DELETE (Delete the user with ID)
app.delete('/api/users/:id', (req, res) => {
  const cid = JSON.parse(req.params.id); //Parsing string Url

  const index = users.findIndex((user) => {
    return user.id === cid;
  });

  //Checks index present or not
  if (index === -1) return res.json({ message: 'User not found' });

  //splice(index, to how many are removed, add elm1,elm2 at same index)
  users.splice(index, 1); //modifies the Array and returns the deleted elements

  fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), () => {
    return res.json({ status: 'Deleted', id: cid });
  });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Middleware: Function that has access to the 'req','res', and 'next' middleware function in the application
//"use"-->Used to create Middleware

app.use((req, res, next) => {
  console.log('Hello from middleware 1');
  next(); //pass control to the next middleware function or route handler
});

//Built-in middleware (used in forms)
app.use(express.urlencoded({ extended: false }));

//Log all 'req methods' using middleware
app.use((req, res, next) => {
  fs.appendFile(
    'log.txt',
    `${Date.now()}:${req.method}:${req.ip}: ${req.path}\n`,
    () => {
      next();
    }
  );
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//HTTP HEADER: Used to carry information for the request and response body
app.get('/api/users', (req, res) => {
  res.setHeader('X-owner', 'Nitin'); //Custom Header started with X
  console.log(req.headers); //Checking the req headers
  return res.json(users);
});

/*
req.params: An object containing properties mapped to the named route "parameters". For example, if you have a route like /user/:id, req.params.id will contain the value of id.
req.query: An object containing the parsed query-string parameters.
req.body: An object containing the parsed request body. This is typically available for POST requests where data is sent in the body of the request, often used with forms or JSON data.
req.headers: An object containing the headers sent in the request.
req.method: A string representing the HTTP method of the request (e.g., GET, POST, PUT, DELETE).
req.url: A string representing the URL path of the request.
req.cookies: An object containing cookies sent by the client.
req.ip: The IP address of the client making the request.
req.protocol: The protocol (HTTP or HTTPS) used in the request.
req.path:represents the path portion of the URL that is present in the request

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Status Code:Indicates whether a specific HTTP request has been successfully completed

1xx (Informational): Indicates that the request has been received and the process is continuing.
Example: 100 Continue, 101 Switching Protocols.

2xx (Success): Indicates that the request was successfully received, understood, and accepted.
Example: 200 OK, 201 Created, 204 No Content.

3xx (Redirection): Indicates that further action needs to be taken by the client to fulfill the request.
Example: 301 Moved Permanently, 302 Found, 304 Not Modified.

4xx (Client Er0ror): Indicates that there was an error on the client's side, such as a malformed request or unauthorized access attempt.
Example: 400 Bad Request, 401 Unauthorized, 404 Not Found.

5xx (Server Error): Indicates that there was an error on the server's side while trying to fulfill the request.
Example: 500 Internal Server Error, 503 Service Unavailable, 504 Gateway Timeout.
*/

//Status 404
const index = users.findIndex((user) => {
  return user.id === cid;
});
if (index == -1) return res.status(404).json({ err: 'ID not found' });

//Status 201
fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), () => {
  return res.status(201).json({ status: 'Created', id: cid });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Model View Controller: Controller-->Model-->View

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
