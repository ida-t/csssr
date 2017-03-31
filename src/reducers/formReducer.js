import { gitHubActionTypes } from '../sagas/actionTypes';

export const initialState = {
  owner: '',
  repo: '',
};

export default function issuesReducer(state = initialState, action) {
  switch (action.type) {
    case gitHubActionTypes.FETCH_ISSUES_COMPLETE:
      return { owner: action.meta.owner, repo: action.meta.owner };
    default:
      return state;
  }
}
