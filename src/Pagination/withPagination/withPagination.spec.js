import React from 'react';
import { shallow } from 'enzyme';
import { withPagination } from './withPagination';

describe('withPagination', () => {
  let props;
  let wrapper;
  let component;
  let WrappedComponent;
  const initialSort = {
    field: 'productName',
  };

  beforeEach(() => {
    component = () => <div className="test" />;
    WrappedComponent = withPagination(component);
    props = {
      handlePaginationClick: jest.fn(),
      sort: { field: 'productName' },
    };
    wrapper = shallow(<WrappedComponent {...props} />);
  });

  it('renders the wrapped component with the correct props and initial state', () => {
    expect(wrapper.find(component)).toExist();
    expect(wrapper.find(component).props().handlePaginationClick).toBeDefined();
    expect(wrapper.state().currentPage).toEqual(1);
  });

  it('updates the current page state on handlePaginationClick', () => {
    expect(wrapper.state().currentPage).toEqual(1);
    wrapper
      .find(component)
      .props()
      .handlePaginationClick(4);
    expect(wrapper.state().currentPage).toEqual(4);
  });

  it('resets the current page to 1 on copmponentDidUpdate when the sort field changes', () => {
    const instance = wrapper.instance();
    instance.setState({ currentPage: 2 });
    expect(wrapper.state().currentPage).toEqual(2);
    instance.props.sort.field = 'invoiceDate';
    instance.componentDidUpdate({ sort: initialSort });
    expect(wrapper.state().currentPage).toEqual(1);
  });
});
