import { gitHubActionTypes } from '../sagas/actionTypes';

export const initialState = {
  item: null,
  loading: false,
  loaded: false,
};

export default function issuesReducer(state = initialState, action) {
  switch (action.type) {
    case gitHubActionTypes.FETCH_ISSUE:
      return { loading: true, loaded: false };
    case gitHubActionTypes.FETCH_ISSUE_COMPLETE:
      return { loading: false, item: action.payload, loaded: true };
    case gitHubActionTypes.FETCH_ISSUE_FAILED:
      return { loading: false, item: null, loaded: false };
    default:
      return state;
  }
}
