import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducers from '../src/reducers';
import TodoBox from '../src/components/TodoBox.jsx';

it('Store', () => {
  const store = configureStore({
    reducer: reducers,
  });

  const vdom = (
    <Provider store={store}>
      <TodoBox />
    </Provider>
  );

  const wrapper = mount(vdom);
  expect(wrapper.render()).toMatchSnapshot();

  const newTaskInput = wrapper.find('input[type="text"]');
  const newTaskSubmit = wrapper.find('button[type="submit"]');

  newTaskInput.simulate('change', { target: { value: 'first task' } });
  expect(wrapper.render()).toMatchSnapshot();

  newTaskSubmit.simulate('submit');
  expect(wrapper.render()).toMatchSnapshot();

  newTaskInput.simulate('change', { target: { value: 'another task' } });
  expect(wrapper.render()).toMatchSnapshot();

  newTaskSubmit.simulate('submit');
  expect(wrapper.render()).toMatchSnapshot();
  expect(wrapper.find('.list-group-item')).toHaveLength(2);

  wrapper
    .find('[data-test="task-toggle-state"]').first()
    .simulate('click');
  expect(wrapper.render()).toMatchSnapshot();

  wrapper
    .find('[data-test="task-toggle-state"]').first()
    .simulate('click');
  expect(wrapper.render()).toMatchSnapshot();

  const links = wrapper.find('.close');
  links.last().simulate('click');
  expect(wrapper.render()).toMatchSnapshot();
  expect(wrapper.find('.list-group-item')).toHaveLength(1);
});
