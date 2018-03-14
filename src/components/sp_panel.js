import React from 'react';

export default class SpPanel extends React.PureComponent {
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
