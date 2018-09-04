import * as actionTypes from '../constants/actionTypes';
import getLocalTasks from '../../helpers/getLocalTasks';
import idGenerator from '../../helpers/idGenerator';

const initialState = getLocalTasks();

const tasksDataReducer = (state = initialState, action) => {
  let tasks = [];
  switch (action.type) {
    case actionTypes.DELETE_TASK:
      tasks = getLocalTasks();
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === action.taskId) {
          tasks.splice(i, 1);
          localStorage.setItem('tasks', JSON.stringify(tasks));
          break;
        }
      }
      return tasks;
    case actionTypes.SAVE_TASK:
      tasks = getLocalTasks();
      const { task } = action;
      // generate new id if add new task
      if (task.id === undefined) task.id = idGenerator();
      // delete task if exists
      else
        for (let i = 0; i < tasks.length; i++) {
          if (tasks[i].id === task.id) {
            tasks.splice(i, 1);
            break;
          }
        }
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      return tasks;
    default:
      return state;
  }
};

export default tasksDataReducer;
