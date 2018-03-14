import { connect } from 'react-redux';
import AssignedIndicator from '../components/assigned_indicator';

const mapStateToProps = (state, ownProps) => {
  const {numerator, denominator} = ownProps;
  const styleClasses = [ownProps.size, 'assigned-indicator'];
  const numeratorStyleClasses = [ownProps.size, 'numerator'];
  const denominatorStyleClasses = [ownProps.size, 'denominator'];

  if (numerator > denominator) {
    styleClasses.push('out-of-range');
    numeratorStyleClasses.push('out-of-range');
  }
  return {
    styleClasses: styleClasses.join(' '),
    numeratorStyleClasses: numeratorStyleClasses.join(' '),
    denominatorStyleClasses: denominatorStyleClasses.join(' ')
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
}

const AssignedIndicatorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignedIndicator);

export default AssignedIndicatorContainer;
