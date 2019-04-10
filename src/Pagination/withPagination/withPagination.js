import React, { Component } from 'react';

export const withPagination = WrappedComponent => {
  class PaginationState extends Component {
    constructor(props) {
      super(props);
      this.state = {
        currentPage: 1,
      };
    }

    handlePaginationClick = page => {
      this.setState({ currentPage: page });
    };

    render() {
      const { currentPage } = this.state;

      return (
        <WrappedComponent
          {...this.props}
          currentPage={currentPage}
          handlePaginationClick={this.handlePaginationClick}
        />
      );
    }
  }

  return PaginationState;
};

export default withPagination;
