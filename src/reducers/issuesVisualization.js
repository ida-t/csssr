import { gitHubActionTypes } from '../sagas/actionTypes';

export const initialState = {
  count: 10,
  page: 1,
};

export default function issuesVisualization(state = initialState, action) {
  switch (action.type) {
    case gitHubActionTypes.COUNT_CHANGED:
      return { page: 1, count: action.payload.count };
    case gitHubActionTypes.PAGE_CHANGED:
      return { ...state, page: action.payload.page };
    default:
      return state;
  }
}
