import React from 'react';

export default class ModalSave extends React.PureComponent {

  constructor(props) {
    super(props);
    this.forceSelect = this.forceSelect.bind(this);
    this.handleUrlClick = this.handleUrlClick.bind(this);
    this.handleCopyClick = this.handleCopyClick.bind(this);
    this.handleReloadClick = this.handleReloadClick.bind(this);
  }

  forceSelect() {
    this.urlInput.focus();
    this.urlInput.select();
  }

  handleUrlClick() {
    this.forceSelect();
  }

  handleCopyClick() {
    this.forceSelect();
    document.execCommand('copy');
  }

  handleReloadClick() {
    window.location.href=this.urlInput.value;
  }

  componentDidMount() {
    this.forceSelect();
  }

  render() {
    return(
      <div className='modal-save'>
        <div>
          <input
            type='text'
            value={this.props.url}
            readOnly='true'
            className='modal-save__url-input'
            ref={(input) => { this.urlInput = input; }}
            onClick={ this.handleUrlClick }
          />
        </div>
        <div className='modal-save__operation-panel'>
          <button
            className='modal-save__operation-panel__button'
            onClick={ this.handleCopyClick }
          >
            URL をコピー
          </button>
          <button
            className='modal-save__operation-panel__button'
            onClick={ this.handleReloadClick }
          >
            リロード
          </button>
        </div>
        <p>この状態をブラウザーのブックマーク(お気に入り)に保存する場合は、1回 [リロード] ボタンをクリックしてからブックマーク(お気に入り)に保存してください。</p>
      </div>
    );
  }
}
