import { connect } from 'react-redux';
import SpPanel from '../components/sp_panel';

const mapStateToProps = (state, ownProps) => {
  const { weapon } = ownProps;
  const skillLineMax = state.skill_lines.find((sl) => sl.id === weapon.id).max_points;
  const assigned = state.assigned_points.summaries[weapon.id].nsp;
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
