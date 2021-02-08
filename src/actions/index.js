import { createAction } from '@reduxjs/toolkit';
import routes from '../lib/routes';
import api from '../lib/api';

export const toggleTaskStateFailure = createAction('TASK_STATE_TOGGLE_FAILURE');
export const toggleTaskStateSuccess = createAction(
  'TASK_STATE_TOGGLE_SUCCESS',
  (id) => ({ payload: { id } }),
);

export const toggleTask = (id) => async (dispatch) => {
  try {
    await api.delete(routes.taskIdUrl(id));
    dispatch(toggleTaskStateSuccess(id));
  } catch (e) {
    dispatch(toggleTaskStateFailure());
    throw e;
  }
};

export const inverseTaskTheme = createAction(
  'TASK_CHANGE_THEME',
  (task) => ({ payload: { task } }),
);

export const setTasksFilter = createAction(
  'TASK_FILTER_SET',
  (filterName) => ({ payload: { filterName } }),
);

export const fetchTasksRequest = createAction('TASKS_FETCH_REQUEST');
export const fetchTasksFailure = createAction('TASKS_FETCH_FAILURE');
export const fetchTasksSuccess = createAction('TASKS_FETCH_SUCCESS',
  (tasks) => ({ payload: { tasks } }));

export const addTaskRequest = createAction('TASK_ADD_REQUEST');
export const addTaskFailure = createAction('TASK_ADD_FAILURE');
export const addTaskSuccess = createAction('TASK_ADD_SUCCESS',
  (task) => ({ payload: { task } }));

export const removeTaskRequest = createAction('TASK_REMOVE_REQUEST');
export const removeTaskFailure = createAction('TASK_REMOVE_FAILURE');
export const removeTaskSuccess = createAction('TASK_REMOVE_SUCCESS',
  (id) => ({ payload: { id } }));

export const fetchTasks = () => async (dispatch) => {
  dispatch(fetchTasksRequest());
  try {
    const response = await api.get(routes.tasksUrl());
    dispatch(fetchTasksSuccess(response.data));
  } catch (e) {
    dispatch(fetchTasksFailure());
    throw e;
  }
};

export const addTask = (task) => async (dispatch) => {
  dispatch(addTaskRequest());
  try {
    const response = await api.post(routes.taskUrl(), { body: task });
    dispatch(addTaskSuccess(response.data));
  } catch (e) {
    dispatch(fetchTasksFailure());
    throw e;
  }
};

export const removeTask = (id) => async (dispatch) => {
  dispatch(removeTaskRequest());
  try {
    await api.delete(routes.taskIdUrl(id));
    dispatch(removeTaskSuccess(id));
  } catch (e) {
    dispatch(removeTaskFailure());
    throw e;
  }
};
