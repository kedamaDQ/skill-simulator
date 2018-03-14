import { connect } from 'react-redux';
import SpPanel from '../components/sp_panel';

const mapStateToProps = (state, ownProps) => {
  const {max, assigned} = ownProps;
  const styleClasses = ['summarized'];

  if (max) {
    if (assigned > max) {
      styleClasses.push('out-of-range');
    } else if (assigned === max) {
      if (assigned !== 0) {
        styleClasses.push('just-fit');
      }
    }
  }

  return {
    styleClasses: styleClasses.join(' '),
    display: ownProps.assigned
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
}

const SummarizedSpPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SpPanel);

export default SummarizedSpPanelContainer;
