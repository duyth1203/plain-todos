import * as actionTypes from './constants/actionTypes';

export const closeTaskForm = () => ({
  type: actionTypes.CLOSE_TASK_FORM
});

export const deleteTask = taskId => ({
  type: actionTypes.DELETE_TASK,
  taskId
});

export const openTaskForm = task => ({
  type: actionTypes.OPEN_TASK_FORM,
  task
});

export const resetFilters = () => ({
  type: actionTypes.RESET_FILTERS
});

export const saveTask = task => ({
  type: actionTypes.SAVE_TASK,
  task
});

export const searchTasks = searchTxt => ({
  type: actionTypes.SEARCH_TASKS,
  searchTxt
});

export const showTaskByStaus = showByStatus => ({
  type: actionTypes.SHOW_TASKS_BY_STATUS,
  showByStatus
});

export const sortTask = sortOrder => ({
  type: actionTypes.SORT_TASKS,
  sortOrder
});
