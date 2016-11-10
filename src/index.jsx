import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import style from './index.scss';

const API_URL_BASE = __API_URL_BASE__

ReactDOM.render(
  <App apiUrlBase={API_URL_BASE}/>,
  document.getElementById('root')
);
