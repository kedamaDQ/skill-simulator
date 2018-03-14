import React from 'react';

export default class SpTableHeaderPanel extends React.PureComponent {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick && this.props.onClick(this.props.id);
  }

  render() {
    const {display, styleClasses} = this.props;
    return(
      <div
        className={`skill-point-table__header-panel ${styleClasses}`}
        onClick={this.handleClick}
      >{
        display
      }</div>
    );
  }
}
