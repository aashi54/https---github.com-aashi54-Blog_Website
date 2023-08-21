import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider } from 'react-router-dom';
import Router from './Router';
import { ContextProvider } from './context/Context';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <ContextProvider>
    <App />
  </ContextProvider>

  </React.StrictMode>
);

