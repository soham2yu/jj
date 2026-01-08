export interface Chapter {
  id: number
  title: string
  estimatedTime: number
  content: string
  keyPoints: string[]
}

export const JAVASCRIPT_CHAPTERS: Chapter[] = [
  {
    id: 1,
    title: "JavaScript Basics & Syntax",
    estimatedTime: 45,
    content: `JavaScript is the programming language of the web, running in every browser and increasingly on servers with Node.js.

Variables & Constants:
- var (function-scoped, not recommended)
- let (block-scoped, preferred)
- const (block-scoped, immutable)

Data Types:
- String: "hello"
- Number: 42, 3.14
- Boolean: true, false
- null and undefined
- Objects and Arrays

Operators:
- Arithmetic: +, -, *, /, %, **
- Comparison: ==, ===, !=, !==, <, >, <=, >=
- Logical: &&, ||, !
- Assignment: =, +=, -=, etc.`,
    keyPoints: [
      "Use let and const instead of var",
      "Understand hoisting and temporal dead zone",
      "Know the difference between == and ===",
      "JavaScript is dynamically typed but values have types",
    ],
  },
  {
    id: 2,
    title: "Variables, Data Types & Operators",
    estimatedTime: 50,
    content: `Understanding data types is crucial for writing correct JavaScript code.

Primitive Types:
- String: immutable sequences of characters
- Number: represents both integers and floating-point numbers
- Boolean: true or false
- Null: represents intentional absence of value
- Undefined: represents uninitialized variables

Complex Types:
- Object: collection of key-value pairs
- Array: ordered collection of elements
- Function: reusable block of code

Type Coercion:
JavaScript performs automatic type conversion in operations. Understanding coercion prevents bugs:
- "5" + 3 = "53" (string concatenation)
- "5" - 3 = 2 (numeric operation)
- true + 1 = 2 (boolean to number)

Operators & Precedence:
Operators have different precedence levels that determine evaluation order.`,
    keyPoints: [
      "Understand primitive vs reference types",
      "Know how type coercion works",
      "Use strict equality === to avoid coercion",
      "Objects are mutable, primitives are not",
    ],
  },
  {
    id: 3,
    title: "Functions & Scope",
    estimatedTime: 60,
    content: `Functions are reusable blocks of code that perform specific tasks.

Function Declaration:
function greet(name) {
  return "Hello, " + name;
}

Function Expression:
const greet = function(name) {
  return "Hello, " + name;
};

Arrow Functions (ES6):
const greet = (name) => "Hello, " + name;

Scope Concepts:
- Global Scope: accessible everywhere
- Function Scope: accessible within function
- Block Scope: accessible within block (let, const)
- Lexical Scope: functions can access parent scope

Closures:
Functions can access variables from their enclosing scope even after that scope has closed.

Hoisting:
- Function declarations are hoisted
- Function expressions are not hoisted
- Variables declared with var are hoisted but not initialized`,
    keyPoints: [
      "Arrow functions don't have their own 'this'",
      "Closures allow data encapsulation",
      "Each function creates a new scope",
      "Hoisting can cause unexpected behavior",
    ],
  },
  {
    id: 4,
    title: "Arrays & Objects",
    estimatedTime: 55,
    content: `Arrays and Objects are fundamental data structures in JavaScript.

Arrays:
- Ordered collection of elements
- Zero-indexed (first element at index 0)
- Can contain mixed types

Array Methods:
- push(), pop(), shift(), unshift(): add/remove elements
- map(): transform each element
- filter(): select elements based on condition
- reduce(): aggregate elements into single value
- find(), includes(), indexOf(): search operations
- sort(): arrange elements

Objects:
- Unordered collection of key-value pairs
- Keys are strings or Symbols
- Values can be any data type

Object Methods:
- Object.keys(): get all keys
- Object.values(): get all values
- Object.entries(): get key-value pairs
- Object.assign(): merge objects
- Spread operator: {...obj} for shallow copy

Destructuring:
Modern way to extract values:
const [a, b] = [1, 2];
const {name, age} = {name: "John", age: 30};`,
    keyPoints: [
      "Arrays are objects with numeric keys",
      "Array methods are chainable",
      "Objects use reference equality",
      "Destructuring makes code more readable",
    ],
  },
  {
    id: 5,
    title: "DOM Manipulation",
    estimatedTime: 50,
    content: `The DOM (Document Object Model) represents the structure of HTML documents.

Selecting Elements:
document.getElementById('id'): select by ID
document.querySelector('.class'): CSS selector
document.querySelectorAll(): get multiple elements
document.getElementsByClassName(): by class

Modifying Content:
element.textContent: change text
element.innerHTML: change HTML
element.innerText: visible text only

Modifying Attributes:
element.setAttribute('attr', 'value'): set attribute
element.getAttribute('attr'): get attribute
element.style.property: modify CSS styles

Creating & Removing Elements:
document.createElement('tag'): create new element
parent.appendChild(child): add element
parent.removeChild(child): remove element
element.remove(): remove self

Event Handling:
element.addEventListener('event', function): attach event listener
Common events: click, change, submit, input, keydown, focus

Event Delegation:
Attach listeners to parent elements and check event.target.`,
    keyPoints: [
      "querySelector is more powerful than getElementById",
      "Event delegation improves performance",
      "Use textContent over innerHTML when possible",
      "Modifying DOM frequently can be slow - batch updates",
    ],
  },
  {
    id: 6,
    title: "ES6+ Features",
    estimatedTime: 65,
    content: `ES6 (ES2015) brought major improvements to JavaScript.

Let & Const:
- let: block-scoped, can be reassigned
- const: block-scoped, cannot be reassigned

Template Literals:
const name = "World";
const message = \`Hello, \${name}!\`;

Arrow Functions:
- Shorter syntax
- Lexical 'this' binding
- Implicit return for single expression

Destructuring:
const [a, b, ...rest] = array;
const {x, y} = object;

Default Parameters:
function greet(name = "Guest") {}

Rest & Spread:
const {first, ...rest} = {first: 1, second: 2};
const arr = [...array, 4, 5];

Classes:
class Animal {
  constructor(name) { this.name = name; }
  speak() { console.log(this.name + " makes a sound"); }
}

Modules:
export const function_name = () => {};
import { function_name } from './module.js';`,
    keyPoints: [
      "Prefer const by default, let when reassignment needed",
      "Classes are syntactic sugar over prototypes",
      "Template literals make string interpolation easier",
      "Destructuring reduces boilerplate code",
    ],
  },
  {
    id: 7,
    title: "Asynchronous JavaScript (Promises, async/await)",
    estimatedTime: 70,
    content: `Asynchronous programming is essential for non-blocking operations.

Callbacks:
function fetchData(callback) {
  setTimeout(() => callback(data), 1000);
}

Callback Hell:
Multiple nested callbacks become hard to read and maintain.

Promises:
new Promise((resolve, reject) => {
  if (success) resolve(data);
  else reject(error);
});

Promise Methods:
- .then(): handle success
- .catch(): handle error
- .finally(): cleanup
- Promise.all(): wait for multiple promises
- Promise.race(): return first completed promise

Async/Await (Modern):
async function fetchData() {
  try {
    const data = await fetch('/api/data');
    return await data.json();
  } catch (error) {
    console.error(error);
  }
}

Error Handling:
- Try-catch blocks for async operations
- .catch() for promise rejection`,
    keyPoints: [
      "Async/await is cleaner than promise chains",
      "Always handle errors in async operations",
      "Promise.all() for parallel operations",
      "await only works in async functions",
    ],
  },
  {
    id: 8,
    title: "Browser APIs & Events",
    estimatedTime: 50,
    content: `Browser APIs provide powerful functionality for web applications.

Fetch API:
fetch(url)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

LocalStorage & SessionStorage:
localStorage.setItem('key', value): persistent storage
localStorage.getItem('key'): retrieve data
sessionStorage: cleared when tab closes

Geolocation API:
navigator.geolocation.getCurrentPosition(success, error);

Event Types:
- Mouse: click, dblclick, mouseenter, mouseleave
- Keyboard: keydown, keyup, keypress
- Form: submit, change, input, focus, blur
- Window: load, unload, scroll, resize

Event Object:
event.target: element that triggered event
event.preventDefault(): stop default behavior
event.stopPropagation(): stop event bubbling

Timers:
setTimeout(callback, delay): execute once
setInterval(callback, delay): execute repeatedly
clearTimeout(), clearInterval(): cancel timers`,
    keyPoints: [
      "Fetch API is the modern way to make HTTP requests",
      "LocalStorage persists across browser sessions",
      "Event bubbling can be stopped with stopPropagation",
      "Timers are important but can impact performance",
    ],
  },
  {
    id: 9,
    title: "JavaScript for Backend (Node.js Basics)",
    estimatedTime: 60,
    content: `Node.js allows JavaScript to run on servers.

Node.js Basics:
- Event-driven, non-blocking I/O model
- Built on Chrome's V8 engine
- Excellent for real-time applications

Modules & NPM:
const fs = require('fs'): CommonJS syntax
import fs from 'fs': ES Modules syntax
npm init: initialize project
npm install package: install dependency

File System (fs module):
fs.readFile('file.txt', (err, data) => {});
fs.writeFile('file.txt', data, callback);

HTTP Module:
const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Hello World');
});

Express.js (Popular Framework):
const express = require('express');
const app = express();
app.get('/route', (req, res) => res.send('data'));
app.listen(3000);

Environment Variables:
process.env.VARIABLE_NAME: access environment variables
.env files with dotenv package`,
    keyPoints: [
      "Node.js runs JavaScript outside the browser",
      "NPM is essential for managing dependencies",
      "Express.js simplifies web server creation",
      "Callbacks, Promises, and async/await used extensively",
    ],
  },
  {
    id: 10,
    title: "JavaScript in Full Stack Apps (Frontend + Backend Flow)",
    estimatedTime: 65,
    content: `Building complete web applications with JavaScript.

Full Stack Architecture:
Frontend (Client):
- HTML/CSS/JavaScript in browser
- Fetch data from API
- Render dynamic content
- Handle user interactions

Backend (Server):
- Node.js with Express
- Handle requests and responses
- Manage database operations
- Authenticate users

Communication:
REST API:
- GET: retrieve data
- POST: create data
- PUT: update data
- DELETE: remove data

CORS:
Cross-Origin Resource Sharing allows frontend to make requests to different domain.

Data Flow:
1. User interacts with frontend
2. Frontend makes API request
3. Backend processes request
4. Backend queries database
5. Backend returns response
6. Frontend updates UI with data

Popular Full Stack Stacks:
- MERN: MongoDB, Express, React, Node.js
- MEAN: MongoDB, Express, Angular, Node.js
- JAM: JavaScript, APIs, Markup

Best Practices:
- Validate data on both frontend and backend
- Use environment variables for secrets
- Implement proper error handling
- Use HTTPS in production
- Optimize bundle size and API responses`,
    keyPoints: [
      "Frontend and backend use different JavaScript contexts",
      "REST API is standard for communication",
      "Data validation should happen on both client and server",
      "Full stack development requires understanding both sides",
    ],
  },
]

