import { createReducer, combineReducers } from '@reduxjs/toolkit';
import { updateNewTaskText, addTask, removeTask } from '../actions';

const text = createReducer('', {
  [updateNewTaskText]: (state, { payload }) => payload.text,
  [addTask]: () => '',
});

const tasks = createReducer([], {
  [addTask]: (state, { payload }) => [payload.task, ...state],
  [removeTask]: (state, { payload }) => state.filter(((task) => task.id !== payload.id)),
});

export default combineReducers({
  text,
  tasks,
});
