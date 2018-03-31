import React from 'react';
import PropTypes from 'prop-types';

const Selector = (props) => {

  const handleClick = (item) => {
    if (item.isClickable) {
      props.onClick(props.ownerJobs, item.value);
    }
  };

  const renderItems = () => {
    const items = [];
    props.items.forEach((item) => {
      items.push(
        <li
          className={item.styleClasses}
          key={item.key}
          onClick={() => handleClick(item)}
        >{
          item.display
        }</li>
      )
    });
    return items;
  };

  return(
    <ul className='selector'>
    { renderItems() }
    </ul>
  );
}

Selector.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.number.isRequired,
    display: PropTypes.element.isRequired,
    value: PropTypes.number.isRequired,
    styleClasses: PropTypes.string.isRequired,
    isClickable: PropTypes.bool.isRequired
  }).isRequired).isRequired,
  onClick: PropTypes.func.isRequired
};

export default Selector;
