import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducers from './reducers/raw';
import * as actionCreators from './actions/raw';
import Increment from './components/Increment.jsx';
import TextForm from './components/TextForm.jsx';

export default () => {
  /* eslint-disable no-underscore-dangle */
  const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__();
  /* eslint-enable */

  const store = createStore(reducers, reduxDevtools);

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
