// @ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserProvider } from './contexts/UserContext';
import { PhotoProvider } from './contexts/PhotoContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <PhotoProvider>
        <App />
    </PhotoProvider>
  </UserProvider>
);
