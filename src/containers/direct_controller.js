import { connect } from 'react-redux';
import DirectController from '../components/direct_controller';
import { assignNsp } from '../actions/assigned_points';

const mapStateToProps = (state, ownProps) => {
  const {
    top,
    left,
    width,
    height,
    jobId,
    skillLineId,
    is_active
  } = state.direct_controller;

  const display = (is_active) ? 'flex' : 'none';
  return {
    top: window.pageYOffset + top - 1,
    left: window.pageXOffset + left + width - 10,
    width: 20,
    height: height + 2,
    jobId,
    skillLineId,
    display
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onIncraseClick: ({ jobId, skillLineId, ownerJobs, selfAssigned }) => {
      dispatch(assignNsp({ jobId, skillLineId, ownerJobs, selfAssigned }, 1));
    },
    onDecraseClick: ({ jobId, skillLineId, ownerJobs, selfAssigned }) => {
      dispatch(assignNsp({ jobId, skillLineId, ownerJobs, selfAssigned }, -1));
    }
  };
};

const DirectControllerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DirectController);

export default DirectControllerContainer;
