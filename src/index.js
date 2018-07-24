import React from 'react';
import { Provider } from 'react-redux';
import initSentry from './utils/sentry';

import App from './App';
import store from './store'

export default function createApp() {
  initSentry()
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
}
