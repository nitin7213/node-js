// Event Loop:
// Continuously checks the 'call stack' and 'callback queue'.
// If the call stack is empty, it takes the first task from the microtask queue and pushes it onto the call stack.
// If the microtask queue is empty, it looks at the callback queue and pushes the first completed task onto the call stack.
// Shorter timeout callbacks execute first, regardless of addition order.
// Facilitates the non - blocking nature of JavaScript.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Call Stack:
// the call stack manages the synchronous execution of JavaScript code.
// while the callback queue holds callbacks for asynchronous tasks.
// callback queues are processed by the event loop when the call stack is empty.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Execution Order:
// Asynchronous operations schedule callbacks in the callback queue or microtask queue.
// The event loop checks and transfers tasks to the call stack when it is empty.
// Microtasks have higher priority and are executed before callback tasks.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// To schedule execution of a one-time callback after delay milliseconds. Optionally you can also pass arguments to the callback.
//  setTimeout(callback, delay, [arg], [...]);

const { clear } = require('console');
a = 'nitin';

setTimeout(
  function (a) {
    console.log(`hello ${a}`);
  },
  1000,
  a
);

/// using anonymous function

const timer = setTimeout(() => {
  console.log('timeout');
}, 2000);

//for clearing the timeout-->
// Stop a timer that was previously created with setTimeout().
// clearTimeout(t);

clearTimeout(timer);

//////////////////////////Set Timeout expects function name only not function call

function fun(delay) {
  console.log(`print after ${delay} sec`);
}
setTimeout(fun, 5000, 'five');
setTimeout(fun, 10000, 'ten'); ///Set Timeout expects function name only not function call

//You can do this in this way

const fun = (name) => {
  console.log(`Hello ${name}`);
};

setTimeout(
  (a) => {
    fun(a);
  },
  2000,
  'nitin' // this parameter only  pushes to function name
);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// To schedule the "immediate" execution of callback after I/O events callbacks and before setTimeout and setInterval.
//  setImmediate(callback, [arg], [...]);

const timer = setImmediate(() => {
  console.log('immediate'); //By default 0
});

// Stop a timer that was previously created with setImmediate().
//  clearImmediate(immediateObject);

clearImmediate(timer);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// To schedule the repeated execution of callback every delay milliseconds. Optionally you can also pass arguments to the callback.
///   setInterval(callback, delay, [arg], [...]);

// Stop a timer that was previously created with setInterval().
///  clearInterval(t);
let cnt = 0;
const timer = setInterval(() => {
  if (cnt == 5) clearInterval(timer);
  console.log(cnt++);
}, 1000);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////// process.nextTick(callback); // On the next loop around the event loop call this callback FIRST.

process.nextTick(() => {
  console.log('Process.nexttick()');
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////comparisons:
setTimeout(() => {
  console.log('setTimeout 2000');
}, 2000);

setImmediate(() => {
  console.log('setImmediate');
});

setTimeout(() => {
  console.log('setTimeout');
});

setTimeout(() => {
  console.log('setTimeout 0');
}, 0); ////they both are same which ever comes first print first

process.nextTick(() => {
  console.log('Process.nexttick()');
});

console.log('normal');

/* Output:

normal
Process.nexttick()
setTimeout        
setTimeout 0      
setImmediate      
setTimeout 2000
*/
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
