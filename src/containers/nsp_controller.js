import { connect } from 'react-redux';
import AssignController from '../components/assign_controller';
import {
  assignMinNsp,
  assignMaxNsp,
  addNsp
} from '../actions/assigned_points';

const mapStateToProps = (state, ownProps) => {
  const { jobId, skillLineId } = ownProps;
  const assigned = state.assigned_points.details[jobId][skillLineId].nsp;
  const remained = state.owned_points[jobId].nsp - state.assigned_points.summaries[jobId].nsp;
  const assignedStyleClasses = ['assign-controller__indicator'];
  const remainedStyleClasses = ['assign-controller__indicator'];

  if (assigned > state.skill_simulator.skill_lines[skillLineId].max_points) {
    assignedStyleClasses.push('out-of-range');
  }
  if (remained < 0) {
    remainedStyleClasses.push('out-of-range');
  }
  return {
    assigned,
    remained,
    assignedStyleClasses: assignedStyleClasses.join(' '),
    remainedStyleClasses: remainedStyleClasses.join(' ')
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onMinAssignButtonClick: () => {
      dispatch(assignMinNsp(ownProps.jobId, ownProps.skillLineId));
    },
    onMaxAssignButtonClick: () => {
      dispatch(assignMaxNsp(ownProps.jobId, ownProps.skillLineId));
    },
    onAssignButtonClick: (addend) => {
      dispatch(addNsp(ownProps.jobId, ownProps.skillLineId, addend));
    }
  };
};

const NspControllerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignController);

export default NspControllerContainer;
