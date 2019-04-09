/**
 * Wrapper around rc-pagination
 * See http://react-component.github.io/pagination
 * for full list of props and further documentation
 */
import React from 'react';
import PropTypes from 'prop-types';
import locale from 'rc-pagination/lib/locale/en_US';
import RCPagination from 'rc-pagination';

import './Pagination.scss';

const Pagination = ({
  className,
  pageSize,
  prevIcon,
  nextIcon,
  onChange,
  ...rest
}) => {
  const itemRender = (current, type, element) => {
    switch (type) {
      case 'prev':
        return prevIcon;
      case 'next':
        return nextIcon;
      default:
        return element;
    }
  };

  const handleOnChange = (pageNumber, _pageSize) => {
    onChange(pageNumber, _pageSize);
  };

  return (
    <RCPagination
      className={`pagination ${className || ''}`}
      itemRender={itemRender}
      locale={locale}
      pageSize={pageSize}
      hideOnSinglePage
      onChange={handleOnChange}
      {...rest}
    />
  );
};

Pagination.propTypes = {
  pageSize: PropTypes.number.isRequired,
  className: PropTypes.string,
  nextIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  prevIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onChange: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  className: undefined,
  nextIcon: 'Next',
  prevIcon: 'Prev',
};

export default Pagination;
