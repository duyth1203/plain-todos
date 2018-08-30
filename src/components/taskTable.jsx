import React, { Component } from 'react';
import NoTaskItem from './noTaskItem';
import TaskItem from './taskItem';

/* @prop: {
    + searchTxt: (String),
    + showByStatus: (Number),
    + sortOrder: (Boolean),
    + tasks: (Array),
    + onCloseTaskFrm: (f),
    + onDeleteTask: (f),
    + onEditTask: (f),
    + onToggleTaskStatus: (f)
  }
*/

class TaskTable extends Component {
  onCloseTaskFrm = () => {
    this.props.onCloseTaskFrm();
  };

  onDeleteTask = taskId => {
    this.props.onDeleteTask(taskId);
  };

  onEditTask = task => {
    this.props.onEditTask(task);
  };

  onToggleTaskStatus = taskId => {
    this.props.onToggleTaskStatus(taskId);
  };

  tasksFilter = (filters, tasks) =>
    tasks
      // filter by searchTxt
      .filter(
        task =>
          filters.searchTxt.length === 0 ||
          task.name.indexOf(filters.searchTxt) > -1
      )
      // filter by showByStatus
      .filter(
        task =>
          filters.showByStatus === -1 || task.status === filters.showByStatus
      )
      // sort by sortOrder
      .sort((_1, _2) => {
        const _1_name = _1.name.toLowerCase(),
          _2_name = _2.name.toLowerCase();
        return filters.sortOrder
          ? _1_name > _2_name
            ? 1
            : -1
          : _1_name < _2_name
            ? 1
            : -1;
      });

  render() {
    const { tasks } = this.props;
    const filters = {
      searchTxt: this.props.searchTxt,
      showByStatus: this.props.showByStatus,
      sortOrder: this.props.sortOrder
    };
    const taskItems =
      this.props.tasks.length > 0 ? (
        this.tasksFilter(filters, [...tasks]).map((task, index) => (
          <TaskItem
            key={task.id}
            index={index + 1}
            task={task}
            onCloseTaskFrm={this.onCloseTaskFrm}
            onDeleteTask={this.onDeleteTask}
            onEditTask={this.onEditTask}
            onToggleTaskStatus={this.onToggleTaskStatus}
          />
        ))
      ) : (
        <NoTaskItem />
      );

    return (
      <div className="table-responsive mt-15">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{taskItems}</tbody>
        </table>
      </div>
    );
  }
}

export default TaskTable;
