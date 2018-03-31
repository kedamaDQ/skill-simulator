import React from 'react';
import PropTypes from 'prop-types';

const AssignButton = (props) => {

  const handleClick = () => {
    props.onClick && props.onClick(props.value);
  };

  return(
    <button
      className={`assign-controller__assign-button ${props.styleClasses}`}
      onClick={handleClick}
    >
      {props.display}
    </button>
  );
};

AssignButton.propTypes = {
  value: PropTypes.number.isRequired,
  display: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default AssignButton;
