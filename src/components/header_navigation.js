import React from 'react';
import PropTypes from 'prop-types';
import { versionString } from '../version';

export const OPEN_BULK = 'OPEN_BULK';
export const OPEN_USAGE = 'OPEN_USAGE';
export const OPEN_ABOUT = 'OPEN_ABOUT';
export const OPEN_SAVE_DIALOG = 'OPEN_SAVE_DIALOG'

const HeaderNavigation = (props) => {

  const handleButtonClick = (e) => {
    props.onButtonClick && props.onButtonClick({
      type: e.target.value,
      position: {
        x: e.clientX,
        y: e.clientY
      }
    })
  }

  return(
    <div className='header-navigation-outer'>
      <h1>DQ10 スキルシミュレーター by foresdon.jp (v{ versionString() })</h1>
      <div className='header-navigation'>
        <button
          className='bulk-setup-button'
          onClick={(e) => handleButtonClick(e)}
          value={OPEN_BULK}
        >
          まとめて設定
        </button>
        <button
          onClick={(e) => handleButtonClick(e)}
          value={OPEN_SAVE_DIALOG}
        >
          セーブ
        </button>
        <button
          onClick={(e) => handleButtonClick(e)}
          value={OPEN_USAGE}
        >
          使い方
        </button>
        <button
          onClick={(e) => handleButtonClick(e)}
          value={OPEN_ABOUT}
        >
          このサイトについて
        </button>
      </div>
    </div>
  );
};

HeaderNavigation.propTypes = {
  onButtonClick: PropTypes.func.isRequired
};

export default HeaderNavigation;
