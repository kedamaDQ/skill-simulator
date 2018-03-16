import React from 'react';
import PropTypes from 'prop-types';

export default class SpPanel extends React.PureComponent {

  static propTypes = {
    display: PropTypes.number.isRequired,
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

  render() {
    return(
      <div
        className={`skill-point-panel ${this.props.styleClasses}`}
        onClick={(e) => this.handleClick(e)}
      >
        {this.props.display}
      </div>
    );
  }
}
