import React from 'react';

const AssignControllerIndicator = (props) => {
  return(
    <dl className='assign-controller__indicator'>
      <dt>{props.label}</dt>
      <dd>{props.value}</dd>
    </dl>
  );
};

export default AssignControllerIndicator;
