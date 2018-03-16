import React from 'react';
import PropTypes from 'prop-types';

export default class Selector extends React.PureComponent {

  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.number.isRequired,
      display: PropTypes.element.isRequired,
      value: PropTypes.number.isRequired,
      styleClasses: PropTypes.string.isRequired,
      isClickable: PropTypes.bool.isRequired
    }).isRequired).isRequired,
    onClick: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(item) {
    if (item.isClickable) {
      this.props.onClick(item.value);
    }
  }

  renderItems() {
    const items = [];
    this.props.items.forEach((item) => {
      items.push(
        <li
          className={item.styleClasses}
          key={item.key}
          onClick={() => this.handleClick(item)}
        >{
          item.display
        }</li>
      )
    });
    return items;
  }

  render() {
    return(
      <ul className='selector'>
      { this.renderItems() }
      </ul>
    );
  }
}
