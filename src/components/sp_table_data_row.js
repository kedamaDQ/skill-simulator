import React from 'react';
import OwnedSelector from './owned_selector';
import SpTableHeaderPanelContainer from '../containers/sp_table_header_panel';
import AssignedSpPanelContainer from '../containers/sp_panel_assigned';
import RemainedSpPanelContainer from '../containers/sp_panel_remained';
import SummarizedSpPanelContainer from '../containers/sp_panel_summarized';

export default class SpTableDataRow extends React.PureComponent {

  renderJobSkillPanels() {
    const skillPanels = [];

    this.props.job.job_skill_lines.forEach((skillLineId) => {
      const skillLine = this.props.skillLines.find((skillLine) => {
        return (skillLine.id === skillLineId);
      });

      skillPanels.push(
        <AssignedSpPanelContainer
          key={`${this.props.job.id}-${skillLine.id}`}
          job={this.props.job}
          skillLine={skillLine}
          assigned={this.props.assigned[skillLineId]}
        />
      );
    })

    return skillPanels;
  }

  renderWeaponSkillPanels() {
    const cells = [];

    this.props.weapons.forEach((weapon) => {
      const skillLineId = this.props.job.weapon_skill_lines.find((id) => {
        return (id === weapon.id);
      });

      if (skillLineId) {
        const skillLine = this.props.skillLines.find((skillLine) => {
          return (skillLineId === skillLine.id);
        });

        cells.push(
          <td
            key={`${this.props.job.id}-${weapon.id}`}
            className='skill-point-table__assigned-data'
          >
            <AssignedSpPanelContainer
              job={this.props.job}
              skillLine={skillLine}
              assigned={this.props.assigned[skillLineId]}
            />
          </td>);
      } else {
        cells.push(
          <td
            key={`${this.props.job.id}-${weapon.id}`}
            className='skill-point-table__assigned-data'
          >
          </td>
        );
      }
    });

    return cells;
  }

 render() {
    return(
      <tr>
        <th className='skill-point-table__row-header'>
          <SpTableHeaderPanelContainer
            id={this.props.job.id}
            display={this.props.job.display_short}
            styleClasses='job-header'
          />
        </th>
        <td className='skill-point-table__owned-data'>
          <OwnedSelector
            options={this.props.presetsByLevel}
            onChange={this.props.onLevelChange}
            value={this.props.ownedByLevel}
          />
        </td>
        <td className='skill-point-table__owned-data'>
          <OwnedSelector
            options={this.props.presetsByTraining}
            onChange={this.props.onTrainingChange}
            value={this.props.ownedByTraining}
          />
        </td>
        <td className='skill-point-table__owned-data'>
          <OwnedSelector
            value={this.props.ownedBySkillbooks}
          />
        </td>
        <td className='skill-point-table__owned-data'>
          <RemainedSpPanelContainer
            job={this.props.job}
          />
        </td>
        <td className='skill-point-table__assigned-data--job-skill'>
          { this.renderJobSkillPanels() }
        </td>
        {
          this.renderWeaponSkillPanels()
        }
        <td className='skill-point-table__job-total-data'>
          <SummarizedSpPanelContainer
            assigned={this.props.ownedTotal}
          />
        </td>
      </tr>
    );
  }
}
