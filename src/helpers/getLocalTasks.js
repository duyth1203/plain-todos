const getLocalTasks = () =>
  localStorage && localStorage.getItem('tasks')
    ? JSON.parse(localStorage.getItem('tasks'))
    : [];

export default getLocalTasks;
