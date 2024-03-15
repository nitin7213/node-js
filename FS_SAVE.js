/// Synchronous using readFileSync
const fs = require('fs');
const data = fs.readFileSync('index.html', 'utf8');
console.log(data);

/// Synchronous using writeFileSync
const fs = require('fs');
fs.writeFileSync('sample.txt', 'Hello there anybody', 'utf8');

/// read a file and write on another Synchronously
const fs = require('fs');
const data = fs.readFileSync('index.html', 'utf8');

fs.writeFileSync('sample.txt', data);
console.log('written Sync');

// During the time a synchronous file operation is in progress, the entire program is blocked.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ASynchronous read file using callback
const fs = require('fs');
fs.readFile('index.html', 'utf8', (err, data) => {
  console.log(data);
});

// ASynchronous write file using callback
const fs = require('fs');

fs.writeFile('sample.txt', 'Hello there anybody', 'utf8', () => {
  console.log('written Async');
});

/// read a file and write on another ASynchronously using callback(nested)
const fs = require('fs');

fs.readFile('index.html', 'utf8', (err, data) => {
  console.log(data);

  fs.writeFile('sample.txt', data, () => {
    console.log('written Async');
  });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ASynchronous read file using ASync/Await

const fs = require('fs/promises'); // require('fs').promises; //Async

async function getRead() {
  const data = await fs.readFile('index.html', 'utf8');
  console.log(data);
}
getRead();

//ASynchronous write file using ASync/Await
async function getWrite() {
  await fs.writeFile('sample.txt', 'Hello there anybody', 'utf8');
  console.log('written ASync');
}
getWrite();

// read a file and write on another ASynchronously using ASync/Await
const fs = require('fs/promises');

async function getBoth() {
  const data = await fs.readFile('index.html', 'utf8');
  await fs.writeFile('sample.txt', data);
  console.log('written ASync');
}

getBoth();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///Using three function 1.read 2. write 3.access both

const fs = require('fs/promises'); //promise

async function getRead(inputUrl) {
  return await fs.readFile(inputUrl, 'utf8'); //promise
}
async function getWrite(outputUrl, data) {
  await fs.writeFile(outputUrl, data); //promise
}

async function doIt(inputUrl, outputUrl) {
  const data = await getRead(inputUrl); //promise
  await getWrite(outputUrl, data); //promise
  console.log('written ASync');
}

doIt('index.html', 'sample.txt');

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///Use try and catch to handle error

const fs = require('fs/promises');

async function getRead(inputUrl) {
  try {
    return await fs.readFile(inputUrl, 'utf8');
  } catch (err) {
    console.log(err);
  }
}
async function getWrite(outputUrl, data) {
  try {
    await fs.writeFile(outputUrl, data);
  } catch (err) {
    console.log(err);
  }
}

async function doIt(inputUrl, outputUrl) {
  try {
    const data = await getRead(inputUrl);
    await getWrite(outputUrl, data);
    console.log('written ASync');
  } catch (err) {
    console.log(err);
  }
}

doIt('index.html', 'sample.txt');

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
