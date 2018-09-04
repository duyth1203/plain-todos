import { combineReducers } from 'redux';
import tasksDataReducer from './tasksDataReducer';
import tasksFilterReducer from './tasksFilterReducer';
import taskFormReducer from './taskFormReducer';

const indexReducer = combineReducers({
  tasks: tasksDataReducer,
  filters: tasksFilterReducer,
  taskForm: taskFormReducer
});

export default indexReducer;
