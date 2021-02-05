import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducer from './reducers/raw';
import action from './actions/raw';
import Increment from './components/Increment.jsx';

export default () => {
  /* eslint-disable no-underscore-dangle */
  const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__();
  /* eslint-enable */

  const store = createStore(reducer, reduxDevtools);

  const render = (count) => {
    ReactDOM.render(
      <Increment dispatch={store.dispatch} count={count} increment={action} />,
      document.getElementById('root'),
    );
  };

  store.subscribe(() => {
    const state = store.getState();
    render(state);
  });

  render();
};
