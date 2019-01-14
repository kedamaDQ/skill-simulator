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
      skillPanels.push(
        <AssignedSpPanelContainer
          key={`${props.jobId}-${skillLineId}`}
          jobId={props.jobId}
          skillLineId={skillLineId}
        />
      );
    })

    return skillPanels;
  };

  const renderWeaponSkillPanels = () => {
    const cells = [];

    props.indices.weapons.forEach((weaponId) => {
      const weapon = props.weapons[weaponId];
      weapon.skill_lines.forEach((skillLineId) => {
        if (props.skillLines[skillLineId].owner_jobs.includes(props.jobId)) {
          cells.push(
            <td
              key={`${props.jobId}-${skillLineId}`}
              className='skill-point-table__assigned-data'
            >
              <AssignedSpPanelContainer
                jobId={props.jobId}
                skillLineId={skillLineId}
              />
            </td>);
        } else {
          cells.push(
            <td
              key={`${props.jobId}-${skillLineId}`}
              className='skill-point-table__assigned-data'
            >
            </td>
          );
        }
      });
    });
    return cells;
  };

  return(
    <tr>
      <th className='skill-point-table__row-header'>
        <SpTableHeaderPanelContainer
          id={props.jobId}
          display={props.job.display_short}
          styleClasses='job-header'
          onClick={props.onHeaderClick}
        />
      </th>
      <td className='skill-point-table__owned-data'>
        <OwnedSelector
          options={props.presets.by_level[props.job.presets_by_level]}
          onChange={props.onLevelChange}
          value={props.owned.by_level}
          showValue={true}
        />
      </td>
      <td className='skill-point-table__owned-data'>
        <OwnedSelector
          options={props.presets.by_training[props.job.presets_by_training]}
          onChange={props.onTrainingChange}
          value={props.owned.by_training}
          showValue={true}
        />
      </td>
      <td className='skill-point-table__owned-data'>
        <OwnedSelector
          options={props.presets.by_skillbooks[props.job.presets_by_skillbooks]}
          onChange={props.onSkillbooksChange}
          value={props.owned.by_skillbooks}
          showValue={true}
        />
      </td>
      <td className='skill-point-table__remained-data nsp'>
        <RemainedSpPanelContainer
          owned={ props.owned.nsp }
          assigned={ props.assigned.nsp }
        />
      </td>
      <td className='skill-point-table__remained-data msp'>
        <RemainedSpPanelContainer
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
          jobId={props.jobId}
        />
      </td>
    </tr>
  );
};

SpTableDataRow.propTypes = {
  job: PropTypes.shape({
    display: PropTypes.string.isRequired,
    display_short: PropTypes.string.isRequired,
    job_skill_lines: PropTypes.arrayOf(PropTypes.string).isRequired,
    weapon_skill_lines: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  weapons: PropTypes.shape(PropTypes.shape({
    display: PropTypes.string.isRequired,
    skill_lines: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired).isRequired,
  skillLines: PropTypes.object.isRequired,
  presets: PropTypes.shape({
    by_level: PropTypes.shape(
      PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired
      }).isRequired
    ).isRequired).isRequired,
    by_training: PropTypes.shape(
      PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired
      }).isRequired
    ).isRequired).isRequired,
    by_skillbooks: PropTypes.shape(
      PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired
      }).isRequired
    ).isRequired).isRequired,
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
