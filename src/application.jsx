import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducers/raw';
import * as actionCreators from './actions/raw';
import Increment from './components/raw/Increment.jsx';
import TextForm from './components/raw/TextForm.jsx';

export default () => {
  const store = configureStore({
    reducer: reducers,
  });

  const render = (state = {}) => {
    const { increment, text } = state;
    ReactDOM.render(
      <div className="row">
        <Increment dispatch={store.dispatch} count={increment} {...actionCreators} />
        <TextForm dispatch={store.dispatch} text={text} {...actionCreators} />
      </div>,
      document.getElementById('root'),
    );
  };

  store.subscribe(() => {
    const state = store.getState();
    render(state);
  });

  render();
};
