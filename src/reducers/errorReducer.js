import { gitHubActionTypes } from '../sagas/actionTypes';

export const initialState = null;

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case 'DELETE_ERROR':
      return initialState;
    case gitHubActionTypes.FETCH_ISSUES_FAILED:
    case gitHubActionTypes.FETCH_ISSUE_FAILED:
      return action.payload.message;
    default:
      return state;
  }
}