export interface TestQuestion {
  id: number
  level: number
  question: string
  options: string[]
  correctAnswer: number
}

// Level 1 - Basics
export const LEVEL_1_QUESTIONS: TestQuestion[] = [
  {
    id: 1,
    level: 1,
    question: "What keyword declares a block-scoped variable in JavaScript?",
    options: ["var", "let", "const", "variable"],
    correctAnswer: 1,
  },
  {
    id: 2,
    level: 1,
    question: "Which of the following is NOT a JavaScript data type?",
    options: ["String", "Boolean", "Array", "Character"],
    correctAnswer: 3,
  },
  {
    id: 3,
    level: 1,
    question: "What does typeof null return?",
    options: ["null", "undefined", "object", "error"],
    correctAnswer: 2,
  },
  {
    id: 4,
    level: 1,
    question: "How do you create a function in JavaScript?",
    options: ["function myFunc() {}", "define myFunc() {}", "func myFunc {}", "create myFunc() {}"],
    correctAnswer: 0,
  },
  {
    id: 5,
    level: 1,
    question: "Which method adds an element to the end of an array?",
    options: ["add()", "append()", "push()", "insert()"],
    correctAnswer: 2,
  },
  {
    id: 6,
    level: 1,
    question: "What is the DOM?",
    options: [
      "Document Object Model",
      "Data Organization Module",
      "Dynamic Object Management",
      "Database Operational Model",
    ],
    correctAnswer: 0,
  },
  {
    id: 7,
    level: 1,
    question: "How do you add an event listener in JavaScript?",
    options: [
      "element.addEvent('click', function)",
      "element.addEventListener('click', function)",
      "element.onEvent('click', function)",
      "element.attachEvent('click', function)",
    ],
    correctAnswer: 1,
  },
  {
    id: 8,
    level: 1,
    question: "Which operator is used for strict equality comparison?",
    options: ["=", "==", "===", "!=="],
    correctAnswer: 2,
  },
  {
    id: 9,
    level: 1,
    question: "What does the spread operator (...) do?",
    options: [
      "Creates a new variable",
      "Spreads an array or object into individual elements",
      "Deletes elements",
      "Copies with deep cloning",
    ],
    correctAnswer: 1,
  },
  {
    id: 10,
    level: 1,
    question: "What is a callback function?",
    options: [
      "A function that calls other functions",
      "A function passed as argument to another function",
      "A function that returns another function",
      "A function that cannot be called twice",
    ],
    correctAnswer: 1,
  },
]

