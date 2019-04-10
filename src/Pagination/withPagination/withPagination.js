import React, { Component } from 'react';

export const withPagination = WrappedComponent => {
  class PaginationState extends Component {
    constructor(props) {
      super(props);
      this.state = {
        currentPage: 1,
        sortField: 'datetime',
      };
    }

    componentDidUpdate = (prevProps, prevState) => {
      if (prevState.sortField !== this.state.sortField) {
        this.setState({ currentPage: 1 });
      }
    };

    updateSort = sortField => {
      this.setState({ sortField });
    };

    handlePaginationClick = page => {
      this.setState({ currentPage: page });
    };

    render() {
      const { sortField, currentPage } = this.state;

      return (
        <WrappedComponent
          {...this.props}
          sortField={sortField}
          currentPage={currentPage}
          updateSort={this.updateSort}
          handlePaginationClick={this.handlePaginationClick}
        />
      );
    }
  }

  return PaginationState;
};

export default withPagination;
