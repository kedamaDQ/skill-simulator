import { connect } from 'react-redux';
import DirectController from '../components/direct_controller';
import {
  delayAutoAddition,
  startAutoAddition,
  stopAutoAddition
} from '../actions/direct_controller';
import { addNsp } from '../actions/assigned_points';

const mapStateToProps = (state, ownProps) => {
  const {
    top,
    left,
    width,
    height,
    jobId,
    skillLineId,
    is_active,
    auto_addition_timer
  } = state.direct_controller;

  const display = (is_active) ? 'flex' : 'none';
  return {
    top: window.pageYOffset + top - 1,
    left: window.pageXOffset + left + width - 10,
    width: 20,
    height: height + 2,
    jobId,
    skillLineId,
    display,
    increase: 1,
    decrease: -1,
    timerId: auto_addition_timer
  }
};

const autoAdditionDelay = 500;
const autoAdditionInterval = 120;

const autoAddition = (dispatch, jobId, skillLineId, addend) => {
  dispatch(delayAutoAddition(setTimeout(() => {
    dispatch(startAutoAddition(setInterval(() => {
      dispatch(addNsp(jobId, skillLineId, addend));
    }, autoAdditionInterval)))
  }, autoAdditionDelay)));
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onMouseDown: (jobId, skillLineId, addend) => {
      dispatch(addNsp(jobId, skillLineId, addend));
      autoAddition(dispatch, jobId, skillLineId, addend);
    },
    onMouseUp: (jobId, skillLineId, addend, timerId) => {
      if (timerId !== null) {
        clearTimeout(timerId);
        dispatch(stopAutoAddition());
      }
    },
    onMouseOut: (timerId) => {
      clearTimeout(timerId);
      dispatch(stopAutoAddition());
    }
  };
};

const DirectControllerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DirectController);

export default DirectControllerContainer;
