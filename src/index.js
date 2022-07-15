import './styles.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/App/index.js';

import themes from 'devextreme/ui/themes';
themes.initialized(() => ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,  
  document.getElementById('app'),
));
