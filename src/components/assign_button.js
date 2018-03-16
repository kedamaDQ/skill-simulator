import React from 'react';
import PropTypes from 'prop-types';

export default class AssignButton extends React.PureComponent {

  static propTypes = {
    change: PropTypes.number.isRequired,
    display: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick && this.props.onClick(this.props.change);
  }

  render() {
    return(
      <button
        className='assign-button'
        onClick={this.handleClick}
      >
        {this.props.display}
      </button>
    );
  }
}
