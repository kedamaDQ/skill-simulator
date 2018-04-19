import React from 'react';
import PropTypes from 'prop-types';
import AssignControllerButton from './assign_controller_button';
import AssignControllerIndicator from './assign_controller_indicator';

const AssignController = (props) => {

  const handleMinAssignButtonClick = () => {
    props.onMinAssignButtonClick && props.onMinAssignButtonClick();
  };

  const handleMaxAssignButtonClick = () => {
    props.onMaxAssignButtonClick && props.onMaxAssignButtonClick();
  };

  const handleAssignButtonClick = (change) => {
    props.onAssignButtonClick && props.onAssignButtonClick(change);
  };

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
          value={0}
          display='全消'
          onClick={handleMinAssignButtonClick}
          styleClasses={props.buttonStyleClasses}
        />
        <AssignControllerButton
          value={-10}
          display='-10'
          onClick={handleAssignButtonClick}
          styleClasses={props.buttonStyleClasses}
        />
        <AssignControllerButton
          value={-1}
          display='-1'
          onClick={handleAssignButtonClick}
          styleClasses={props.buttonStyleClasses}
        />
        <AssignControllerButton
          value={1}
          display='+1'
          onClick={handleAssignButtonClick}
          styleClasses={props.buttonStyleClasses}
        />
        <AssignControllerButton
          value={10}
          display='+10'
          onClick={handleAssignButtonClick}
          styleClasses={props.buttonStyleClasses}
        />
        <AssignControllerButton
          value={0}
          display='全振'
          onClick={handleMaxAssignButtonClick}
          styleClasses={props.buttonStyleClasses}
        />
      </div>
    </div>
  );
};

AssignController.propTypes = {
  jobId: PropTypes.string.isRequired,
  skillLineId: PropTypes.string.isRequired,
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
  onMinAssignButtonClick: PropTypes.func.isRequired,
  onMaxAssignButtonClick: PropTypes.func.isRequired,
  onAssignButtonClick: PropTypes.func.isRequired
};

export default AssignController;
