import React from 'react';
import PropTypes from 'prop-types';

export default class SpPanel extends React.PureComponent {

  static propTypes = {
    mainDisplay: PropTypes.number.isRequired,
    subDisplay: PropTypes.number,
    styleClasses: PropTypes.string.isRequired,
    onClick: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.onClick && this.props.onClick({
      x: e.clientX,
      y: e.clientY
    });
  }

  renderDisplays() {
    if (this.props.subDisplay && this.props.subDisplay !== 0) {
      return(
        <div
          className={ `skill-point-panel ${this.props.styleClasses}` }
          onClick={ (e) => this.handleClick(e) }
        >
          <div
            className='skill-point-panel__normal-skill--double'
          >
            { this.props.mainDisplay }
          </div>
          <div
            className='skill-point-panel__master-skill'
          >
            +{ this.props.subDisplay }
          </div>
        </div>
      );
    } else {
      return(
        <div
          className={ `skill-point-panel ${this.props.styleClasses}` }
          onClick={ (e) => this.handleClick(e) }
        >
          <div
            className='skill-point-panel__normal-skill--single'
          >
            { this.props.mainDisplay }
          </div>
        </div>
      );
    }
  }
  render() {
    return this.renderDisplays();
  }
}
