import React from 'react';
import PropTypes from 'prop-types';

export default class AssignButton extends React.PureComponent {

  static propTypes = {
    value: PropTypes.number.isRequired,
    display: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick && this.props.onClick(this.props.value);
  }

  render() {
    return(
      <button
        className={`assign-controller__assign-button ${this.props.styleClasses}`}
        onClick={this.handleClick}
      >
        {this.props.display}
      </button>
    );
  }
}
