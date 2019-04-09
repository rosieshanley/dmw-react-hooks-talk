import React from 'react';
import { shallow } from 'enzyme';
import RCPagination from 'rc-pagination';
import Pagination from './Pagination';

describe('/shared/ui/Pagination', () => {
  const props = {
    total: 100,
    onChange: () => {},
    pageSize: 10,
  };

  let pagination;

  const generateWrapper = () => {
    pagination = shallow(<Pagination {...props} />);
  };

  beforeEach(() => {
    generateWrapper();
  });

  it('should render an rc-pagination component', () => {
    expect(pagination.find(RCPagination)).toExist();
    expect(pagination.find('.pagination')).toExist();
  });

  it('should have correct prev/next links', () => {
    expect(
      pagination
        .dive()
        .find('.rc-pagination-prev')
        .text()
    ).toEqual('Prev');

    expect(
      pagination
        .dive()
        .find('.rc-pagination-next')
        .text()
    ).toEqual('Next');
  });

  describe('.onChange() event', () => {
    const getOnChangeMethod = () => {
      const rCPaginationEl = pagination.find(RCPagination);
      return rCPaginationEl.props().onChange;
    };

    it('should correctly call passed-in onChange()', async () => {
      props.onChange = jest.fn();
      generateWrapper();
      const onChangeMethod = getOnChangeMethod();
      const pageNumber = 5;
      const pageSize = 42;
      await onChangeMethod(pageNumber, pageSize);
      expect(props.onChange).toHaveBeenCalledWith(pageNumber, pageSize);
    });
  });
});
