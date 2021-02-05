import { createReducer, combineReducers } from '@reduxjs/toolkit';

const increment = createReducer(0, {
  INCREMENT: (state) => state + 1,
});

const text = createReducer('', {
  TEXT_UPDATE: (_state, action) => action.payload.text,
  TEXT_RESET: () => '',
});

export default combineReducers({
  increment,
  text,
});
