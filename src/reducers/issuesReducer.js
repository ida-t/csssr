import { gitHubActionTypes } from '../sagas/actionTypes';

export const initialState = {
  items: null,
  loading: false,
  loaded: false,
};

export default function issuesReducer(state = initialState, action) {
  switch (action.type) {
    case gitHubActionTypes.FETCH_ISSUES:
      return { loading: true, loaded: false };
    case gitHubActionTypes.FETCH_ISSUES_COMPLETE:
      return { loading: false, items: action.payload, loaded: true };
    case gitHubActionTypes.FETCH_ISSUES_FAILED:
      return { loading: false, items: null, loaded: false };
    default:
      return state;
  }
}
