import React from 'react';
import PropTypes from 'prop-types';

const SpTableHeaderPanel = (props) => {

  const handleClick = () => {
    props.onClick && props.onClick(props.id);
  }

  const {display, styleClasses} = props;
  return(
    <div
      className={ `skill-point-table__header-panel ${styleClasses}` }
      onClick={ handleClick }
    >{
      display
    }</div>
  );
}

SpTableHeaderPanel.propTypes = {
  id: PropTypes.string.isRequired,
  styleClasses: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default SpTableHeaderPanel;
