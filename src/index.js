/* eslint-disable global-require, import/no-extraneous-dependencies */
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './App';

const appElement = document.getElementById('app-root');

const renderApp = Root => render(
  <AppContainer>
    <Root />
  </AppContainer>,
  appElement
);

renderApp(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => renderApp(require('./App').default));
}
