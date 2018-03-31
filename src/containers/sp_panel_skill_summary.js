import { connect } from 'react-redux';
import SpPanel from '../components/sp_panel';

const mapStateToProps = (state, ownProps) => {
  const { skillLineId} = ownProps;
  const skillLineMax = state.skill_simulator.skill_lines[skillLineId].max_points;
  const assigned = state.assigned_points.summaries[skillLineId].nsp;
  const styleClasses = ['summary'];

  if (assigned > skillLineMax) {
    styleClasses.push('out-of-range');
  } else if (assigned === skillLineMax) {
    styleClasses.push('just-fit');
  }

  return {
    mainDisplay: assigned,
    styleClasses: styleClasses.join(' ')
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

const SkillSummarySpPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SpPanel);

export default SkillSummarySpPanelContainer;
