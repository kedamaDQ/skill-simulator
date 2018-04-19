import { connect } from 'react-redux';
import AssignController from '../components/assign_controller';
import { 
  assignMinMsp,
  assignMaxMsp,
  assignMsp
} from '../actions/assigned_points';

const mapStateToProps = (state, ownProps) => {
  return {
    assigned: ownProps.selfAssigned.msp,
    remained: ownProps.jobOwned.msp - ownProps.jobAssigned.msp
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onMinAssignButtonClick: () => {
      dispatch(assignMinMsp(ownProps));
    },
    onMaxAssignButtonClick: () => {
      dispatch(assignMaxMsp(ownProps));
    },
    onAssignButtonClick: (addend) => {
      dispatch(assignMsp(ownProps, addend));
    }
  };
};

const MspController = connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignController);

export default MspController;
