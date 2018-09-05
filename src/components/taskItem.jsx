import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import swal from 'sweetalert';

/* @prrop: {
    + index: (Number),
    + task: {
      id: (String),
      name: (String),
      status: (Number)
    },
    + onCloseTaskForm: (f),
    + onDeleteTask: (f),
    + onOpenTaskForm: (f),
    + onToggleTaskStatus: (f)
  }
*/

class TaskItem extends Component {
  onDeleteTask = () => {
    swal({
      title: 'Are you sure?',
      text: "Once deleted, you won't be able to recover this task!",
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      willDelete && this.props.onDeleteTask(this.props.task.id);
    });
  };

  onEditTask = () => {
    this.props.onOpenTaskForm(this.props.task);
  };

  onToggleTaskStatus = () => {
    const { task } = this.props;
    this.props.onToggleTaskStatus({
      ...task,
      status: Math.abs(+task.status - 1)
    });
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
              <span className="label label-default">INACTIVE</span>
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

const mapDispatchToProps = dispatch => ({
  onCloseTaskForm: () => {
    dispatch(actions.closeTaskForm());
  },
  onDeleteTask: taskId => {
    dispatch(actions.deleteTask(taskId));
  },
  onOpenTaskForm: task => {
    dispatch(actions.openTaskForm(task));
  },
  onToggleTaskStatus: task => {
    dispatch(actions.saveTask(task));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(TaskItem);
