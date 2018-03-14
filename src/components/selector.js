import React from 'react';

export default class Selector extends React.PureComponent {

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
