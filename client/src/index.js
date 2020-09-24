import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { CurrentUserStore } from 'store/current-user';
import 'assets/stylesheets/font.css';
import 'assets/stylesheets/main.css';

ReactDOM.render(
  <React.StrictMode>
    <CurrentUserStore>
      <App />
    </CurrentUserStore>
  </React.StrictMode>,
  document.getElementById('root')
);
