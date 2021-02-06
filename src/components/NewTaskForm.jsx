import React from 'react';
import { connect } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import * as actionCreators from '../actions';

const mapStateToProps = ({ text }) => ({ text });

const NewTaskForm = ({
  text,
  updateNewTaskText,
  addTask,
}) => {
  const handleUpdateNewTaskText = (e) => {
    updateNewTaskText(e.target.value);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    const task = { text, id: nanoid(), state: 'active' };
    addTask(task);
  };

  return (
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
};

export default connect(mapStateToProps, actionCreators)(NewTaskForm);
