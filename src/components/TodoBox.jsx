import React from 'react';
import { connect } from 'react-redux';
import { uniqueId } from 'lodash';
import * as actionCreators from '../actions';

const mapStateToProps = ({ tasks, text }) => ({ tasks, text });

const TodoBox = (props) => {
  const handleUpdateNewTaskText = (e) => {
    const { updateNewTaskText } = props;
    updateNewTaskText(e.target.value);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    const { addTask, text } = props;
    const task = { text, id: uniqueId() };
    addTask(task);
  };

  const handleRemoveTask = (id) => () => {
    const { removeTask } = props;
    removeTask(id);
  };

  const renderForm = (text) => (
    <form action="" onSubmit={handleAddTask} className="row">
      <div className="col-10">
        <input
          type="text"
          onChange={handleUpdateNewTaskText}
          value={text}
          required
          className="form-control mr-3"
          placeholder="I am going..."
        />
      </div>
      <button type="submit" className="btn btn-primary col-2">Add</button>
    </form>
  );

  const renderTasks = (tasks) => {
    if (tasks.length === 0) {
      return null;
    }
    return (
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
  };

  const { tasks, text } = props;

  return (
    <div className="row">
      <div className="col-6">
        {renderForm(text)}
        {renderTasks(tasks)}
      </div>
    </div>
  );
};

export default connect(mapStateToProps, actionCreators)(TodoBox);
