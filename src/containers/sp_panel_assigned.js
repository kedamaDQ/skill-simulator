import { connect } from 'react-redux';
import SpPanel from '../components/sp_panel';
import { openModalAssign } from '../actions/modal';

const mapStateToProps = (state, ownProps) => {
  const { job, skillLine } = ownProps;
  const styleClasses = ['assigned'];
  const assigned = state.assigned_points.details[job.id][skillLine.id];

  if (assigned.msp + state.assigned_points.summaries[skillLine.id].nsp > skillLine.max_points) {
    styleClasses.push('out-of-range');
  }

  return {
    mainDisplay: assigned.nsp,
    subDisplay: assigned.msp,
    styleClasses: styleClasses.join(' ')
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { job, skillLine } = ownProps;
  return {
    onClick: (position) => {
      dispatch(openModalAssign(position, job, skillLine));
    }
  };
}

const AssignedSpPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SpPanel);

export default AssignedSpPanelContainer;
