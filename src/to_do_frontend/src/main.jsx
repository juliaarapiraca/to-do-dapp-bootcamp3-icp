import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Login from './login';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Login />
    <App />
  </React.StrictMode>,
);
