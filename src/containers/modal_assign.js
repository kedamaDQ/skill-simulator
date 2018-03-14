import { connect } from 'react-redux';
import ModalAssign from '../components/modal_assign';
import { updateAssignedPoints } from '../actions/assigned_points';
//import { closeModal } from '../actions/modal';

const mapStateToProps = (state, ownProps) => {
  const {job, skillLine} = ownProps;
  return {
    skillLine: skillLine,
    skillLineMax: skillLine.skills[skillLine.skills.length - 1].points,
    selfAssigned: state.assigned_points.details[job.id][skillLine.id],
    totalAssigned: state.assigned_points.summaries[skillLine.id],
    job: job,
    owned: state.owned_points[job.id].total,
    assigned: state.assigned_points.summaries[job.id],
    remaining: state.owned_points[job.id].total - state.assigned_points.summaries[job.id]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange: (jobId, skillLineId, assigned) => {
      dispatch(updateAssignedPoints(jobId, skillLineId, assigned));
//      dispatch(closeModal());
    }
  };
};

const ModalAssignContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalAssign);

export default ModalAssignContainer;
