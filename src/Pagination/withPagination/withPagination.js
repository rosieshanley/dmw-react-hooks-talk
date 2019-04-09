import React, { Component } from 'react';
import { string, shape } from 'prop-types';

export const withPagination = WrappedComponent => {
  class PaginationState extends Component {
    constructor(props) {
      super(props);
      this.state = {
        currentPage: 1,
      };
    }

    componentDidUpdate = prevProps => {
      const { field: prevField } = prevProps.sort;
      const {
        sort: { field },
      } = this.props;

      if (prevField !== field) {
        this.setState({ currentPage: 1 });
      }
    };

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

  PaginationState.propTypes = {
    sort: shape({
      field: string,
    }).isRequired,
  };

  return PaginationState;
};

export default withPagination;
