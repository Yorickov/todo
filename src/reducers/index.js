import { createReducer, combineReducers } from '@reduxjs/toolkit';
import _ from 'lodash';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const tasksFetchingState = createReducer('none', {
  [actions.fetchTasksRequest]: () => 'requested',
  [actions.fetchTasksFailure]: () => 'failed',
  [actions.fetchTasksSuccess]: () => 'finished',
});

const taskAddingState = createReducer('none', {
  [actions.addTaskRequest]: () => 'requested',
  [actions.addTaskFailure]: () => 'failed',
  [actions.addTaskSuccess]: () => 'finished',
});

const taskRemovingState = createReducer('none', {
  [actions.removeTaskRequest]: () => 'requested',
  [actions.removeTaskFailure]: () => 'failed',
  [actions.removeTaskSuccess]: () => 'finished',
});

const taskTogglingState = createReducer('none', {
  [actions.toggleTaskStateFailure]: () => 'failed',
  [actions.toggleTaskStateSuccess]: () => 'finished',
});

const tasks = createReducer({ byId: {}, allIds: [], currentFilterName: 'all' }, {
  [actions.fetchTasksSuccess]: (state, { payload }) => (
    {
      ...state,
      byId: _.keyBy(payload.tasks, 'id'),
      allIds: payload.tasks.map((t) => t.id),
    }
  ),
  [actions.addTaskSuccess]: (state, { payload: { task } }) => {
    const { byId, allIds } = state;
    return {
      ...state,
      byId: { ...byId, [task.id]: task },
      allIds: [...allIds, task.id],
    };
  },
  [actions.removeTaskSuccess]: (state, { payload: { id } }) => {
    const { byId, allIds } = state;
    return {
      ...state,
      byId: _.omit(byId, id),
      allIds: _.without(allIds, id),
    };
  },
  [actions.toggleTaskStateSuccess]: (state, { payload: { id } }) => {
    const task = state.byId[id];

    const newState = task.state === 'active' ? 'finished' : 'active';
    const updatedTask = { ...task, state: newState };
    return {
      ...state,
      byId: { ...state.byId, [task.id]: updatedTask },
    };
  },
  [actions.setTasksFilter]: (state, { payload: { filterName } }) => (
    { ...state, currentFilterName: filterName }),
});

const tasksUIState = createReducer({}, {
  [actions.addTaskSuccess]: (state, { payload: { task } }) => ({
    ...state,
    [task.id]: { theme: 'light' },
  }),
  [actions.inverseTaskTheme]: (state, { payload: { task } }) => {
    const currentTheme = state[task.id].theme;
    const mapping = { white: 'light', light: 'white' };
    return { ...state, [task.id]: { theme: mapping[currentTheme] } };
  },
});

export default combineReducers({
  form: formReducer,
  tasks,
  tasksUIState,
  tasksFetchingState,
  taskAddingState,
  taskRemovingState,
  taskTogglingState,
});
