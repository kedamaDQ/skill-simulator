import React from 'react';
import PropTypes from 'prop-types';

const AssignControllerIndicator = (props) => {
  return(
    <dl className='assign-controller__indicator'>
      <dt>{props.label}</dt>
      <dd>{props.value}</dd>
    </dl>
  );
};

AssignControllerIndicator.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
};

export default AssignControllerIndicator;
