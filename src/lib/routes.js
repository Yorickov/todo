const host = '';

export default {
  tasksUrl: () => [host, 'tasks'].join('/'),
  taskIdUrl: (id) => [host, 'tasks', id].join('/'),
  taskUrl: () => [host, 'tasks'].join('/'),
};
