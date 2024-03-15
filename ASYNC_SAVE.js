//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////In promises : 'resolve'  triggers  'then' & 'reject' triggers 'catch'

const p = new Promise((res, rej) => {
  const success = false;

  if (success) res('promised worked');
  /// Don't write res(console.log("promise not worked"));
  else rej('promise not worked');
});

///handling promise

p.then((res) => {
  console.log('handle promise', res);
}).catch((rej) => {
  console.log('Rejection error', rej);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////Handling a promise using 'then' & 'catch'--->> Doesn't needs try&catch Block as it already has 'catch'

const p = new Promise((res, rej) => {
  setTimeout(() => {
    res('promise resolved value');
  }, 10000);
});

function getData() {
  p.then((res) => console.log(res)).catch((err) => {
    console.log('error');
  });

  console.log('this will print first'); ///In 'then/catch', does not pause the execution of the surrounding code********
}

getData();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Handling a promise using 'ASync/Await'  -->> needs try & catch block

const p = new Promise((res, rej) => {
  res('promise resolved value');
});

async function getData() {
  try {
    const val = await p; ////now handle Promise
    console.log('this will wait for promise handle'); ///In 'async/await' it waits for it to resolve***********
    console.log(val);
  } catch (err) {
    console.log(err);
  }
}
getData();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////Returning a Promise
const p = new Promise((res, rej) => {
  setTimeout(() => {
    res('promised resolved');
    rej('error in  resolving');
  }, 3000);
});

async function getData() {
  return await p;
}

const data = getData(); // Always remember if return is a promise then we need to handle it again or result --> console.log(data); --> Promise { <pending> }
data.then((res) => console.log(res));

//////*******IIFE stands for Immediately Invoked Function Expression
(async () => {
  const val = await getData(); ///with 'await' because it NEEDS time to get promise resolved
  console.log(val);
})();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////Promise is nothing but an object representation of the upcoming completion or failure of Asynchronous function.
const p = new Promise((res, rej) => {
  setTimeout(() => {
    res('promise resolved');
    rej('promised rejected');
  }, 2000);
});

(async () => {
  console.log('first');

  //async now it pushes it into micro queue and event loop will bring the resolved promised back
  p.then((res) => {
    console.log(res);
  });

  console.log('sec');

  const val2 = await p; // waits-->  used to make program look like synchronous
  console.log(val2);
  console.log(' *wait* fourth');
})();

console.log('third');
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////Combo of 'ASYNC' And 'Await' is used to handle promises**** mainly ---->> only not used with timers

const p1 = new Promise((res, rej) => {
  setTimeout(() => {
    res('promise resolved 1');
    rej('promised rejected');
  }, 1000);
});
const p2 = new Promise((res, rej) => {
  setTimeout(() => {
    res('promise resolved 2');
    rej('promised rejected');
  }, 2000);
});

const p3 = new Promise((res, rej) => {
  setTimeout(() => {
    res('promise resolved 3');
    rej('promised rejected');
  }, 3000);
});

(async () => {
  console.log("first---> before 'then'");

  //async now it pushes it into callback queue and event loop will bring the resolved promised back
  p1.then((res) => {
    console.log(res); // then --> brings resolved promised back & js DOESN'T WAIT FOR THIS
    console.log('*wait* p1');
  });

  console.log('sec---> before await');

  const val2 = await p2; // waits-->  used to make program synchronous as JS WAITS to resolves its promise
  console.log(val2);
  console.log(' *wait* p2');

  const val3 = await p3;
  console.log(val3);
  console.log(' *wait* p3');
})();

console.log('third-> outside async');

/*
CALLBACK QUEUE & MICROTASK QUEUE
Microtasks, including those from then and await, are processed in the microtask queue.
Regular callbacks, such as those from setTimeout or I/O operations, are processed in the callback queue.
*/
/*
AWAIT
the await keyword pauses the execution of the async function until 
the promise is resolved. However, it does not block the entire program. 
Other parts of outside async function can continue executing while the asynchronous 
operations are in progress.
*/
/*
then/catch
Callbacks are added to the microtask queue, but they don't affect the current execution flow. 
They are processed after the current synchronous code is finished.
*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////Handling Multiple Promises using then/catch
//////////In this handling Promises are handled Parallel

const p1 = new Promise((res, rej) => {
  setTimeout(() => {
    res('promise 1 resolved');
  }, 1000);
});
const p2 = new Promise((res, rej) => {
  setTimeout(() => {
    rej('promise 2 rejected');
  }, 500);
});
const p3 = new Promise((res, rej) => {
  setTimeout(() => {
    res('promise 3 resolved');
  }, 3000);
});

function fun() {
  /////Promise.all----> Waits for all promises to settle &  returns---> the first rejected promise / if all success then return all promises
  Promise.all([p1, p2, p3])
    .then((res) => {
      console.log('Promise.all -->', res);

      const [val1, val2, val3] = res;
      console.log('val 1', val1);
      console.log('val 2', val2);
      console.log('val 3', val3);
    })
    .catch((err) => console.log(' Promise.all-->', err));

  //////Promise.allSettled----> Waits for all promises to settle & returns all the promises with their states --> (resolved or rejected).
  Promise.allSettled([p1, p2, p3])
    .then((res) => {
      console.log('Promise.allSettled -->', res);

      const [val1, val2, val3] = res;
      console.log('val 1', val1);
      console.log('val 2', val2);
      console.log('val 3', val3);
    })
    .catch((err) => console.log(' Promise.allSettled-->', err));

  //////Promise.any----> Returns the First Settled Success / If all fails gives aggregate error
  Promise.any([p1, p2, p3])
    .then((res) => {
      console.log(' Promise.any-->', res);
    })
    .catch((err) => console.log(' Promise.any-->', err));

  //////Promise.race----> Returns the First Settled
  Promise.race([p1, p2, p3])
    .then((res) => {
      console.log(' Promise.race-->', res);
    })
    .catch((err) => console.log(' Promise.race-->', err));
}

fun();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////Handling Multiple Promises using Async/Await

const p1 = new Promise((res, rej) => {
  setTimeout(() => {
    res('promise 1 resolved');
  }, 1000);
});
const p2 = new Promise((res, rej) => {
  setTimeout(() => {
    rej('promise 2 rejected');
  }, 500);
});
const p3 = new Promise((res, rej) => {
  setTimeout(() => {
    res('promise 3 resolved');
  }, 3000);
});

async function fun() {
  /////Promise.all----> Waits for all promises to settle &  returns---> the first rejected promise / if all success then return all promises
  try {
    const result = await Promise.all([p1, p2, p3]);

    console.log(' Promise.all-->', result);
    const [val1, val2, val3] = result;
    console.log('val 1', val1);
    console.log('val 2', val2);
    console.log('val 3', val3);
  } catch (err) {
    console.log(' Promise.all-->', err);
  }

  //////Promise.allSettled----> Waits for all promises to settle & returns all the promises with their states --> (resolved or rejected).
  try {
    const result = await Promise.allSettled([p1, p2, p3]);

    console.log(' Promise.allSettled-->', result);
    const [val1, val2, val3] = result;
    console.log('val 1', val1);
    console.log('val 2', val2);
    console.log('val 3', val3);
  } catch (err) {
    console.log(' Promise.allSettled-->', err);
  }

  //////Promise.any----> Returns the First Settled Success / If all fails gives aggregate error
  try {
    const result = await Promise.any([p1, p2, p3]);
    console.log(' Promise.any-->', result);
  } catch (err) {
    console.log(' Promise.any-->', err);
  }

  //////Promise.race----> Returns the First Settled
  try {
    const result = await Promise.race([p1, p2, p3]);
    console.log(' Promise.race-->', result);
  } catch (err) {
    console.log(' Promise.race-->', err);
  }
}

fun();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
