import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';

import 'bootstrap-social';

// for bundling your styles
import './bundle.scss';

ReactDOM.render(
  <App />
  , document.getElementById('root'));
