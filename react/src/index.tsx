import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import flagsmith from 'flagsmith'
import {FlagsmithProvider} from 'flagsmith/react'
import App from './App';

ReactDOM.render(
  <FlagsmithProvider options={{
      environmentID: "TKrFgEwfTXhoMVmymnvShk",
      // cacheFlags:true
  }} flagsmith={flagsmith}>
    <App />
  </FlagsmithProvider>,
  document.getElementById('root')
);
