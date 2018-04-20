import React from 'react';

const DirectController = (props) => {
  const handleIncraseButtonClick = () => {
    props.onIncraseClick && props.onIncraseClick(props);
  };

  const handleDecraseButtonClick = (e) => {
    props.onDecraseClick && props.onDecraseClick(props);
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  const handleDecraseButtonDblClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
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
        onClick={handleIncraseButtonClick}
      >
        <svg
          viewBox='0 0 20 20'
          className='direct-controller__arrow'
        >
          <polygon points='10,0 0,16 20,16 10,0' ry='2' />
        </svg>
      </button>
      <svg
        viewBox='0 0 20 20'
        className='direct-controller__arrow'
        onClick={handleDecraseButtonClick}
        onDoubleClick={handleDecraseButtonDblClick}
      >
        <polygon points='10,20 20,4 0,4 10,20' />
      </svg>
    </div>
  );
};

export default DirectController;
