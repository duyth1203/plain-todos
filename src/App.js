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
      showByStatus: -1, // -1: all, 1: active, 0: inactive
      sortOrder: true, // true: sort -> asc, false -> sort: dsc
      tasks: []
    };
  }

  componentDidMount() {
    this.handleShowTasks();
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

  handleSaveTask = task => {
    const tasks = this.getLocalTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.handleShowTasks();
  };

  handleShowByStatus = showByStatus => {
    this.setState({ showByStatus: showByStatus }, () => {
      this.handleShowTasks();
    });
  };

  handleShowTasks = searchTxt => {
    let tasks = this.getLocalTasks();
    const { showByStatus, sortOrder } = this.state;
    // handle showing by status
    showByStatus !== -1 &&
      (tasks = tasks.filter(task => task.status === showByStatus));
    // handle searching
    searchTxt !== undefined &&
      searchTxt.length > 0 &&
      (tasks = tasks.filter(
        task => task.name.toLowerCase().indexOf(searchTxt) !== -1
      ));
    // handle sorting
    tasks.sort((_1, _2) => {
      const _1_name = _1.name.toLowerCase(),
        _2_name = _2.name.toLowerCase();
      return sortOrder
        ? _1_name > _2_name
          ? 1
          : -1
        : _1_name < _2_name
          ? 1
          : -1;
    });
    // return results
    this.setState({ tasks: tasks });
  };

  handleSortTask = sortOrder => {
    this.setState({ sortOrder: sortOrder }, () => {
      this.handleShowTasks();
    });
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
            onSearchTask={this.handleShowTasks}
            onShowByStatus={this.handleShowByStatus}
            onSort={this.handleSortTask}
          />
          <TaskTable
            tasks={tasks}
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
