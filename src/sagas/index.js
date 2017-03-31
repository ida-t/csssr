import { fork } from 'redux-saga/effects';

import { gitHubSagas } from './gitHubSagas';

export default function* sagas() {
  yield fork(gitHubSagas);
}
