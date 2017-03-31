import keyMirror from 'keyMirror';

export const gitHubActionTypes = keyMirror({
  FETCH_ISSUES: null,
  FETCH_ISSUES_COMPLETE: null,
  FETCH_ISSUES_FAILED: null,

  FETCH_ISSUE: null,
  FETCH_ISSUE_COMPLETE: null,
  FETCH_ISSUE_FAILED: null,

  COUNT_CHANGED: null,
  PAGE_CHANGED: null,
});
