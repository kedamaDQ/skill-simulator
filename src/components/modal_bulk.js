import React from 'react';
import PropTypes from 'prop-types';
import OwnedSelector from './owned_selector';

const ModalBulk = (props) => {

  const handleFullfillPassivesClick = () => {
    props.onFullfillPassivesClick(props.passiveFillings);
  }

  const handleResetJobSkillsClick = () => {
    props.onResetSkillsClick(props.jobSkillLineIds);
  }

  const handleResetWeaponSkillsClick = () => {
    props.onResetSkillsClick(props.weaponSkillLineIds);
  }

  return (
    <div className='input-modal-bulk'>
      <h2>まとめて設定</h2>
        <dl className='input-modal-bulk__dropdown-panel'>
          <dt>レベル</dt>
          <dd>
              <OwnedSelector
                options={props.presetsByLevel}
                onChange={props.onLevelChange}
                value={props.bulkSetupLevel}
              />
          </dd>
        </dl>
        <dl className='input-modal-bulk__dropdown-panel'>
          <dt>特訓スタンプ</dt>
          <dd>
              <OwnedSelector
                options={props.presetsByTraining}
                onChange={props.onTrainingChange}
                value={props.bulkSetupTraining}
              />
          </dd>
        </dl>
        <dl className='input-modal-bulk__dropdown-panel'>
          <dt>スキルブック</dt>
          <dd>
              <OwnedSelector
                options={props.presetsBySkillbooks}
                onChange={props.onSkillbooksChange}
                value={props.bulkSetupSkillbooks}
              />
          </dd>
        </dl>
        <dl className='input-modal-bulk__preset-panel'>
          <dt>プリセット</dt>
          <dd>
            <button
              onClick={handleFullfillPassivesClick}
            >
              フルパッシブ
            </button>
          </dd>
        </dl>
        <dl className='input-modal-bulk__reset-panel'>
          <dt>リセット</dt>
          <dd>
            <button
              onClick={handleResetJobSkillsClick}
            >
              職業リセット
            </button>
          </dd>
          <dd>
            <button
              onClick={handleResetWeaponSkillsClick}
            >
              武器リセット
            </button>
          </dd>
        </dl>
    </div>
  );
}

ModalBulk.propTypes = {
  presetsByLevel: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
  }).isRequired).isRequired,
  presetsByTraining: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
  }).isRequired).isRequired,
  presetsBySkillbooks: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
  }).isRequired).isRequired,
  bulkSetupLevel: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
  }).isRequired,
  bulkSetupTraining: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
  }).isRequired,
  bulkSetupSkillbooks: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
  }).isRequired,
  passiveFillings: PropTypes.object.isRequired,
  jobSkillLineIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  weaponSkillLineIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  onLevelChange: PropTypes.func.isRequired,
  onTrainingChange: PropTypes.func.isRequired,
  onSkillbooksChange: PropTypes.func.isRequired,
  onFullfillPassivesClick: PropTypes.func.isRequired,
  onResetSkillsClick: PropTypes.func.isRequired
};

export default ModalBulk;
