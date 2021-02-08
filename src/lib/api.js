import TaskRepository from './TaskRepository';

const tasks = new TaskRepository();

export default {
  get(url) {
    switch (url) {
      case '/tasks':
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ data: tasks.all() });
          }, 200);
        });
      default:
        return Promise.reject(new Error(`${url} is not correct address`));
    }
  },
  post(url, params = {}) {
    switch (url) {
      case '/tasks':
        return new Promise((resolve) => {
          setTimeout(() => {
            const task = tasks.save(params.body);
            resolve({ data: task });
          }, 200);
        });
      default:
        return Promise.reject(new Error(`${url} is not correct address`));
    }
  },
  delete(url) {
    const match = url.match(/tasks\/(.+)/);
    if (match) {
      return new Promise((resolve) => {
        setTimeout(() => {
          tasks.destroy(match[1]);
          resolve({});
        }, 200);
      });
    }
    return Promise.reject(new Error(`${url} is not correct address`));
  },
  patch(url) {
    const match = url.match(/tasks\/(.+)/);
    if (match) {
      return new Promise((resolve) => {
        setTimeout(() => {
          tasks.toggle(match[1]);
          resolve({});
        }, 200);
      });
    }
    return Promise.reject(new Error(`${url} is not correct address`));
  },
};
