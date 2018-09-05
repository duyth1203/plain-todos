import React, { Component } from 'react';
import './App.css';
import Controller from './components/controller';
import TaskForm from './components/taskForm';
import TaskTable from './components/taskTable';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    const { taskForm } = this.props;

    return (
      <div className="App container-fluid">
        <h1>Plain Todos</h1>
        <hr />

        {taskForm.formDisplayed && (
          <div className={'col-md-4 col-lg-4'}>
            <TaskForm />
          </div>
        )}

        <div
          className={
            taskForm.formDisplayed ? 'col-md-8 col-lg-8' : 'col-md-12 col-lg-12'
          }
        >
          <Controller />
          <hr />
          <TaskTable />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ taskForm: state.taskForm });

export default connect(mapStateToProps)(App);
