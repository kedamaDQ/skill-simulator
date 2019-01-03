import React from 'react';
import PropTypes from 'prop-types';

const DirectController = (props) => {
  const handleIncreaseButtonDown = () => {
    props.onMouseDown && props.onMouseDown(props.jobId, props.skillLineId, props.increase);
  };

  const handleDecreaseButtonDown = () => {
    props.onMouseDown && props.onMouseDown(props.jobId, props.skillLineId, props.decrease);
  };

  const handleIncreaseButtonUp = () => {
    props.onMouseUp && props.onMouseUp(props.jobId, props.skillLineId, props.increase, props.timerId);
  };

  const handleDecreaseButtonUp = () => {
    props.onMouseUp && props.onMouseUp(props.jobId, props.skillLineId, props.decrease, props.timerId);
  };

  const handleButtonOut = () => {
    props.onMouseOut && props.onMouseOut(props.timerId);
  }

  return (
    <div
      className='direct-controller'
      style={{
        display: props.display,
        top: props.top,
        left: props.left,
        width: props.width,
        height: props.height
      }}
    >
      <button
        className='direct-controller__button'
        onMouseDown={handleIncreaseButtonDown}
        onMouseUp={handleIncreaseButtonUp}
        onMouseOut={handleButtonOut}
      >
        <svg
          viewBox='0 0 20 20'
          className='direct-controller__button__arrow'
        >
          <polygon points='10,0 0,16 20,16 10,0' ry='2' />
        </svg>
      </button>
      <button
        className='direct-controller__button'
        onMouseDown={handleDecreaseButtonDown}
        onMouseUp={handleDecreaseButtonUp}
        onMouseOut={handleButtonOut}
      >
        <svg
          viewBox='0 0 20 20'
          className='direct-controller__button__arrow'
        >
          <polygon points='10,20 20,4 0,4 10,20' />
        </svg>
      </button>
    </div>
  );
};

DirectController.propTypes = {
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  jobId: PropTypes.string.isRequired,
  skillLineId: PropTypes.string.isRequired,
  timerId: PropTypes.any,
  display: PropTypes.string.isRequired,
  increase: PropTypes.number.isRequired,
  decrease: PropTypes.number.isRequired,
  onMouseUp: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onMouseOut: PropTypes.func.isRequired
};

export default DirectController;
