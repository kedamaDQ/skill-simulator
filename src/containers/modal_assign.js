import { connect } from 'react-redux';
import ModalAssign from '../components/modal_assign';
import { assignNsp } from '../actions/assigned_points';
//import { closeModal } from '../actions/modal';

const mapStateToProps = (state, ownProps) => {
  const { jobId, skillLineId } = ownProps;
  const {
    jobs,
    skill_lines,
  } = state.skill_simulator;
  return {
    job: jobs[jobId],
    skillLine: skill_lines[skillLineId],
    assignedByJob: state.assigned_points.details[jobId][skillLineId],
    totalAssignedForSkill: state.assigned_points.summaries[skillLineId],
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSelectorClick: (nsp) => {
      dispatch(assignNsp(ownProps.jobId, ownProps.skillLineId, nsp));
//      dispatch(closeModal());
    }
  };
};

const ModalAssignContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalAssign);

export default ModalAssignContainer;