// Level 2 - Core Logic
export const LEVEL_2_QUESTIONS: TestQuestion[] = [
  {
    id: 11,
    level: 2,
    question: "What is the purpose of Object.freeze()?",
    options: ["Stop code execution", "Prevent object modification", "Clear object memory", "Speed up operations"],
    correctAnswer: 1,
  },
  {
    id: 12,
    level: 2,
    question: "Which array method creates a new array without modifying the original?",
    options: ["splice()", "map()", "sort()", "reverse()"],
    correctAnswer: 1,
  },
  {
    id: 13,
    level: 2,
    question: "What is a closure in JavaScript?",
    options: [
      "A function that ends another function",
      "A function that has access to variables from its enclosing scope",
      "A closed function that cannot be called",
      "A function inside a class",
    ],
    correctAnswer: 1,
  },
  {
    id: 14,
    level: 2,
    question: "What does the 'this' keyword refer to in a regular function?",
    options: ["The function itself", "The global object (window in browser)", "The parent scope", "Always undefined"],
    correctAnswer: 1,
  },
  {
    id: 15,
    level: 2,
    question: "How do you prevent event bubbling?",
    options: ["return false;", "event.preventDefault()", "event.stopPropagation()", "event.stop()"],
    correctAnswer: 2,
  },
  {
    id: 16,
    level: 2,
    question: "What is hoisting in JavaScript?",
    options: [
      "Lifting elements in the DOM",
      "Moving declarations to the top of scope before execution",
      "Creating new scopes",
      "Removing unused variables",
    ],
    correctAnswer: 1,
  },
  {
    id: 17,
    level: 2,
    question: "Which method removes whitespace from both ends of a string?",
    options: ["remove()", "trim()", "strip()", "clean()"],
    correctAnswer: 1,
  },
  {
    id: 18,
    level: 2,
    question: "What is the difference between == and ===?",
    options: ["No difference", "== performs type coercion, === doesn't", "=== is faster", "== only works with numbers"],
    correctAnswer: 1,
  },
  {
    id: 19,
    level: 2,
    question: "What does Promise.all() do?",
    options: [
      "Executes all promises sequentially",
      "Waits for all promises to resolve or any to reject",
      "Returns the first resolved promise",
      "Cancels all promises",
    ],
    correctAnswer: 1,
  },
  {
    id: 20,
    level: 2,
    question: "How do you convert a string to a number?",
    options: ["parseString()", "toNumber()", "Number() or parseInt()", "stringToNum()"],
    correctAnswer: 2,
  },
]

