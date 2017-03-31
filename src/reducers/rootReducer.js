import { combineReducers } from 'redux';

import issues from './issuesReducer';
import error from './errorReducer';
import issue from './issueReducer';
import form from './formReducer';
import visualization from './issuesVisualization';

const rootReducer = combineReducers({
  issues,
  issue,
  form,
  error,
  visualization
});

export default rootReducer;
