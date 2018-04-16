import React from 'react';
import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';
import {
  utf8ToBase64,
  base64ToUtf8
} from '../utils/base64';

const DATA_NAME_POINTS = 'points';

export default class ModalSave extends React.PureComponent {

  constructor(props) {
    super(props);

    this.storageAvailable = this.props.storageAvailable;

    this.forceSelect = this.forceUrlInputSelect.bind(this);
    this.handleUrlClick = this.handleUrlClick.bind(this);
    this.handleCopyClick = this.handleCopyClick.bind(this);
    this.handleReloadClick = this.handleReloadClick.bind(this);
    this.handleSaveDataClick = this.handleSaveDataClick.bind(this);
    this.handleSavedDatasChange = this.handleSavedDatasChange.bind(this);
    this.handleLoadDataClick = this.handleLoadDataClick.bind(this);
    this.handleOverwriteDataClick = this.handleOverwriteDataClick.bind(this);
    this.handleDeleteDataClick = this.handleDeleteDataClick.bind(this);

    this.state = {
      saveInputIsBlank: true,
      inputDataName: '',
      savedDatas: [],
      selectedSavedData: null
    };

    if (this.storageAvailable) {
      const storage = window.localStorage;
      const points = JSON.parse(storage.getItem(DATA_NAME_POINTS));
      if (points) {
        Object.keys(points).forEach((dataName) => {
          this.state.savedDatas.push(
            {
              label: base64ToUtf8(dataName),
              value: dataName
            }
          );
        });
      }
    }
  }

  forceUrlInputSelect() {
    this.urlInput.focus();
    this.urlInput.select();
  }

  handleUrlClick() {
    this.forceUrlInputSelect();
  }

  handleCopyClick() {
    this.forceUrlInputSelect();
    document.execCommand('copy');
  }

  handleReloadClick() {
    window.location.href=this.urlInput.value;
  }

  handleSaveInputChange(e) {
    const dataName = e.target.value;
    this.setState({
      saveInputIsBlank: dataName.match(/^\s*$/),
      inputDataName: dataName
    });
  }

  handleSaveDataClick() {
    const storage = window.localStorage;
    const points = JSON.parse(storage.getItem(DATA_NAME_POINTS)) || {};
    const b64Name = utf8ToBase64(this.state.inputDataName);

    storage.setItem(DATA_NAME_POINTS, JSON.stringify(
      Object.assign({}, points, {
        [b64Name]: {
          owned: this.props.owned,
          details: this.props.details
        }
      })
    ));

    const selected = {
      label: this.state.inputDataName,
      value: b64Name
    };
    this.setState((prevState, props) => ({
      inputDataName: '',
      selectedSavedData: selected,
      savedDatas: prevState.savedDatas.concat(selected)
    }));
  }

  handleSavedDatasChange(selected) {
    this.setState({
      saveInputIsBlank: false,
      inputDataName: selected.label,
      selectedSavedData: selected
    })
    this.dataNameInput.value = selected.label;
  }

  handleLoadDataClick() {
    const storage = window.localStorage;
    const points = JSON.parse(storage.getItem(DATA_NAME_POINTS));
    const selected = this.state.selectedSavedData.value;

    if (points[selected]) {
      this.props.loadFromLocalStorage(points[selected]);
    }
  }

  writeData(overwrite) {
    const storage = window.localStorage;
    const points = JSON.parse(storage.getItem(DATA_NAME_POINTS));
    const selected = this.state.selectedSavedData.value;

    const new_points = {}
    Object.keys(points).forEach((dataName) => {
      if (dataName === selected) {
        if (overwrite) {
          new_points[dataName] = {
            owned: this.props.owned,
            details: this.props.details
          };
        }
      } else {
        new_points[dataName] = points[dataName];
      }
    });
    storage.setItem(DATA_NAME_POINTS, JSON.stringify(new_points));
  }

  handleOverwriteDataClick() {
    this.writeData(true);
  }

  handleDeleteDataClick() {
    this.writeData(false);
    this.setState((prevState, props) => ({
      inputDataName: '',
      selectedSavedData: null,
      saveInputIsBlank: true,
      savedDatas: prevState.savedDatas.filter((data) => {
        return data.value !== prevState.selectedSavedData.value;
      })
    }));

    this.dataNameInput.value = '';
  }

  componentDidMount() {
    this.forceUrlInputSelect();
  }

  render() {
    return(
      <div className='modal-save'>
        <h2>ブックマーク</h2>
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
        <p>この状態をブラウザーのブックマーク(お気に入り)に保存する場合は、いちど [リロード] ボタンをクリックしてからブラウザーのブックマーク(お気に入り)に登録してください。</p>

        <h2>ローカルストレージ</h2>
        <div className='storage-controller'>
          <p>今のスキルポイントの状態に名前を付けて、この PC / スマートフォンに新規保存します。</p>
          <div className='storage-controller__save-as'>
            <input
              type='text'
              placeholder={(this.storageAvailable) ? 'データの名前を入力' : '使用できません'}
              disabled={!this.storageAvailable}
              className='data-name-input'
              ref={(input) => { this.dataNameInput = input; }}
              onChange={(e) => this.handleSaveInputChange(e)}
            />
            <button
              disabled={this.state.saveInputIsBlank}
              className='save-as-button'
              onClick={this.handleSaveDataClick}
            >
              名前を付けて保存
            </button>
          </div>
          <p>この PC / スマートフォンに保存されているスキルポイントの状態を操作します。</p>
          <div className='storage-controller__saved-data'>
            <ReactSelect
              disabled={!this.storageAvailable}
              onChange={this.handleSavedDatasChange}
              options={this.state.savedDatas}
              value={this.state.selectedSavedData}
              multi={false}
              removeSelected={false}
              searchable={false}
              clearable={false}
              placeholder='セーブデータ...'
              noResultsText='セーブデータがありません'
            />
            <div>
            <button
              disabled={!(this.storageAvailable && this.state.selectedSavedData)}
              onClick={this.handleLoadDataClick}
            >
              読込
            </button>
            <button
              disabled={!(this.storageAvailable && this.state.selectedSavedData)}
              onClick={this.handleOverwriteDataClick}
            >
              上書き保存
            </button>
            <button
              disabled={!(this.storageAvailable && this.state.selectedSavedData)}
              onClick={this.handleDeleteDataClick}
            >
              削除
            </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
