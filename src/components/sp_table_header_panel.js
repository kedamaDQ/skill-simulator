import React from 'react';
import PropTypes from 'prop-types';

export default class SpTableHeaderPanel extends React.PureComponent {

  static propTypes = {
    id: PropTypes.string.isRequired,
    styleClasses: PropTypes.string.isRequired,
    onClick: PropTypes.func
  };

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
