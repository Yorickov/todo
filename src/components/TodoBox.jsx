import React from 'react';
import NewTaskForm from './NewTaskForm.jsx';
import Tasks from './Tasks.jsx';
import Filter from './Filter.jsx';

const TodoBox = () => (
  <div className="row">
    <div className="col-6">
      <NewTaskForm />
      <Filter />
      <Tasks />
    </div>
  </div>
);
export default TodoBox;
