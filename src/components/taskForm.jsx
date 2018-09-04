import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';

/* @props: {
    + taskForm: {
      + formContent: {
        id: (String), // indicate if panel's title is 'Create task' or 'Update task'
        name: (String),
        status: (Number)
      },
      + formDisplayed: (Boolean)
    },
    + onCloseTaskForm: (f),
    + onDeleteTask: (f),
    + onSaveTask: (f)
  }
*/

class TaskForm extends Component {
  constructor() {
    super();
    this.refTaskName = React.createRef();
    this.refTaskStatus = React.createRef();
  }

  fillTaskForm = () => {
    this.refTaskName.current.value = this.props.taskForm.formContent.name;
    this.refTaskStatus.current.value = this.props.taskForm.formContent.status;
  };

  componentDidMount() {
    this.refTaskName.current.focus();
    this.fillTaskForm();
  }

  componentDidUpdate() {
    this.fillTaskForm();
  }

  onCloseTaskForm = () => {
    this.props.onCloseTaskForm();
  };

  onDeleteTask = () => {
    this.props.onDeleteTask(this.props.taskForm.formContent.id);
    this.props.onCloseTaskForm();
  };

  onSaveTask = e => {
    e.preventDefault();
    const task = {
      id: this.props.taskForm.formContent.id,
      name: this.refTaskName.current.value,
      status: +this.refTaskStatus.current.value
    };
    this.props.onSaveTask(task);
    this.props.onCloseTaskForm();
  };

  render() {
    const style = {
      display: 'block',
      width: '100%'
    };

    const { formContent } = this.props.taskForm;

    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title" style={{ display: 'inline-block' }}>
            {formContent.id === undefined ? 'Create task' : 'Update task'}
          </h3>
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            onClick={this.onCloseTaskForm}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <form
          id="taskForm"
          name="taskForm"
          className="panel-body"
          onSubmit={this.onSaveTask}
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
            onClick={this.onSaveTask}
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

const mapStateToProps = state => ({ taskForm: state.taskForm });

const mapDispatchToProps = dispatch => ({
  onCloseTaskForm: () => {
    dispatch(actions.closeTaskForm());
  },
  onDeleteTask: taskId => {
    dispatch(actions.deleteTask(taskId));
  },
  onSaveTask: task => {
    dispatch(actions.saveTask(task));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskForm);
