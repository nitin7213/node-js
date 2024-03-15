const mongoose = require('mongoose');
const express = require('express');

const app = express();

//Connection
mongoose
  .connect('mongodb://127.0.0.1:27017/testify')
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

//Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

//Model
const User = mongoose.model('users', userSchema);

//Show documents
app.get('/api/users', async (req, res) => {
  const users = await User.find({});
  return res.json(users);
});

//Show documents by ID
app.get(async (req, res) => {
  const userInfo = await User.findById(req.params.id);
  if (!userInfo) {
    return res.status(404).json({ error: 'User not found' });
  }
  return res.status(200).json(userInfo);
});

//Middleware(req.body='undefined')
app.use(express.urlencoded({ extended: false }));

//Add Document
app.post('/api/users', async (req, res) => {
  const result = await User.create({
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    email: req.body.email,
    gender: req.body.gender,
    jobTitle: req.body.job_title,
  });

  return res.status(201).json({ msg: 'db success', Collection: result });
});

//Update Document
app.patch('/api/users/:id', async (req, res) => {
  const result = await User.findByIdAndUpdate(req.params.id, {
    firstName: req.body.first_name,
    lastName: req.body.last_name,
  });
  res.status(201).json({ status: 'Updated', Collection: result });
});

//Delete Document
app.delete('/api/users/:id', async (req, res) => {
  const result = await User.findByIdAndDelete(req.params.id);
  return res.status(201).json({ status: 'Deleted', Collection: result });
});

app.listen(8000, () => {
  console.log('http://localhost:8000/');
});
