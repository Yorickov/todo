import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import reducers from './reducers';
import TodoBox from './components/TodoBox.jsx';

export default () => {
  const store = configureStore({
    reducer: reducers,
  });

  ReactDOM.render(
    <Provider store={store}>
      <TodoBox />
    </Provider>,
    document.getElementById('root'),
  );
};
