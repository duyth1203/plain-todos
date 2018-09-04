import * as actionTypes from '../constants/actionTypes';

const initialState = {
  searchTxt: '',
  showByStatus: -1,
  sortOrder: true
};

const tasksFilterReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RESET_FILTERS:
      return {
        searchTxt: '',
        showByStatus: -1,
        sortOrder: true
      };
    case actionTypes.SEARCH_TASKS:
      return { ...state, searchTxt: action.searchTxt };
    case actionTypes.SHOW_TASKS_BY_STATUS:
      return { ...state, showByStatus: action.showByStatus };
    case actionTypes.SORT_TASKS:
      return { ...state, sortOrder: action.sortOrder };
    default:
      return state;
  }
};

export default tasksFilterReducer;
