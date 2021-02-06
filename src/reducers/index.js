import { createReducer, combineReducers } from '@reduxjs/toolkit';
import _ from 'lodash';
import {
  updateNewTaskText,
  addTask,
  removeTask,
  toggleTaskState,
  inverseTaskTheme,
} from '../actions';

const text = createReducer('', {
  [updateNewTaskText]: (_state, { payload: { text } }) => text,
  [addTask]: () => '',
});

const tasks = createReducer({ byId: {}, allIds: [] }, {
  [addTask]: (state, { payload: { task } }) => {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [task.id]: task },
      allIds: [...allIds, task.id],
    };
  },
  [removeTask]: (state, { payload: { id } }) => {
    const { byId, allIds } = state;
    return {
      byId: _.omit(byId, id),
      allIds: _.without(allIds, id),
    };
  },
  [toggleTaskState]: (state, { payload: { id } }) => {
    const { byId } = state;
    const task = byId[id];
    const newState = task.state === 'active' ? 'finished' : 'active';
    const updatedTask = { ...task, state: newState };
    return {
      ...state,
      byId: { ...byId, [task.id]: updatedTask },
    };
  },
});

const tasksUIState = createReducer({}, {
  [addTask]: (state, { payload: { task } }) => ({
    ...state,
    [task.id]: { theme: 'light' },
  }),
  [inverseTaskTheme]: (state, { payload: { task } }) => {
    const currentTheme = state[task.id].theme;
    const mapping = { white: 'light', light: 'white' };
    return { ...state, [task.id]: { theme: mapping[currentTheme] } };
  },
});

export default combineReducers({
  text,
  tasks,
  tasksUIState,
});
