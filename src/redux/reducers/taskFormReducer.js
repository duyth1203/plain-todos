import * as actionTypes from '../constants/actionTypes';

const emptyFormContent = {
  id: undefined,
  name: '',
  status: 1
};

const initialState = {
  formContent: emptyFormContent,
  formDisplayed: false
};

const taskFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CLOSE_TASK_FORM:
      return {
        ...state,
        formDisplayed: false
      };
    case actionTypes.OPEN_TASK_FORM:
      const { task } = action;
      return {
        formContent: task === undefined ? emptyFormContent : task,
        formDisplayed: true
      };
    default:
      return state;
  }
};

export default taskFormReducer;
