//Express: Framework Built on http protocol
/*
Nodemon :automatically restarts the Node.js server when changes are detected
Install-->npm install -D nodemon
Run   --->nodemon run.js
*/
const express = require('express');

const app = express(); // App is instance of express

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
2. Respect HTTP METHODS:
 GET: Used to retrieve data from the server.
 POST: Used to submit data to be processed by the server.
 PUT: Used to update data on the server.
 DELETE: Used to delete data from the server.
 PATCH: Used to partially update data on the server.

*/

//Common Route tag
app
  .route('/api/users/:id')
  .get((req, res) => {
    return res.json(user);
  })
  .patch((req, res) => {
    return res.json({ status: 'pending' });
  })
  .delete((req, res) => {
    return res.json({ status: 'pending' });
  });

//GET (return the whole API used in CSR)
app.get('/api/users', (req, res) => {
  return res.json(users);
});

//-->Get the User with ID 1(Params)
app.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const index = users.findIndex((user) => user.id == id);
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
    return res.json({ status: 'Success', id: cid });
  });
});

//PATCH (Edit User with ID)
app.use(express.urlencoded({ extended: false })); //Middleware(req.body='undefined')

app.patch('/api/users/:id', (req, res) => {
  const cid = JSON.parse(req.params.id);
  const index = users.findIndex((user) => user.id === cid);

  if (index == -1) return res.json({ error: 'ID not found' });

  users[index] = { id: cid, ...req.body };

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
//Middleware

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
