import React from 'react';
import NewTaskForm from './NewTaskForm.jsx';
import Tasks from './Tasks.jsx';

const TodoBox = () => (
  <div className="row">
    <div className="col-6">
      <NewTaskForm />
      <Tasks />
    </div>
  </div>
);
export default TodoBox;
