import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './routes/App';
import Store from './context/Store';

ReactDOM.render(
  <React.StrictMode> 
    <Store>   
      <App />
    </Store>
  </React.StrictMode>,
  document.getElementById('root')
);

