import React, { Component } from 'react';

/* @prop: {
    + showByStatus: (Number),
    + sortOrder: (Boolean),
    + onOpenTaskFrm: (f),
    + onSearchTask: (f),
    + onShowByStatus: (f),
    + onSort: (f)
  }
*/

class Controller extends Component {
  constructor() {
    super();
    this.refTaskSearch = React.createRef();
  }

  componentDidMount() {
    this.refTaskSearch.current.focus();
  }

  onOpenTaskFrm = () => {
    this.props.onOpenTaskFrm();
  };

  onSearchTask = () => {
    const searchTxt = this.refTaskSearch.current.value.trim().toLowerCase();
    searchTxt.length > 0 && this.props.onSearchTask(searchTxt);
  };

  onShowByStatus = showByStatus => {
    this.props.onShowByStatus(showByStatus);
  };

  onSort = sortOrder => {
    this.props.onSort(sortOrder);
  };

  render() {
    return (
      <div>
        <div className="row col-md-4 col-lg-4">
          {/* New Task button */}
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 pl-0">
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={this.onOpenTaskFrm}
            >
              <span className="glyphicon glyphicon-plus" aria-hidden="true" />
              &nbsp;New
            </button>
          </div>

          {/* Sort button */}
          <div className="btn-group col-xs-6 col-sm-6 col-md-6 col-lg-6 pl-0">
            <button
              type="button"
              className="btn btn-active dropdown-toggle w-100"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="glyphicon glyphicon-sort" aria-hidden="true" />
              &nbsp;Sort&nbsp;
              <span className="caret" />
            </button>
            <ul className="dropdown-menu p-10">
              <li>
                <button className="btn-zero" onClick={() => this.onSort(true)}>
                  <span
                    className="glyphicon glyphicon-sort-by-alphabet"
                    aria-hidden="true"
                  />
                  A&nbsp;
                  <span
                    className="glyphicon glyphicon-arrow-right"
                    aria-hidden="true"
                  />
                  &nbsp;Z&nbsp;
                  <span
                    className={
                      this.props.sortOrder === true
                        ? 'glyphicon glyphicon-ok'
                        : 'hidden'
                    }
                    aria-hidden="true"
                  />
                </button>
              </li>
              <li>
                <button className="btn-zero" onClick={() => this.onSort(false)}>
                  <span
                    className="glyphicon glyphicon-sort-by-alphabet-alt"
                    aria-hidden="true"
                  />
                  Z&nbsp;
                  <span
                    className="glyphicon glyphicon-arrow-right"
                    aria-hidden="true"
                  />
                  &nbsp;A&nbsp;
                  <span
                    className={
                      this.props.sortOrder === false
                        ? 'glyphicon glyphicon-ok'
                        : 'hidden'
                    }
                    aria-hidden="true"
                  />
                </button>
              </li>
              <li className="divider" />
              <li>
                <button
                  className="btn-zero"
                  onClick={() => this.onShowByStatus(-1)}
                >
                  <span className="label label-primary">ALL</span>
                  &nbsp;&nbsp;
                  <span
                    className={
                      +this.props.showByStatus === -1
                        ? 'glyphicon glyphicon-ok'
                        : 'hidden'
                    }
                    aria-hidden="true"
                  />
                </button>
              </li>
              <li>
                <button
                  className="btn-zero"
                  onClick={() => this.onShowByStatus(1)}
                >
                  <span className="label label-success">ACTIVE</span>
                  &nbsp;&nbsp;
                  <span
                    className={
                      +this.props.showByStatus === 1
                        ? 'glyphicon glyphicon-ok'
                        : 'hidden'
                    }
                    aria-hidden="true"
                  />
                </button>
              </li>
              <li>
                <button
                  className="btn-zero"
                  onClick={() => this.onShowByStatus(0)}
                >
                  <span className="label label-default">INACTIVE</span>
                  &nbsp;&nbsp;
                  <span
                    className={
                      +this.props.showByStatus === 0
                        ? 'glyphicon glyphicon-ok'
                        : 'hidden'
                    }
                    aria-hidden="true"
                  />
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Search field */}
        <div className="col-md-8 col-lg-8 input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Type in task name..."
            ref={this.refTaskSearch}
          />
          <span className="input-group-btn">
            <button
              type="button"
              className="btn btn-default"
              onClick={this.onSearchTask}
            >
              <span className="glyphicon glyphicon-search" aria-hidden="true" />
              &nbsp;Search
            </button>
          </span>
        </div>
      </div>
    );
  }
}

export default Controller;
