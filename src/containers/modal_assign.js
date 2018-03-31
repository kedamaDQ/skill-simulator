import { connect } from 'react-redux';
import ModalAssign from '../components/modal_assign';
import { updateAssigned } from '../actions/assigned_points';
//import { closeModal } from '../actions/modal';

const mapStateToProps = (state, ownProps) => {
  const { jobId, skillLineId } = ownProps;
  return {
    job: state.jobs[jobId],
    skillLine: state.skill_lines[skillLineId],
    selfAssigned: state.assigned_points.details[jobId][skillLineId],
    skillTotalAssigned: state.assigned_points.summaries[skillLineId],
    jobOwned: state.owned_points[jobId],
    jobAssigned: state.assigned_points.summaries[jobId],
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSelectorClick: (assigned) => {
      dispatch(updateAssigned(ownProps.jobId, ownProps.skillLineId, assigned));
//      dispatch(closeModal());
    }
  };
};

const ModalAssignContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalAssign);

export default ModalAssignContainer;
