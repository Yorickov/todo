export default class {
  tasks = [];

  all() {
    return this.tasks;
  }

  save(task) {
    this.tasks.push(task);
    return task;
  }

  toggle(id) {
    this.tasks = this.tasks.map((task) => {
      if (task.id === id) {
        const newState = task.state === 'active' ? 'finished' : 'active';
        task.state = newState;
        return task;
      }
      return task;
    });
  }

  destroy(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
