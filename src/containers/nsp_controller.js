import { connect } from 'react-redux';
import AssignController from '../components/assign_controller';
import {
  assignMinNsp,
  assignMaxNsp,
  assignNsp
} from '../actions/assigned_points';

const mapStateToProps = (state, ownProps) => {
  return {
    assigned: ownProps.selfAssigned.nsp,
    remained: ownProps.jobOwned.nsp - ownProps.jobAssigned.nsp
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onMinAssignButtonClick: () => {
      dispatch(assignMinNsp(ownProps));
    },
    onMaxAssignButtonClick: () => {
      dispatch(assignMaxNsp(ownProps));
    },
    onAssignButtonClick: (addend) => {
      dispatch(assignNsp(ownProps, addend));
    }
  };
};

const NspControllerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignController);

export default NspControllerContainer;
