import { connect } from 'react-redux';
import SpPanel from '../components/sp_panel';
import { openModalAssign } from '../actions/modal';
import {
  activateController,
  deactivateController
} from '../actions/direct_controller';

const mapStateToProps = (state, ownProps) => {
  const { jobId, skillLineId } = ownProps;
  const { skill_lines } = state.skill_simulator;
  const styleClasses = ['assigned'];
  const skillLine = skill_lines[skillLineId];
  const assigned = state.assigned_points.details[jobId][skillLineId];

  if (assigned.msp + state.assigned_points.summaries[skillLineId].nsp > skillLine.max_points) {
    styleClasses.push('out-of-range');
  }

  return {
    mainDisplay: assigned.nsp,
    subDisplay: assigned.msp,
    styleClasses: styleClasses.join(' ')
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { jobId, skillLineId } = ownProps;
  return {
    onClick: (position) => {
      dispatch(openModalAssign(position, jobId, skillLineId));
      dispatch(deactivateController());
    },
    onMouseOver: (domRect) => {
      dispatch(activateController(domRect, ownProps));
    },
    onMouseOut: () => {
      dispatch(deactivateController());
    }
  };
}

const AssignedSpPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SpPanel);

export default AssignedSpPanelContainer;
