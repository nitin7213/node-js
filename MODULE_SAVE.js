// Module -> Its a file or folder that contains code

// 'Argument' ---> keyword

function getArgs() {
  console.log(arguments); //returns all the arguments passed in a function
}

getArgs(1, 2, 3, 4, 5, 6, 7, 8);

/////If console.log() in empty file its arguments will be default function
//// which is hidden--> function(exports,require,module,___filename,__dirname)
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////For requiring it --->>

const myExport = require('./MODULE_SAVE.js'); ///  './' refers to parent directory

console.log(myExport.a);
console.log(myExport.getFun());

////OR Destructuring way-->

const { a, getFun } = require('./MODULE_SAVE.js');

console.log(a);
console.log(getFun());
let a = 23; ///variable

let getFun = () => {
  console.log('export'); ///function     1st way
};

module.exports = {
  a,
  getFun,
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 'exports' - >> keyword to access any object outside the file

/// 1st way -->>>initial declaration

exports.a = 23; ///variable

exports.getFun = () => {
  console.log('export function');
};

console.log(exports.a); ///only work like this
exports.getFun();

///OR 2nd way

const a = 34;

function getFun() {
  console.log('export function');
}
module.exports.a = a;
module.exports.getFun = getFun;

///OR
const a = 45;

function getFun() {
  console.log('export function');
}
module.exports = { a, getFun }; /// another way of exporting
