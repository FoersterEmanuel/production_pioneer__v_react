import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './parts/App';

import './styles/colors.css';
import './styles/sizes.css';
import './index.css';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
