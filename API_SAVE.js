////////How to Fetch api: Fetch->response(readable stream)->json() (also a promise)---> JSON.stringify(to print in string)
///JSON.stringify-->>>converts {} to "{}"

const API_URL = 'http://localhost:3000/courses';

async function getApi() {
  const res = await fetch(API_URL); //fetch is a promise and returns a readable stream to convert it to json add .json()

  const result = await res.json(); /// .json is also a promise & also we can use 'response.text()'

  const str = JSON.stringify(result, null, 2); ///printing all in  string format USE --->> JSON.stringify()
  console.log(str);
}

getApi();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////Error handling & middle parameter is  "replacer" function used for filter & third parameter denotes number of spaces used for 'indentation'

const API_URL = 'https://api.github.com/users/nitin7213';

async function getApi() {
  try {
    const response = await fetch(API_URL); //fetch is a promise and returns a readable stream to convert it to json add .json()

    if (!response.ok) throw new Error('error 404'); // an HTTP response status in the range of 200 to 299

    const result = await response.json(); /// .json is also a promise & also we can use 'response.text()'

    const str = JSON.stringify(
      result,
      function (key, value) {
        if (key == 'id') return undefined; /// Filtering
        else return value;
      },
      2
    );

    console.log(str);
  } catch (err) {
    console.log(err);
  }
}

getApi();

///old method handling error in code
getApi().catch((err) => console.log(err));

///JSON.parse-->>>converts "{}" to {} just opposite

const jsonString = '{"name": "John", "age": 30, "city": "New York"}';

const parsedObject = JSON.parse(jsonString, function (key, value) {
  if (key == 'age') return undefined;
  else return value;
});
console.log(parsedObject);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////convert the JavaScript object result into a JSON-formatted string AS fs.writeFile fun takes only 'string' as its parameter

const API_URL = 'https://api.github.com/users/nitin7213';

const fs = require('fs').promises; // for async

async function getApi() {
  const res = await fetch(API_URL); //fetch is a promise and returns a readable stream to convert it to json add .json()

  const result = await res.json(); /// .json is also a promise & also we can use 'response.text()'

  const str = JSON.stringify(
    result,
    (key, value) => {
      if (key == 'id') return undefined;
      else return value;
    },
    2
  );

  await fs.writeFile('sample.txt', str); ///as fs.writeFile fun takes only 'string' as its parameter So, used 'STRINGIFY'

  console.log('written successfully');
}

getApi();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////FETCH API using 'then' &'catch' & WRITE in a file

const API_URL = 'http://localhost:3000/courses';

const fs = require('fs');

function getApi() {
  const response = fetch(API_URL); //promise

  //handle fetch
  const result = response.then((res) => {
    return res.json(); //promise
  });

  //handle res.json()
  const str = result.then((res) => {
    return JSON.stringify(res, null, 2);
  });

  //final result --> we have to handle every time we return the 'pending function' or else it will say "promise pending"
  str.then((res) => {
    fs.writeFileSync('sample.txt', res);
  });

  console.log('written successfully');
}

getApi();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
1. Before promise we used to depend on callback functions which would result in 
1.) Callback Hell (Pyramid of doom) | 2.) Inversion of control
2. Inversion of control is overcome by using promise.
  2.1) A promise is an object that represents eventual completion/failure of an asynchronous operation.
  2.2) A promise has 3 states: pending | fulfilled | rejected.
  2.3) As soon as promise is fulfilled/rejected => It updates the empty object which is assigned undefined in pending state.
  2.4) A promise resolves only once and it is immutable. 
  2.5) Using .then() we can control when we call the cb(callback) function.

3. To avoid callback hell (Pyramid of doom) => We use promise chaining. 
    This way our code expands vertically instead of horizontally. 
    

4.Promise chaining -> 2 types: 'then/catch' chaining & 'async/await' chaining

Chaining with then (then/catch):Each 'then' block in a Promise chain can return a value, and this value is passed as an argument to the next then in the chain.
This allows for a continuous flow of data between different stages of the Promise chain.

Chaining with await (Async/Await): In an async function using await, the await expression itself returns the resolved value of the awaited Promise.
Unlike then, the value is directly assigned to the variable or expression following await.

*/
/////Then/Catch chaining

const API_URL = 'http://localhost:3000/courses';

const fs = require('fs');

fetch(API_URL)
  .then((res) => {
    return res;
  })
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    const str = JSON.stringify(res, null, 2);
    fs.writeFileSync('sample.txt', str);
    console.log('written successfully'); /// should only be printed after promised is resolved
  });

/////Async/Await Chaining

const p1 = new Promise((res, rej) => {
  setTimeout(() => {
    res('1st promised successful!');
    rej('error in 1st ');
  }, 3000);
});

async function getData() {
  const val1 = await p1;
  console.log(val1);

  const val2 = await p1;
  console.log(val2);

  const val3 = await p1;
  console.log(val3); //// You can see the chaining of async/await
}

getData();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///Using AXIOS(new)

const axios = require('axios');
const API_URL = 'http://localhost:3000/courses';

async function getApi() {
  const response = await axios(API_URL); //return a promise
  console.log(response);
}

getApi();

/*
AXIOS OBJECTS:
Response
├── data // Response body
├── status // HTTP status code
├── statusText // Textual representation of status code (e.g., "OK" for 200)
├── headers // Response headers
│   ├── content-type
│   ├── content-length
│   └── ...
├── config // Axios request configuration
│   ├── url
│   ├── method
│   └── ...
└── request // XMLHttpRequest object (in browser) or http.ClientRequest object (in Node.js)
    ├── method
    ├── url
    └── ...
*/

//Fetch data using axios from JSON --> axios.get(url);
const axios = require('axios');
const API_URL = 'http://localhost:3000/courses';

async function getApi() {
  const response = await axios.get(API_URL); //return a promise

  const str = JSON.stringify(response.data, null, 2);
  console.log(str);
}
getApi();

//Submit form data on json with AXIOS ----> axios.post(url);
const axios = require('axios');
const API_URL = 'http://localhost:3000/courses';

const data = {
  courseName: 'Course Name',
  authorName: 'Author Name',
  courseDuration: 'Duration: Updated',
  courseRating: 'Rating: Updated',
};

async function createCourse() {
  const response = await axios.post(API_URL, data);

  console.log(response.data);
}
createCourse();

//Update json with AXIOS ----> axios.put(url);
const axios = require('axios');
const API_URL = 'http://localhost:3000/courses';

const newId = 1;
const data = {
  id: newId,
  courseName: 'Course Name',
  authorName: 'Author Name',
  courseDuration: 'Duration: Updated',
  courseRating: 'Rating: Updated',
};

async function updatedData() {
  const response = await axios.put(`${API_URL}/${newId}`, data);

  console.log(response.data);
}
updatedData();

//Delete specified resource of json ----> axios.delete(url);
const axios = require('axios');
const API_URL = 'http://localhost:3000/courses';

const id = '9';

async function deleteCourse() {
  const response = await axios.delete(`${API_URL}/${id}`);

  console.log(response.data);
}
deleteCourse();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
