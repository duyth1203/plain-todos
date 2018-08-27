import React, { Component } from 'react';
import NoTaskItem from './noTaskItem';
import TaskItem from './taskItem';

/* @prop: {
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

  render() {
    const taskItems =
      this.props.tasks.length > 0 ? (
        this.props.tasks.map((task, index) => (
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
