import { connect } from 'react-redux';
import SpPanel from '../components/sp_panel';

const mapStateToProps = (state, ownProps) => {
  const owned = ownProps.owned;
  const assigned = ownProps.assigned;
  const styleClasses = ['remained'];

  if (owned - assigned < 0) {
    styleClasses.push('out-of-range');
  } else if (owned - assigned === 0) {
    if (assigned !== 0) {
      styleClasses.push('just-fit');
    }
  }

  return {
    mainDisplay: owned - assigned,
    styleClasses: styleClasses.join(' ')
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
}

const RemainedSpPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SpPanel);

export default RemainedSpPanelContainer;
