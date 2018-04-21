import { connect } from 'react-redux';
import AssignController from '../components/assign_controller';
import { 
  assignMinMsp,
  assignMaxMsp,
  addMsp
} from '../actions/assigned_points';

const mapStateToProps = (state, ownProps) => {
  const { jobId, skillLineId } = ownProps;
  return {
    assigned: state.assigned_points.details[jobId][skillLineId].msp,
    remained: state.owned_points[jobId].msp - state.assigned_points.summaries[jobId].msp,
    assignedStyleClasses: 'assign-controller__indicator',
    remainedStyleClasses: 'assign-controller__indicator',
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onMinAssignButtonClick: () => {
      dispatch(assignMinMsp(ownProps.jobId, ownProps.skillLineId));
    },
    onMaxAssignButtonClick: () => {
      dispatch(assignMaxMsp(ownProps.jobId, ownProps.skillLineId));
    },
    onAssignButtonClick: (addend) => {
      dispatch(addMsp(ownProps.jobId, ownProps.skillLineId, addend));
    }
  };
};

const MspController = connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignController);

export default MspController;
