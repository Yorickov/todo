import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

const mapStateToProps = ({ tasks }) => ({ tasks });

const Tasks = (props) => {
  const handleRemoveTask = (id) => () => {
    const { removeTask } = props;
    removeTask(id);
  };

  const renderTasks = (tasks) => (
    <div className="mt-3">
      <ul className="list-group">
        {tasks.map(({ id, text }) => (
          <li key={id} className="list-group-item d-flex">
            <span className="me-auto">{text}</span>
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
