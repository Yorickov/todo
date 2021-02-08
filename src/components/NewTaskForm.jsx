import React from 'react';
import { connect } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import * as actions from '../actions';

const mapStateToProps = () => ({});

const actionCreators = {
  addTask: actions.addTask,
};

const NewTaskForm = ({
  handleSubmit,
  reset,
  submitting,
  pristine,
  error,
  addTask,
}) => {
  const handleAddTask = async (values) => {
    const task = { ...values, id: nanoid(), state: 'active' };
    try {
      await addTask(task);
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
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
      <button type="submit" disabled={pristine || submitting} className="btn btn-primary col-2">Add</button>
      {error && <div className="ml-3">{error}</div>}
    </form>
  );
};

const NewTaskFormConnected = connect(mapStateToProps, actionCreators)(NewTaskForm);

export default reduxForm({ form: 'newTask' })(NewTaskFormConnected);
