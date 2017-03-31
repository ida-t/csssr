import React from 'react';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import Page from './components/shared/Page';
import NotFound from './components/shared/NotFound';
import Home from './components/Home/Home';
import IssuePage from './components/IssuePage/IssuePage';

import sagas from './sagas';
import rootReducer from './reducers/rootReducer';

import './index.styl';

const sagaMiddleware = createSagaMiddleware();

const middleware = ((middlewares) => {
  if (process.env.NODE_ENV !== 'production') {
    /* eslint-disable no-underscore-dangle */
    if (window.__REDUX_DEVTOOLS_EXTENSION__) {
      return compose(applyMiddleware(...middlewares), window.__REDUX_DEVTOOLS_EXTENSION__());
    }
  }
  return applyMiddleware(...middlewares);
})([sagaMiddleware]);

const store = createStore(rootReducer, {}, middleware);

sagaMiddleware.run(sagas);

export default () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/csssr/" component={Page}>
        <IndexRoute component={Home} />
        <Route path="repos/:owner/:repo/issues/:number" component={IssuePage} />
        <Route path="*" component={NotFound} title="404: Page not found" />
      </Route>
    </Router>
  </Provider>
);
