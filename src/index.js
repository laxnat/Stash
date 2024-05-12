import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css'

// Set root ReactDOM for app rendering
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render app in React.StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);