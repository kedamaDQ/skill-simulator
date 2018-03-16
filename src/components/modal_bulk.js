import React from 'react';
import OwnedSelector from './owned_selector';

export default class ModalBulk extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleFullfillPassivesClick = this.handleFullfillPassivesClick.bind(this);
    this.handleResetJobSkillsClick = this.handleResetJobSkillsClick.bind(this);
    this.handleResetWeaponSkillsClick = this.handleResetWeaponSkillsClick.bind(this);
  }

  handleFullfillPassivesClick() {
    this.props.onFullfillPassivesClick && this.props.onFullfillPassivesClick(this.props.passiveFillings);
  }

  handleResetJobSkillsClick() {
    this.props.onResetSkillsClick && this.props.onResetSkillsClick(this.props.jobSkillLineIds);
  }

  handleResetWeaponSkillsClick() {
    this.props.onResetSkillsClick && this.props.onResetSkillsClick(this.props.weaponSkillLineIds);
  }

  render() {
    return (
      <div className='input-modal-bulk'>
        <h2>まとめて設定</h2>
          <dl className='input-modal-bulk__dropdown-panel'>
            <dt>レベル</dt>
            <dd>
                <OwnedSelector
                  options={this.props.presetsByLevel}
                  onChange={this.props.onLevelChange}
                  value={this.props.bulkSetupLevel}
                />
            </dd>
          </dl>
          <dl className='input-modal-bulk__dropdown-panel'>
            <dt>特訓</dt>
            <dd>
                <OwnedSelector
                  options={this.props.presetsByTraining}
                  onChange={this.props.onTrainingChange}
                  value={this.props.bulkSetupTraining}
                />
            </dd>
          </dl>
          <dl className='input-modal-bulk__dropdown-panel'>
            <dt>マスタースキル</dt>
            <dd>
                <OwnedSelector
                  options={this.props.presetsBySkillbooks}
                  onChange={this.props.onSkillbooksChange}
                  value={this.props.bulkSetupSkillbooks}
                />
            </dd>
          </dl>
          <dl className='input-modal-bulk__preset-panel'>
            <dt>プリセット</dt>
            <dd>
              <button
                onClick={this.handleFullfillPassivesClick}
              >
                フルパッシブ
              </button>
            </dd>
          </dl>
          <dl className='input-modal-bulk__reset-panel'>
            <dt>リセット</dt>
            <dd>
              <button
                onClick={this.handleResetJobSkillsClick}
              >
                職業リセット
              </button>
            </dd>
            <dd>
              <button
                onClick={this.handleResetWeaponSkillsClick}
              >
                武器リセット
              </button>
            </dd>
          </dl>
      </div>
    );
  }
}