// Level 3 - DOM & ES6
export const LEVEL_3_QUESTIONS: TestQuestion[] = [
  {
    id: 21,
    level: 3,
    question: "What is event delegation?",
    options: [
      "Delegating events to the browser",
      "Attaching listeners to parent elements",
      "Creating multiple event listeners",
      "Removing event listeners",
    ],
    correctAnswer: 1,
  },
  {
    id: 22,
    level: 3,
    question: "What does destructuring assignment do?",
    options: [
      "Destroys objects",
      "Extracts values from objects/arrays into variables",
      "Removes properties from objects",
      "Creates new objects",
    ],
    correctAnswer: 1,
  },
  {
    id: 23,
    level: 3,
    question: "What is the difference between textContent and innerHTML?",
    options: [
      "No difference",
      "textContent includes HTML tags, innerHTML doesn't",
      "innerHTML includes HTML tags, textContent doesn't",
      "innerHTML is deprecated",
    ],
    correctAnswer: 2,
  },
  {
    id: 24,
    level: 3,
    question: "What is a pure function?",
    options: [
      "A function that handles JSON",
      "A function with no side effects that returns same output for same input",
      "A function without parameters",
      "A function defined at module level",
    ],
    correctAnswer: 1,
  },
  {
    id: 25,
    level: 3,
    question: "How does JavaScript handle prototype inheritance?",
    options: [
      "Through class hierarchy like other languages",
      "Objects inherit from other objects through the prototype chain",
      "JavaScript doesn't support inheritance",
      "Through interface implementation",
    ],
    correctAnswer: 1,
  },
  {
    id: 26,
    level: 3,
    question: "What is the purpose of finally() in promises?",
    options: [
      "To end the promise",
      "To execute code regardless of promise outcome",
      "To catch errors only",
      "To return a value",
    ],
    correctAnswer: 1,
  },
  {
    id: 27,
    level: 3,
    question: "What is a higher-order function?",
    options: [
      "A function with a higher priority",
      "A function that takes or returns another function",
      "A function with more parameters",
      "A function defined globally",
    ],
    correctAnswer: 1,
  },
  {
    id: 28,
    level: 3,
    question: "What does const prevent?",
    options: [
      "All modifications to the variable",
      "Reassignment of the variable",
      "Declaring the variable again",
      "Access to the variable",
    ],
    correctAnswer: 1,
  },
  {
    id: 29,
    level: 3,
    question: "How do you create an immutable object in JavaScript?",
    options: ["Use const keyword", "Use Object.freeze() or Object.seal()", "Use readonly keyword", "Use final keyword"],
    correctAnswer: 1,
  },
  {
    id: 30,
    level: 3,
    question: "What is the difference between map() and forEach()?",
    options: [
      "No difference",
      "map() returns new array, forEach() modifies original",
      "forEach() only works with functions",
      "map() is deprecated",
    ],
    correctAnswer: 1,
  },
]

