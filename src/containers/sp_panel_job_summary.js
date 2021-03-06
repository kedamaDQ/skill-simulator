import { connect } from 'react-redux';
import SpPanel from '../components/sp_panel';

const mapStateToProps = (state, ownProps) => {
  const { jobId } = ownProps;
  const styleClasses = ['summary'];
  const max = state.owned_points[jobId].total;
  const assigned = state.assigned_points.summaries[jobId].total;

  if (assigned > max) {
    styleClasses.push('out-of-range');
  } else if (assigned === max && assigned !== 0) {
    styleClasses.push('just-fit');
  }

  return {
    mainDisplay: max,
    styleClasses: styleClasses.join(' ')
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
}

const JobSummarySpPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SpPanel);

export default JobSummarySpPanelContainer;
