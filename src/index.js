import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './dist/output.css';
import App from './App';
import  { BrowserRouter } from 'react-router-dom';
import AlbumsProvider from './context/AlbumsProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <AlbumsProvider>
          <App />
      </AlbumsProvider>
  </BrowserRouter>
);
