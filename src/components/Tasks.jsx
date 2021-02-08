import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import * as actions from '../actions';
import { filteredTasksSelector } from '../selectors';

const mapStateToProps = (state) => {
  const { tasksUIState, tasksFetchingState } = state;
  const tasks = filteredTasksSelector(state);
  return { tasks, tasksUIState, tasksFetchingState };
};

const actionCreators = {
  removeTask: actions.removeTask,
  toggleTask: actions.toggleTask,
  inverseTaskTheme: actions.inverseTaskTheme,
};

const Tasks = ({
  tasks,
  tasksUIState,
  tasksFetchingState,
  removeTask,
  toggleTask,
  inverseTaskTheme,
}) => {
  const handleRemoveTask = (id) => () => {
    removeTask(id);
  };

  const handleToggleTaskState = (id) => () => {
    toggleTask(id);
  };

  const handleInverseTaskTheme = (task) => () => {
    inverseTaskTheme(task);
  };

  const renderTask = (task) => {
    const themeToClasses = {
      white: 'bg-white',
      light: 'bg-light',
    };

    const currentThemeClass = themeToClasses[tasksUIState[task.id].theme];

    const classes = cn({
      'list-group-item d-flex': true,
      [currentThemeClass]: true,
    });

    return (
      <li key={task.id} className={classes}>
        <button data-test="task-change-theme" onClick={handleInverseTaskTheme(task)} className="btn btn-secondary btn-sm me-3" type="button">
          <span>Theme</span>
        </button>
        <span className="me-auto d-flex align-items-center">
          <a href="#" data-test="task-toggle-state" onClick={handleToggleTaskState(task.id)}>
            {task.state === 'active' ? task.text : <s>{task.text}</s>}
          </a>
        </span>
        <button type="button" className="close btn" onClick={handleRemoveTask(task.id)}>
          <span>&times;</span>
        </button>
      </li>
    );
  };

  if (tasksFetchingState === 'requested') {
    return (
      <div className="spinner-border m-3" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (tasksFetchingState === 'failed') {
    return (
      <span>Please, reload page!</span>
    );
  }

  if (tasks.length === 0) {
    return null;
  }

  return (
    <div className="mt-3">
      <ul className="list-group">
        {tasks.map(renderTask)}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, actionCreators)(Tasks);
