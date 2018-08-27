import React, { Component } from 'react';

/* @prrop: {
    + index: (Number),
    + task: {
      id: (String),
      name: (String),
      status: (Number)
    },
    + onCloseTaskFrm: (f),
    + onDeleteTask: (f),
    + onEditTask: (f),
    + onToggleTaskStatus: (f)
  }
*/

class TaskItem extends Component {
  onDeleteTask = () => {
    this.props.onDeleteTask(this.props.task.id);
    this.props.onCloseTaskFrm();
  };

  onEditTask = () => {
    this.props.onEditTask(this.props.task);
  };

  onToggleTaskStatus = () => {
    this.props.onToggleTaskStatus(this.props.task.id);
  };

  render() {
    return (
      <tr>
        <td width="5%">{this.props.index}</td>
        <td width="55%">{this.props.task.name}</td>
        <td width="15%">
          <button
            type="button"
            className="btn btn-zero"
            onClick={this.onToggleTaskStatus}
          >
            {this.props.task.status === 1 ? (
              <span className="label label-success">ACTIVE</span>
            ) : (
              <span className="label label-danger">INACTIVE</span>
            )}
          </button>
        </td>
        <td>
          <button
            type="button"
            className="btn btn-default"
            onClick={this.onEditTask}
          >
            <span className="glyphicon glyphicon-pencil" />
          </button>
          <button
            type="button"
            className="btn btn-danger ml-10"
            onClick={this.onDeleteTask}
          >
            <span className="glyphicon glyphicon-trash" />
          </button>
        </td>
      </tr>
    );
  }
}

export default TaskItem;
