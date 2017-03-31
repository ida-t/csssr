import { takeEvery, put, call } from 'redux-saga/effects';


export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const apiCallSaga = (actionType, asyncCall) => {
  function* request({ payload, meta }) {
    try {
      const result = yield call(asyncCall, payload);
      yield put({ type: `${actionType}_COMPLETE`, payload: result, meta });
    } catch (error) {
      yield put({ type: `${actionType}_FAILED`, payload: error });
      yield call(delay, 5000);
      yield put({ type: 'DELETE_ERROR' });
    }
  }
  return request;
};

export const takeEveryApiCall = (actionType, asyncCall) => {
  const request = apiCallSaga(actionType, asyncCall);
  function* watchGenerator() {
    yield takeEvery(actionType, request);
  }
  return watchGenerator;
};
