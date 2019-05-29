import React from 'react';
import ReactSelect from 'react-select';
import classNames from 'classnames';
import {
  utf8ToBase64,
  base64ToUtf8
} from '../utils/base64';

const DATA_NAME_POINTS = 'points';
const DATA_NAME_SORT= 'skill-simulator-sort-settings';

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
    this.handleSortClick = this.handleSortClick.bind(this);
    this.handleSortByCreatedClick = this.handleSortByCreatedClick.bind(this);
    this.handleSortByLabelClick = this.handleSortByLabelClick.bind(this);
    this.handleSortInAscClick = this.handleSortInAscClick.bind(this);
    this.handleSortInDescClick = this.handleSortInDescClick.bind(this);

    this.state = {
      saveInputIsBlank: true,
      inputDataName: '',
      savedDatas: [],
      selectedSavedData: null,
      dataNameInputError: false,
      errorMessages: [],
      isSortControllerActive: false,
      sortOrder: '',
      sortMode: ''
    };

    if (this.storageAvailable) {
      const storage = window.localStorage;
      const points = JSON.parse(storage.getItem(DATA_NAME_POINTS));
      if (!!points) {
        Object.keys(points).forEach((dataName, i, p) => {
          this.state.savedDatas.push(
            {
              label: base64ToUtf8(dataName),
              value: dataName,
              created: p[i].created || i
            }
          );
        });
      }

      const sort = JSON.parse(storage.getItem(DATA_NAME_SORT));
      if (!!sort) {
        this.state.sortMode = sort.mode || 'created';
        this.state.sortOrder = sort.order || 'asc';
      } else {
        this.state.sortMode = 'created';
        this.state.sortOrder = 'asc';
      }
      this.state.savedDatas = this.sortSavedDatas(this.state.sortMode, this.state.sortOrder);
    }
  }

  forceUrlInputSelect() {
    this.urlInput.focus();
    this.urlInput.select();
  }

  errorMessage() {
    if (this.state.errorMessages.length) {
      const messages = this.state.errorMessages.map((message, index) => {
        return(
          <li key={index}>{message}</li>
        )
      });
      return(
        <ul className='storage-controller__error-message'>
        {messages}
        </ul>
      );
    }
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

    this.setState({
      errorMessages: [],
      dataNameInputError: false
    });

    if (points[b64Name]) {
      this.setState({
        errorMessages: [
          `"${this.state.inputDataName}" は既に存在します。`
        ],
        dataNameInputError: true
      });
      return;
    }

    storage.setItem(DATA_NAME_POINTS, JSON.stringify(
      Object.assign({}, points, {
        [b64Name]: {
          owned: this.props.owned,
          details: this.props.details,
          created: new Date().getTime()
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
    this.dataNameInput.value = '';
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

  handleSortClick() {
    this.setState({
      isSortControllerActive: !this.state.isSortControllerActive
    });
  }

  saveSortSettings(sortMode, sortOrder) {
    const storage = window.localStorage;
    storage.setItem(DATA_NAME_SORT, JSON.stringify({
      mode: sortMode,
      order: sortOrder
    }));
  }

  sortSavedDatas(sortMode, sortOrder) {
    let sorted = this.state.savedDatas.sort((a, b) => {
      if (sortMode === 'label') {
        if (a.label < b.label) {
          return -1;
        }
        if (a.label > b.label) {
          return 1;
        }
        return 0;
      }
      // if sortOrder === 'created'
      return a.created - b.created;
    });

    if (sortOrder === 'desc') {
        sorted = sorted.reverse();
    }
    return sorted;
  }

  setSortSettings(sortMode, sortOrder) {
    this.setState({
      sortMode,
      sortOrder,
      savedDatas: this.sortSavedDatas(sortMode, sortOrder).concat(), // notify updates to react-select by deep-copy which occurs by concat.
      selectedSavedData: null
    });
    this.saveSortSettings(sortMode, sortOrder);
  }

  handleSortByCreatedClick() {
    this.setSortSettings('created', this.state.sortOrder);
  }

  handleSortByLabelClick() {
    this.setSortSettings('label', this.state.sortOrder);
  }

  handleSortInAscClick() {
    this.setSortSettings(this.state.sortMode, 'asc');
  }

  handleSortInDescClick() {
    this.setSortSettings(this.state.sortMode, 'desc');
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
            readOnly={true}
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
          {this.errorMessage()}
          <p>今のスキルポイントの状態に名前を付けて、この PC / スマートフォンに新規保存します。</p>
          <div className='storage-controller__save-as'>
            <input
              type='text'
              placeholder={(this.storageAvailable) ? 'データの名前を入力' : '使用できません'}
              disabled={!this.storageAvailable}
              className={(this.state.dataNameInputError) ? 'data-name-input--error' : 'data-name-input'}
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
              options={this.state.savedDatas}
              value={this.state.selectedSavedData}
              onChange={this.handleSavedDatasChange}
              isDisabled={!this.storageAvailable}
              isMulti={false}
              isSearchable={false}
              isClearable={false}
              blurInputOnSelect={true}
              placeholder='セーブデータ...'
              noOptionsMessage={() => 'セーブデータがありません'}
              menuPlacement='auto'
              className='react-select-saved-data'
              classNamePrefix='react-select-saved-data'
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
            <button
              className={classNames('sort', { 'active': this.state.isSortControllerActive })}
              onClick={this.handleSortClick}
            >
              並べ替え
            </button>
            </div>
          </div>
          <div className={classNames(
            'storage-controller__sort-controller',
            { 'active': this.state.isSortControllerActive })}
          >
            <dl>
              <dt>モード</dt>
              <dd>
                <button
                  className={classNames({ 'active': (this.state.sortMode === 'created') })}
                  onClick={this.handleSortByCreatedClick}
                  value='created'
                >
                  作成順
                </button>
                <button
                  className={classNames({ 'active': (this.state.sortMode === 'label') })}
                  onClick={this.handleSortByLabelClick}
                  value='label'
                >
                  名前順
                </button>
              </dd>
            </dl>
            <dl>
              <dt>順番</dt>
              <dd>
                <button
                  className={classNames({ 'active': (this.state.sortOrder === 'asc') })}
                  onClick={this.handleSortInAscClick}
                >
                  昇順
                </button>
                <button
                  className={classNames({ 'active': (this.state.sortOrder === 'desc') })}
                  onClick={this.handleSortInDescClick}
                >
                  降順
                </button>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    );
  }
}
