import React, { Component } from 'react';
import NoTaskItem from './noTaskItem';
import TaskItem from './taskItem';
import { connect } from 'react-redux';

/* @prop: {
    + searchTxt: (String),
    + showByStatus: (Number),
    + sortOrder: (Boolean),
    + tasks: (Array)
  }
*/

class TaskTable extends Component {
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
    const { tasks, filters } = this.props;
    const taskItems =
      tasks.length > 0 ? (
        this.tasksFilter(filters, tasks).map((task, index) => (
          <TaskItem key={task.id} index={index + 1} task={task} />
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

const mapStateToProps = state => ({
  tasks: state.tasks,
  filters: state.filters
});

export default connect(mapStateToProps)(TaskTable);
