import React from 'react';
import PropTypes from 'prop-types';
import OwnedSelector from './owned_selector';
import SpTableHeaderPanelContainer from '../containers/sp_table_header_panel';
import AssignedSpPanelContainer from '../containers/sp_panel_assigned';
import RemainedSpPanelContainer from '../containers/sp_panel_remained';
import JobSummarySpPanelContainer from '../containers/sp_panel_job_summary';

const SpTableDataRow = (props) => {

  const renderJobSkillPanels = () => {
    const skillPanels = [];

    props.job.job_skill_lines.forEach((skillLineId) => {
      const skillLine = props.skillLines.find((skillLine) => {
        return (skillLine.id === skillLineId);
      });

      skillPanels.push(
        <AssignedSpPanelContainer
          key={`${props.job.id}-${skillLine.id}`}
          job={props.job}
          skillLine={skillLine}
        />
      );
    })

    return skillPanels;
  };

  const renderWeaponSkillPanels = () => {
    const cells = [];

    props.weapons.forEach((weapon) => {
      const skillLineId = props.job.weapon_skill_lines.find((id) => {
        return (id === weapon.id);
      });

      if (skillLineId) {
        const skillLine = props.skillLines.find((skillLine) => {
          return (skillLineId === skillLine.id);
        });

        cells.push(
          <td
            key={`${props.job.id}-${weapon.id}`}
            className='skill-point-table__assigned-data'
          >
            <AssignedSpPanelContainer
              job={props.job}
              skillLine={skillLine}
            />
          </td>);
      } else {
        cells.push(
          <td
            key={`${props.job.id}-${weapon.id}`}
            className='skill-point-table__assigned-data'
          >
          </td>
        );
      }
    });

    return cells;
  };

  return(
    <tr>
      <th className='skill-point-table__row-header'>
        <SpTableHeaderPanelContainer
          id={props.job.id}
          display={props.job.display_short}
          styleClasses='job-header'
        />
      </th>
      <td className='skill-point-table__owned-data'>
        <OwnedSelector
          options={props.presets.by_level}
          onChange={props.onLevelChange}
          value={props.owned.by_level}
        />
      </td>
      <td className='skill-point-table__owned-data'>
        <OwnedSelector
          options={props.presets.by_training}
          onChange={props.onTrainingChange}
          value={props.owned.by_training}
        />
      </td>
      <td className='skill-point-table__owned-data'>
        <OwnedSelector
          options={props.presets.by_skillbooks}
          onChange={props.onSkillbooksChange}
          value={props.owned.by_skillbooks}
        />
      </td>
      <td className='skill-point-table__owned-data'>
        <RemainedSpPanelContainer
          job={props.job}
          owned={ props.owned.nsp }
          assigned={ props.assigned.nsp }
        />
      </td>
      <td className='skill-point-table__owned-data'>
        <RemainedSpPanelContainer
          job={props.job}
          owned={ props.owned.msp }
          assigned={ props.assigned.msp }
        />
      </td>
      <td className='skill-point-table__assigned-data--job-skill'>
        { renderJobSkillPanels() }
      </td>
      {
        renderWeaponSkillPanels()
      }
      <td className='skill-point-table__job-total-data'>
        <JobSummarySpPanelContainer
          job={props.job}
        />
      </td>
    </tr>
  );
};

SpTableDataRow.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
    display_short: PropTypes.string.isRequired,
    job_skill_lines: PropTypes.arrayOf(PropTypes.string).isRequired,
    weapon_skill_lines: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  weapons: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
    skill_lines: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired).isRequired,
  skillLines: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(PropTypes.shape({
      display: PropTypes.string.isRequired,
      points: PropTypes.number.isRequired,
      additional: PropTypes.bool.isRequired
    }).isRequired).isRequired,
//    additional_skills: PropTypes.arrayOf(PropTypes.shape({
//      display: PropTypes.string.isRequired,
//      values: PropTypes.arrayOf(PropTypes.string)
//    }).isRequired).isRequired,
    passives_filling: PropTypes.number.isRequired
  }).isRequired).isRequired,
  presets: PropTypes.shape({
    by_level: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    }).isRequired).isRequired,
    by_training: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    }).isRequired).isRequired,
    by_skillbooks: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    }).isRequired).isRequired,
  }).isRequired,
  owned: PropTypes.shape({
    by_level: PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    }).isRequired,
    by_training: PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    }).isRequired,
    by_skillbooks: PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    }).isRequired,
    nsp: PropTypes.number.isRequired,
    msp: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
  }).isRequired
};

export default SpTableDataRow;
