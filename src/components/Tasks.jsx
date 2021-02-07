import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import * as actionCreators from '../actions';
import { filteredTasksSelector } from '../selectors';

const mapStateToProps = (state) => {
  const tasks = filteredTasksSelector(state);
  const { tasksUIState } = state;
  return { tasks, tasksUIState };
};

const Tasks = ({
  tasks,
  tasksUIState,
  removeTask,
  toggleTaskState,
  inverseTaskTheme,
}) => {
  const handleRemoveTask = (id) => () => {
    removeTask(id);
  };

  const handleToggleTaskState = (id) => () => {
    toggleTaskState(id);
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