// Level 4 - Async & APIs
export const LEVEL_4_QUESTIONS: TestQuestion[] = [
  {
    id: 31,
    level: 4,
    question: "What is async/await?",
    options: [
      "A way to delay code execution",
      "Syntactic sugar over promises for cleaner async code",
      "A performance optimization",
      "A way to handle errors",
    ],
    correctAnswer: 1,
  },
  {
    id: 32,
    level: 4,
    question: "What is the fetch API used for?",
    options: [
      "Getting data from files",
      "Making HTTP requests from JavaScript",
      "Retrieving DOM elements",
      "Managing local storage",
    ],
    correctAnswer: 1,
  },
  {
    id: 33,
    level: 4,
    question: "What is REST API?",
    options: [
      "A resting place for APIs",
      "Representational State Transfer - architectural style for web APIs",
      "Real Encoded Standard Transfer",
      "Remote Execution Service Tool",
    ],
    correctAnswer: 1,
  },
  {
    id: 34,
    level: 4,
    question: "What does CORS mean?",
    options: [
      "Core Online Request Service",
      "Cross-Origin Resource Sharing",
      "Cascading Online Response System",
      "Centralized Origin Resource Server",
    ],
    correctAnswer: 1,
  },
  {
    id: 35,
    level: 4,
    question: "How do you handle errors in async/await?",
    options: [".catch() method", "try/catch blocks", "error parameter", "Promise rejection handler"],
    correctAnswer: 1,
  },
  {
    id: 36,
    level: 4,
    question: "What is the difference between localStorage and sessionStorage?",
    options: [
      "No difference",
      "localStorage persists, sessionStorage is cleared on tab close",
      "sessionStorage holds more data",
      "localStorage is encrypted",
    ],
    correctAnswer: 1,
  },
  {
    id: 37,
    level: 4,
    question: "How do you make parallel API requests?",
    options: [
      "Multiple fetch() calls one after another",
      "Promise.all() with multiple fetch() calls",
      "Using setTimeout with fetch",
      "Making requests in a loop",
    ],
    correctAnswer: 1,
  },
  {
    id: 38,
    level: 4,
    question: "What is request/response cycle?",
    options: [
      "A bicycle part",
      "Client sends request, server sends response",
      "A type of loop",
      "A memory allocation method",
    ],
    correctAnswer: 1,
  },
  {
    id: 39,
    level: 4,
    question: "What does JSON.stringify() do?",
    options: ["Parses JSON", "Converts object to JSON string", "Validates JSON", "Compresses data"],
    correctAnswer: 1,
  },
  {
    id: 40,
    level: 4,
    question: "How do you set request headers in fetch()?",
    options: [
      "First parameter",
      "Second parameter as an object with headers property",
      "fetch('url').headers.set()",
      "Using a separate function",
    ],
    correctAnswer: 1,
  },
]

