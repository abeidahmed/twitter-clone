import React from 'react';
import ReactDOM from 'react-dom';
import Store from 'store';
import App from './App';
import 'assets/stylesheets/font.css';
import 'assets/stylesheets/main.css';

ReactDOM.render(
  <React.StrictMode>
    <Store>
      <App />
    </Store>
  </React.StrictMode>,
  document.getElementById('root')
);
