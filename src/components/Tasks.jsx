import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

const mapStateToProps = (state) => {
  const { tasks: { byId, allIds } } = state;
  const tasks = allIds.map((id) => byId[id]);
  return { tasks };
};

const Tasks = (props) => {
  const handleRemoveTask = (id) => () => {
    const { removeTask } = props;
    removeTask(id);
  };

  const handleToggleTaskState = (id) => (e) => {
    e.preventDefault();
    const { toggleTaskState } = props;
    toggleTaskState(id);
  };

  const renderTasks = (tasks) => (
    <div className="mt-3">
      <ul className="list-group">
        {tasks.map(({ id, text, state }) => (
          <li key={id} className="list-group-item d-flex">
            <span className="me-auto">
              <a href="#" data-test="task-toggle-state" onClick={handleToggleTaskState(id)}>
                {state === 'active' ? text : <s>{text}</s>}
              </a>
            </span>
            <button type="button" className="close" onClick={handleRemoveTask(id)}>
              <span>&times;</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  const { tasks } = props;
  return (tasks.length > 0) && renderTasks(tasks);
};

export default connect(mapStateToProps, actionCreators)(Tasks);
