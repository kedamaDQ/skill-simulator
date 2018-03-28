import React from 'react';
import PropTypes from 'prop-types';
import AssignControllerButton from './assign_controller_button';
import AssignControllerIndicator from './assign_controller_indicator';

export const ASSIGN_MAX = 9999;
export const ASSIGN_MIN = -9999;

const AssignController = (props) => {

  const handleClick = (change) => {
    props.onClick && props.onClick(change);
  }

  return(
    <div className='assign-controller'>
      <div className='assign-controller__indicator-outer'>
        <div className='assign-controller__title'>{props.display}</div>
        <AssignControllerIndicator
          label={'使用'}
          value={props.assigned}
        />
        <AssignControllerIndicator
          label={'残り'}
          value={props.remained}
        />
      </div>
      <div className='assign-controller__buttons-outer'>
        <AssignControllerButton
          value={ASSIGN_MIN}
          display='全消'
          onClick={handleClick}
          styleClasses={props.buttonStyleClasses}
        />
        <AssignControllerButton
          value={-10}
          display='-10'
          onClick={handleClick}
          styleClasses={props.buttonStyleClasses}
        />
        <AssignControllerButton
          value={-1}
          display='-1'
          onClick={handleClick}
          styleClasses={props.buttonStyleClasses}
        />
        <AssignControllerButton
          value={1}
          display='+1'
          onClick={handleClick}
          styleClasses={props.buttonStyleClasses}
        />
        <AssignControllerButton
          value={10}
          display='+10'
          onClick={handleClick}
          styleClasses={props.buttonStyleClasses}
        />
        <AssignControllerButton
          value={ASSIGN_MAX}
          display='全振'
          onClick={handleClick}
          styleClasses={props.buttonStyleClasses}
        />
      </div>
    </div>
  );
};

AssignController.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  skillLine: PropTypes.shape({
    id: PropTypes.string.isRequired,
    max_points: PropTypes.number.isRequired
  }).isRequired,
  selfAssigned: PropTypes.shape({
    nsp: PropTypes.number.isRequired,
    msp: PropTypes.number.isRequired
  }).isRequired,
  skillTotalAssigned: PropTypes.shape({
    nsp: PropTypes.number.isRequired,
    msp: PropTypes.number.isRequired
  }).isRequired,
  jobOwned: PropTypes.shape({
    nsp: PropTypes.number.isRequired,
    msp: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
  }).isRequired,
  jobAssigned: PropTypes.shape({
    nsp: PropTypes.number.isRequired,
    msp: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
};

export default AssignController;
