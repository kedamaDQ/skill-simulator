import React from 'react';
import OwnedSelector from './owned_selector';

export default class BulkSetupPanel extends React.PureComponent {
  render() {
    return (
      <div className='bulk-setup-panel'>
        <table>
          <thead>
            <tr>
            <th className='header-horizontal'>
            </th>
            <th className='header-horizontal'>
              レベル
            </th>
            <th className='header-horizontal'>
              特訓
            </th>
            <th className='header-horizontal'>
              MSP
            </th>
            </tr>
          </thead>
          <tbody>
            <tr>
            <th>
              一括設定
            </th>
            <td>
              <OwnedSelector
                options={this.props.presetsByLevel}
                onChange={this.props.onLevelChange}
                value={this.props.bulkSetupLevel}
              />
            </td>
            <td>
              <OwnedSelector
                options={this.props.presetsByTraining}
                onChange={this.props.onTrainingChange}
                value={this.props.bulkSetupTraining}
              />
            </td>
            <td>
              <OwnedSelector
                options={this.props.presetsBySkillbooks}
                onChange={this.props.onSkillbooksChange}
                value={this.props.bulkSetupSkillbooks}
              />
            </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
