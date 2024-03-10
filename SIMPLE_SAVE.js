//REPL: Read Eval Print Loop

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///ES6
function hi() {
  a = 434;
  var b = 23;
  let c = 34;
  const d = 454;
}
console.log(a);
console.log(b);
console.log(c);
console.log(d);

//function scope will not allow any type of datatype

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//blocks like for loops

{
  a = 1;
  var b = 2;
  let c = 3;
  const d = 4;
}

console.log(a);
console.log(b);
console.log(c);
console.log(d);

//Block will allow var to execute outside the block

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const obj = {
  name: 'nitin',
  age: 23,
  height: 34,
};

const arr = [1, 2, 3, 4, 4, 5, 6]; //// only for const
Object.freeze(arr);
Object.freeze(obj);

arr[2] = 23; //added the key
arr['age'] = 56;

console.log(arr);
console.log(obj);

//Object.freeze will not allow the values to be replaced

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///Different types of function

function show() {
  console.log('Normal function');
}
show();

//assigning function

const display = function show() {
  console.log('function passing and cannot run show() func');
};
display();

//es6 Arrow function
////removed function and function name

const greet = () => {
  console.log('greeted'); //// Arrow Function
};

greet();

const dif = (a, b) => {
  return a - b; /// explicit type
};

console.log(dif(4, 2));

//if you have single statement
//no need to write 'return'

const sum = (a, b) => a + b; /// Implicit type
console.log(sum(1, 2));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
this.objectName = 'export func'; ///objectName is a property of this
console.log(this);

const obj = {
  name: 'nitin',
  age: 23,
  id: 1,

  //Regular function
  fun1: function () {
    console.log('func1', this); // here 'this' refers to caller function
  },

  //Arrow Function
  fun2: () => {
    console.log('func2', this); // 'this' will return export function
  },
};
obj.fun1();
obj.fun2();

//////////////////////////////////////////////////////////////////////////////
///Object Literals

const obj = {
  str: 'helloo everybody',
  num: 34,
  isCheck: true,
  images: ['nit.gif', 'cat.png', 'dog.jpg', 'ankit.jpeg'], //Array
  pos: {
    x: 23, ///nested object
    y: 34,
  },
  //types of function declaration
  sum: function (a, b) {
    console.log(a + b); //regular function
  },

  dif() {
    console.log('difference'); // just name
  },

  greet: () => {
    console.log('greet'); ///arrow func
  },
};

console.log(obj.str);
console.log(obj.num);
console.log(obj.isCheck);
console.log(obj.images);

console.log(obj.pos.x);
console.log(obj.pos);

console.log(obj.sum(2, 3));
console.log(obj.dif());
console.log(obj.greet());

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const she = 'women';
const PI = Math.PI;

const obj = {
  [she]: 'ladki', /// she is replace by women
  PI, ////  we can just use PI on the place of PI:PI
};
console.log(obj.women);
console.log(obj);

//Adding new property in obj

obj.a = 2;
obj['he'] = 'ladka';
console.log(obj);
console.log(obj.PI);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///Destructuring

const pi = Math.PI;
const e = Math.E;
const sqrt = Math.SQRT2;

const { PI, E, SQRT2 } = Math; // these can we represented as this statement
console.log(PI); ///Now I can use these function without Math object

///In this we tried to destructured the class and extract values through it

const { readFile } = require('fs'); ///Also Destructured

const circle = {
  r: 2,
};

const area = (circle) => {
  return PI * circle.r * circle.r;
};

console.log(area(circle));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////Classes in JS
class Animal {
  constructor(colorcode) {
    this.color = colorcode;
  }
  greet() {
    console.log(`Hello your color-${this.color}`);
  }
}

class Dog extends Animal {
  constructor(colorcode, namecode) {
    super(colorcode);
    this.name = namecode;
    this.color = colorcode;
  }
  greet() {
    console.log(`Your name ${this.name} and color ${this.color}`);
  }
}

const obj = new Animal('yellow');
const obj2 = new Dog('red', 'labrador');

obj.greet();
obj2.greet();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// syntax: 
array.splice(index, howmany, item1, ....., itemX)

// index: Required. An integer that specifies at what position to add/remove items. Negative values are used to specify the position from the end of the array.
// howmany: Optional. The number of items to be removed. If set to 0, no items will be removed.
// item1, ..., itemX: Optional. The new item(s) to be added to the array
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Call Stack:
//     Keeps track of
// function calls in a Last In, First Out(LIFO) manner.
// Functions are pushed onto the stack when called and popped off when completed.
// Manages the execution context of functions.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Callback Queue(Task Queue):
// Holds tasks(callbacks or events) ready to be executed.
// Tasks come from asynchronous operations like DOM events, HTTP requests, or timers.
// Executed when the call stack is empty.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Microtask Queue:
//     Holds tasks with higher priority than the callback queue.
// Tasks are usually scheduled by promises, mutation observers, and similar mechanisms.
// Executed before tasks from the callback queue when the call stack is empty.

/*
Example:
 console.log('Start');
 setTimeout(() => console.log('Timeout'), 0);
 Promise.resolve().then(() => console.log('Promise'));
 console.log('End');
*/
/*
Output:

Start
End
Promise
Timeout
*/
// In this example, even though the setTimeout is set to zero milliseconds, the promise's microtask is executed first.
// Microtasks have higher priority than regular tasks in the event loop.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Execution Order:
// Asynchronous operations schedule callbacks in the callback queue or microtask queue.
// The event loop checks and transfers tasks to the call stack when it is empty.
// Microtasks have higher priority and are executed before callback tasks.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Web API Superpowers:
//     Browser provides superpowers to the JavaScript engine, including Web APIs like console, location, DOM, setTimeout, fetch, and local storage.
// Callback functions and event handlers are initially stored in Web API environment before moving to the callback queue.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Starvation:
//     Too many microtasks generated without giving time for callback tasks to execute can lead to starvation.
// It 's essential to balance the execution of microtasks and callback tasks to avoid potential issues.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