// Level 5 - Full Stack Usage
export const LEVEL_5_QUESTIONS: TestQuestion[] = [
  {
    id: 41,
    level: 5,
    question: "What is a middleware in Express?",
    options: [
      "A function between frontend and backend",
      "A function that processes requests before reaching route handlers",
      "A database connection",
      "A security feature",
    ],
    correctAnswer: 1,
  },
  {
    id: 42,
    level: 5,
    question: "What are HTTP status codes used for?",
    options: [
      "Timing API responses",
      "Indicating the result of an HTTP request",
      "Validating data",
      "Caching responses",
    ],
    correctAnswer: 1,
  },
  {
    id: 43,
    level: 5,
    question: "What is the difference between GET and POST?",
    options: [
      "POST is newer than GET",
      "GET retrieves data, POST sends data",
      "No functional difference",
      "POST is more secure",
    ],
    correctAnswer: 1,
  },
  {
    id: 44,
    level: 5,
    question: "What is API authentication?",
    options: [
      "Verifying API syntax",
      "Verifying client identity before allowing access",
      "Encrypting API responses",
      "Limiting API requests",
    ],
    correctAnswer: 1,
  },
  {
    id: 45,
    level: 5,
    question: "What is JWT (JSON Web Token)?",
    options: ["A JSON parsing tool", "A stateless authentication token", "A type of JSON", "A database format"],
    correctAnswer: 1,
  },
  {
    id: 46,
    level: 5,
    question: "What is data validation?",
    options: [
      "Checking if data is useful",
      "Verifying data format and constraints before processing",
      "Storing data safely",
      "Encrypting sensitive data",
    ],
    correctAnswer: 1,
  },
  {
    id: 47,
    level: 5,
    question: "What is the MVC pattern?",
    options: [
      "Microsoft Visual Code",
      "Model-View-Controller architectural pattern",
      "Main View Component",
      "Modern Virtual Computing",
    ],
    correctAnswer: 1,
  },
  {
    id: 48,
    level: 5,
    question: "What is database indexing?",
    options: [
      "Organizing database files",
      "Creating fast lookups on frequently queried columns",
      "Listing all databases",
      "Backing up data",
    ],
    correctAnswer: 1,
  },
  {
    id: 49,
    level: 5,
    question: "What is SQL injection?",
    options: [
      "Injecting SQL optimizations",
      "Malicious code injection through SQL queries",
      "Using SQL in APIs",
      "Storing SQL in variables",
    ],
    correctAnswer: 1,
  },
  {
    id: 50,
    level: 5,
    question: "What is API rate limiting?",
    options: [
      "Limiting API features",
      "Restricting number of requests per time period",
      "Slowing down fast requests",
      "Blocking certain IPs",
    ],
    correctAnswer: 1,
  },
]
