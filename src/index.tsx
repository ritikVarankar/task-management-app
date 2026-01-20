import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // Disable because of react-beautiful-dnd package 
  // <React.StrictMode> 
    <App />
  // </React.StrictMode>
);

reportWebVitals();
