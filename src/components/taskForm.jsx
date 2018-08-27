import React, { Component } from 'react';

/* @props: {
    + task: {
      id: (String), // indicate if panel's title is 'Create task' or 'Update task'
      name: (String),
      status: (Number)
    },
    + onCloseTaskFrm: (f),
    + onDeleteTask: (f),
    + onSubmitTaskFrm: (f)
  }
*/

class TaskForm extends Component {
  constructor() {
    super();
    this.refTaskName = React.createRef();
    this.refTaskStatus = React.createRef();
  }

  componentDidMount() {
    this.refTaskName.current.focus();
    this.refTaskName.current.value = this.props.task.name;
    this.refTaskStatus.current.value = this.props.task.status;
  }

  onCloseTaskFrm = () => {
    this.props.onCloseTaskFrm();
  };

  onDeleteTask = () => {
    this.props.onDeleteTask(this.props.task.id);
    this.props.onCloseTaskFrm();
  };

  onSubmitTaskFrm = e => {
    e.preventDefault();
    const task = {
      id: this.props.task.id,
      name: this.refTaskName.current.value,
      status: +this.refTaskStatus.current.value
    };
    this.props.onSubmitTaskFrm(task);
    this.props.onCloseTaskFrm();
  };

  render() {
    const style = {
      display: 'block',
      width: '100%'
    };

    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title" style={{ display: 'inline-block' }}>
            {this.props.task.id === undefined ? 'Create task' : 'Update task'}
          </h3>
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            onClick={this.props.onCloseTaskFrm}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <form
          id="taskForm"
          name="taskForm"
          className="panel-body"
          onSubmit={this.onSubmitTaskFrm}
        >
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            id="taskName"
            placeholder="Name"
            ref={this.refTaskName}
            required="required"
            style={style}
          />

          <label className="mt-15">Status</label>
          <select
            name="taskStatus"
            id="inputTaskStatus"
            className="form-control"
            ref={this.refTaskStatus}
            required="required"
            style={style}
          >
            <option value="1">ACTIVE</option>
            <option value="0">INACTIVE</option>
          </select>

          <hr />

          <button
            type="submit"
            className="btn btn-success"
            style={style}
            onClick={this.onSubmitTaskFrm}
          >
            Submit
          </button>
          <button
            type="button"
            className="btn btn-danger mt-15"
            style={style}
            onClick={this.onDeleteTask}
          >
            Delete
          </button>
        </form>
      </div>
    );
  }
}

export default TaskForm;
