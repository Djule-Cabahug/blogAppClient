import React from 'react';
import ReactDOM from 'react-dom/client';
// Import the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.js';
import './index.css'
import 'notyf/notyf.min.css';

//the "import" statement allows us to use the code/exported modules from other files similar to how we use the "require" function in NODE JS.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    <App />
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

//variable to the name to be displayed in the page
// const name = 'John Smith';

// const user = {
//   firstName: 'Jane',
//   lastName: 'Smith'
// }

// function formatName(user) {
//   return user.firstName + ' ' + user.lastName;
// }

//JSX element utilizes html and jaavascript to properly load html elements and javascript code together
// const element = <h1>Hello, {formatName(user)}</h1>

/*
crateRoot - assign the element to be managed by React with its Virtual DOM

const root = ReactDom.createRoot(document.getElementById('root'));

render() - displays the react elements/components into the root.

*/
// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(element);