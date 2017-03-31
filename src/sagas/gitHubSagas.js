import { fork } from 'redux-saga/effects';

import { takeEveryApiCall } from './utils';

import { gitHubActionTypes } from './actionTypes';
import { gitHubApi } from '../api/gitHubApi';

export const fetchIssues = ({ owner, repo, page, count }) => ({
  type: gitHubActionTypes.FETCH_ISSUES,
  payload: { owner, repo, page, count },
  meta: { owner, repo }
});

const watchFetchIssues = takeEveryApiCall(gitHubActionTypes.FETCH_ISSUES, gitHubApi.fetchIssues);


export const fetchIssue = ({ owner, repo, number }) => ({
  type: gitHubActionTypes.FETCH_ISSUE,
  payload: { owner, repo, number },
});

const watchFetchIssue = takeEveryApiCall(gitHubActionTypes.FETCH_ISSUE, gitHubApi.fetchIssue);


export const changeCount = count => ({
  type: gitHubActionTypes.COUNT_CHANGED,
  payload: { count },
});

export const changePage = page => ({
  type: gitHubActionTypes.PAGE_CHANGED,
  payload: { page },
});

export function* gitHubSagas() {
  yield fork(watchFetchIssues);
  yield fork(watchFetchIssue);
}
