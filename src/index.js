import React from 'react';
import { Provider } from 'react-redux';
import { Sentry } from 'react-native-sentry';

import { SENTRYURL } from './config/secrets';

import App from './App';
import store from './store'

export default function createApp() {
  Sentry.config(SENTRYURL).install();
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
}
