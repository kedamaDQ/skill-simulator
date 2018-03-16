import React from 'react';
import PropTypes from 'prop-types';
import { versionString } from '../version';

export const OPEN_BULK = 'OPEN_BULK';
export const OPEN_USAGE = 'OPEN_USAGE';
export const OPEN_ABOUT = 'OPEN_ABOUT';

export default class HeaderNavigation extends React.PureComponent {

  static propTypes = {
    onButtonClick: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick(e) {
    this.props.onButtonClick && this.props.onButtonClick({
      type: e.target.value,
      position: {
        x: e.clientX,
        y: e.clientY
      }
    })
  }

  render() {
    return(
      <div>
        <h1>DQ10 スキルシミュレーター by foresdon.jp (v{ versionString() })</h1>
        <div className='header-navigation'>
          <button
            className='bulk-setup-button'
            onClick={(e) => this.handleButtonClick(e)}
            value={OPEN_BULK}
          >
            まとめて設定
          </button>
          <button
            onClick={(e) => this.handleButtonClick(e)}
            value={OPEN_USAGE}
          >
            使い方
          </button>
          <button
            onClick={(e) => this.handleButtonClick(e)}
            value={OPEN_ABOUT}
          >
            このサイトについて
          </button>
        </div>
      </div>
    );
  }
}
