import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import GlobalStyle from './style/GlobalStyle.js';
import ResetStyle from './style/ResetStyle.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ResetStyle/>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);