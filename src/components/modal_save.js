import React from 'react';

export default class ModalSave extends React.PureComponent {

  constructor(props) {
    super(props);
    this.forceSelect = this.forceSelect.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  forceSelect() {
    this.urlInput.focus();
    this.urlInput.select();
  }

  handleClick() {
    this.forceSelect();
  }

  componentDidMount() {
    this.forceSelect();
  }

  render() {
    return(
      <div>
        <input
          type='text'
          value={this.props.url}
          readOnly='true'
          className='modal-save__url-input'
          ref={(input) => { this.urlInput = input; }}
          onClick={ this.handleClick }
        />
      </div>
    );
  }
}
