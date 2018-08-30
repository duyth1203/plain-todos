import React, { Component } from 'react';
import './App.css';
import Controller from './components/controller';
import TaskForm from './components/taskForm';
import TaskTable from './components/taskTable';

class App extends Component {
  constructor() {
    super();
    this.state = {
      formContent: {
        id: undefined,
        name: '',
        status: 1
      },
      formDisplayed: false,
      searchTxt: '',
      showByStatus: -1, // -1: all, 1: active, 0: inactive
      sortOrder: true, // true: sort -> asc, false -> sort: dsc
      tasks: []
    };
  }

  getLocalTasks = () =>
    localStorage && localStorage.getItem('tasks')
      ? JSON.parse(localStorage.getItem('tasks'))
      : [];

  // used to generate task id
  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  idGenerator() {
    return `${this.s4()}-${this.s4()}-${this.s4()}-${this.s4()}-${this.s4()}-${this.s4()}`;
  }

  componentDidMount() {
    this.setState({ tasks: this.getLocalTasks() });
  }

  handleCloseTaskFrm = () => {
    this.setState({ formDisplayed: false });
  };

  handleDeleteTask = taskId => {
    if (taskId !== undefined) {
      const tasks = this.getLocalTasks();
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === taskId) {
          tasks.splice(i, 1);
          localStorage.setItem('tasks', JSON.stringify(tasks));
          this.setState({ tasks: tasks });
          break;
        }
      }
    }
  };

  handleOpenTaskFrm = task => {
    // close first to unmount the form
    this.setState({ formDisplayed: false }, () => {
      this.setState({
        formDisplayed: true,
        formContent:
          task === undefined
            ? {
                id: undefined,
                name: '',
                status: 1
              }
            : task
      });
    });
  };

  handleResetFilters = () => {
    this.setState({
      searchTxt: '',
      showByStatus: -1,
      sortOrder: true
    });
  };

  handleSaveTask = task => {
    const tasks = this.getLocalTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.setState({ tasks: tasks });
  };

  handleSearchTasks = searchTxt => {
    this.setState({ searchTxt: searchTxt });
  };

  handleShowTasksByStatus = showByStatus => {
    this.setState({ showByStatus: showByStatus });
  };

  handleSortTasks = sortOrder => {
    this.setState({ sortOrder: sortOrder });
  };

  handleSubmitTaskFrm = task => {
    task.id === undefined
      ? (task.id = this.idGenerator())
      : this.handleDeleteTask(task.id);
    this.handleSaveTask(task);
  };

  handleToggleTaskStatus = taskId => {
    const findTaskById = task => taskId === task.id;
    const task = this.state.tasks.find(findTaskById);
    task.status = Math.abs(+task.status - 1);
    this.handleSubmitTaskFrm(task);
  };

  render() {
    const {
      tasks,
      formContent,
      formDisplayed,
      searchTxt,
      showByStatus,
      sortOrder
    } = this.state;

    return (
      <div className="App container-fluid">
        <h1>Plain Todos</h1>
        <hr />

        {formDisplayed && (
          <div className={'col-xs-12 col-sm-12 col-md-4 col-lg-4'}>
            <TaskForm
              task={formContent}
              onCloseTaskFrm={this.handleCloseTaskFrm}
              onDeleteTask={this.handleDeleteTask}
              onSubmitTaskFrm={this.handleSubmitTaskFrm}
            />
          </div>
        )}

        <div
          className={
            formDisplayed
              ? 'col-xs-12 col-sm-12 col-md-8 col-lg-8'
              : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'
          }
        >
          <Controller
            showByStatus={showByStatus}
            sortOrder={sortOrder}
            onOpenTaskFrm={this.handleOpenTaskFrm}
            onResetFilters={this.handleResetFilters}
            onSearchTasks={this.handleSearchTasks}
            onShowTasksByStatus={this.handleShowTasksByStatus}
            onSortTasks={this.handleSortTasks}
          />
          <TaskTable
            tasks={tasks}
            searchTxt={searchTxt}
            showByStatus={showByStatus}
            sortOrder={sortOrder}
            onCloseTaskFrm={this.handleCloseTaskFrm}
            onDeleteTask={this.handleDeleteTask}
            onEditTask={this.handleOpenTaskFrm}
            onToggleTaskStatus={this.handleToggleTaskStatus}
          />
        </div>
      </div>
    );
  }
}

export default App;
