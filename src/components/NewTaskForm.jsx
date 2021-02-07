import React from 'react';
import { connect } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { Field, reduxForm } from 'redux-form';
import * as actionCreators from '../actions';

const mapStateToProps = () => ({});

const NewTaskForm = ({
  handleSubmit,
  reset,
  addTask,
}) => {
  const handleAddTask = (values) => { // ({ text })
    const task = { ...values, id: nanoid(), state: 'active' }; // { text, id:... }
    addTask(task);
    reset();
  };

  return (
    <form action="" onSubmit={handleSubmit(handleAddTask)} className="row">
      <div className="col-10">
        <Field
          name="text" // values.text
          required
          component="input"
          type="text"
          className="form-control mr-3"
          placeholder="I am going..."
        />
      </div>
      <button type="submit" className="btn btn-primary col-2">Add</button>
    </form>
  );
};

const NewTaskFormConnected = connect(mapStateToProps, actionCreators)(NewTaskForm);

export default reduxForm({ form: 'newTask' })(NewTaskFormConnected);
