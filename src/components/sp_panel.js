import React from 'react';
import PropTypes from 'prop-types';

const SpPanel = (props) => {

  const handleClick = (e) => {
    props.onClick && props.onClick({
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleMouseOver = (e) => {
    props.onMouseOver && props.onMouseOver(e.target.getBoundingClientRect(), props);
  };

  if (props.subDisplay && props.subDisplay !== 0) {
    return(
      <div
        className={ `skill-point-panel ${props.styleClasses}` }
        onClick={ (e) => handleClick(e) }
        onMouseOver={ (e) => handleMouseOver(e) }
      >
        <div
          className='skill-point-panel__normal-skill--double'
        >
          { props.mainDisplay }
        </div>
        <div
          className='skill-point-panel__master-skill'
        >
          +{ props.subDisplay }
        </div>
      </div>
    );
  } else {
    return(
      <div
        className={ `skill-point-panel ${props.styleClasses}` }
        onClick={ (e) => handleClick(e) }
        onMouseOver={ (e) => handleMouseOver(e) }
      >
        <div
          className='skill-point-panel__normal-skill--single'
        >
          { props.mainDisplay }
        </div>
      </div>
    );
  }
};

SpPanel.propTypes = {
  mainDisplay: PropTypes.number.isRequired,
  subDisplay: PropTypes.number,
  styleClasses: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onMouseOver: PropTypes.func
};

export default SpPanel;
