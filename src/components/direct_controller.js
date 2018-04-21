import React from 'react';
import PropTypes from 'prop-types';

const DirectController = (props) => {
  const handleIncraseButtonClick = () => {
    props.onIncraseClick && props.onIncraseClick(props.jobId, props.skillLineId);
  };

  const handleDecraseButtonClick = (e) => {
    props.onDecraseClick && props.onDecraseClick(props.jobId, props.skillLineId);
  };

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
        onClick={handleIncraseButtonClick}
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
        onClick={handleDecraseButtonClick}
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
  display: PropTypes.string.isRequired,
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  onIncraseClick: PropTypes.func.isRequired,
  onDecraseClick: PropTypes.func.isRequired
};

export default DirectController;
