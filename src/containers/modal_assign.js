import { connect } from 'react-redux';
import ModalAssign from '../components/modal_assign';
import { updateAssigned } from '../actions/assigned_points';
//import { closeModal } from '../actions/modal';

const mapStateToProps = (state, ownProps) => {
  const { job, skillLine } = ownProps;
  return {
    job,
    skillLine,
    selfAssigned: state.assigned_points.details[job.id][skillLine.id],
    skillTotalAssigned: state.assigned_points.summaries[skillLine.id],
    jobOwned: state.owned_points[job.id],
    jobAssigned: state.assigned_points.summaries[job.id],
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange: (jobId, skillLineId, assigned) => {
      dispatch(updateAssigned(jobId, skillLineId, assigned));
//      dispatch(closeModal());
    }
  };
};

const ModalAssignContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalAssign);

export default ModalAssignContainer;
