import React from 'react';
import AssignButton from './assign_button';

export default class AssignControlPanel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(change) {
    this.props.onButtonClick && this.props.onButtonClick(change);
  }

  render() {
    return(
      <div className='assign-control-panel'>
        <AssignButton
          change={-999}
          display='全消'
          onClick={this.handleClick}
        />
        <AssignButton
          change={-10}
          display='-10'
          onClick={this.handleClick}
        />
        <AssignButton
          change={-1}
          display='-1'
          onClick={this.handleClick}
        />
        <AssignButton
          change={1}
          display='+1'
          onClick={this.handleClick}
        />
        <AssignButton
          change={10}
          display='+10'
          onClick={this.handleClick}
        />
        <AssignButton
          change={999}
          display='全振'
          onClick={this.handleClick}
        />
      </div>
    );
  }
}
