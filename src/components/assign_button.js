import React from 'react';

export default class AssignButton extends React.PureComponent {

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
