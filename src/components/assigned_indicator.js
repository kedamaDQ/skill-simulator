import React from 'react';
import PropTypes from 'prop-types';

const AssignedIndicator = (props) => {

  return(
    <dl className={props.styleClasses}>
      <dt className='header'>{props.display}</dt>
      <dd>
        <span className={props.numeratorStyleClasses}>{props.numerator}</span>
        <span className={props.denominatorStyleClasses}>/ {props.denominator}</span>
      </dd>
    </dl>
  );
};

AssignedIndicator.propTypes = {
  display: PropTypes.string.isRequired,
  numerator: PropTypes.number.isRequired,
  denominator: PropTypes.number.isRequired,
  styleClasses: PropTypes.string.isRequired,
  numeratorStyleClasses: PropTypes.string.isRequired,
  denominatorStyleClasses: PropTypes.string.isRequired
};

export default AssignedIndicator;
