const express = require('express');
const users = require('./MOCK_DATA.json');
const fs = require('fs');

const app = express();

//Middleware(req.body='undefined')
app.use(express.urlencoded({ extended: false }));

app.get('/api/users', (req, res) => {
  return res.json(users);
});

//-->Get the User with ID 1(Params)
app.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const index = users.findIndex((user) => user.id == id);
  return res.json(users[index]);
});

app.post('/api/users', (req, res) => {
  const cid = users.length + 1;

  const info = { id: cid, ...req.body };

  users.splice(cid, 0, info);

  fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), () => {
    return res.json({ status: 'Success', id: cid });
  });
});

app.patch('/api/users/:id', (req, res) => {
  const cid = JSON.parse(req.params.id);
  const index = users.findIndex((user) => user.id === cid);
  if (index == -1) return res.json({ error: 'ID not found' });

  users[index] = { id: cid, ...req.body };

  fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), () => {
    return res.json({ Status: 'Updated', id: cid });
  });
});

app.delete('/api/users/:id', (req, res) => {
  const cid = JSON.parse(req.params.id);

  const index = users.findIndex((user) => {
    return user.id === cid;
  });
  if (index == -1) return res.json({ err: 'ID not found' });

  users.splice(index, 1);

  fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), () => {
    return res.json({ Status: 'deleted', id: cid });
  });
});

app.listen(8000, () => {
  console.log('http://localhost:8000/');
});
