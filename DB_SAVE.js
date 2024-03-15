/// Synchronously Connecting to database
const mySql = require('mysql2');

const config = {
  host: 'localhost',
  user: 'root',
  password: '1194',
  database: 'testify',
  port: 3306,
};

const con = mySql.createConnection(config);

con.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
  } else {
    console.log('Connected to MySQL!');
  }
});

///SQL QUERIES
let sql = 'SELECT * FROM USERS';
con.query(sql, (err, result, fields) => {
  if (err) console.log(err);
  else {
    console.log(result); //result row
    console.log(fields); // field remains undefined in 'CRUD' operations but give results in 'SELECT' query ABOUT THE TABLE STRUCTURE
  }

  con.end((err) => {
    if (err) console.error('Error while closing connection: ', err);
    else console.log('Connection Closed Successfully!');
  });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////// Asynchronously Connecting to database

const mySql = require('mysql2/promise');

async function getDate() {
  const con = await mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1194',
    database: 'testify',
    port: 3306,
  });

  await con.connect(); /// No Need to call connect if you execute any query
  console.log('Connected to MySQL!');

  ///SQL QUERIES
  let sql = 'SELECT * FROM USERS';
  const result = await con.query(sql);

  console.log('Result Rows:');
  console.log(result[0]);

  console.log('Table Structure:');
  console.log(result[1]);

  await con.end();
  console.log('Connection Closed Successfully!');
}
getDate();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///Using pool we can easily export the whole connection and can use different connection at same time
const mySql = require('mysql2/promise');

async function getDataBase() {
  const config = {
    host: 'localhost',
    user: 'root',
    password: '1194',
    database: 'testify',
  };

  const pool = await mySql.createPool(config);
  const con = await pool.getConnection();

  try {
    const sql = 'select * from testify.users';
    const result = await con.query(sql);
    console.log(result);
  } catch (error) {
    console.error('Error executing query:', error);
  } finally {
    con.release(); // Release the connection
    await pool.end(); // Close the pool
  }
}

getDataBase();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
Mongo Db:(BSON format) ---> npm i mongoose
Collection --> Tables
document   --> Entries
Schema     --> Defines the structure
CRUD:       
--> Connection (mongoose.connect()): promise
--> Schema(mongoose.Schema({collection})) 
--> Model(mongoose.Model('collection_Name',schema_Name)) 
--> Operations(myModel.create({}))

-->MongoDB
show dbs
use <db>
show collections
db.<coll>.find()
*/
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
