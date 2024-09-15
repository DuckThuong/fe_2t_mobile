import React from 'react';
import ReactDOM from 'react-dom/client';

import reportWebVitals from './reportWebVitals';
import Login2 from './login2/login2';
import Login3 from './login3/login3';
import Login from './login/login';

const root = ReactDOM.createRoot(document.getElementById('root') );
root.render(
  <React.StrictMode>
    <Login3 />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
