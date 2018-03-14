import { connect } from 'react-redux';
import SpPanel from '../components/sp_panel';

const mapStateToProps = (state, ownProps) => {
  const owned = state.owned_points[ownProps.job.id].total;
  const assigned = state.assigned_points.summaries[ownProps.job.id]
  const remain = owned - assigned;

  const styleClasses = ['remained'];
  if (remain < 0) {
    styleClasses.push('out-of-range');
  } else if (remain === 0) {
    if (assigned !== 0) {
      styleClasses.push('just-fit');
    }
  }

  return {
    display: owned - assigned,
    styleClasses: styleClasses.join(' ')
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
}

const OwnedSpPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SpPanel);

export default OwnedSpPanelContainer;
