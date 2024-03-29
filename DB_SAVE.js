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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
