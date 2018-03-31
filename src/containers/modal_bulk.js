import { connect } from 'react-redux';
import ModalBulk from '../components/modal_bulk';
import {
  updateBulkSetupForLevel,
  updateBulkSetupForTraining,
  updateBulkSetupForSkillbooks
} from '../actions/owned_points';
import {
  fullfillForPassives,
  resetAssigned
} from '../actions/assigned_points';

const mapStateToProps = (state, ownProps) => {
  const {
    indices,
    jobs,
    weapons,
    skill_lines,
    preset_points
  } = state.skill_simulator;

  const passiveFillings = {};
  indices.jobs.forEach((jobId) => {
    passiveFillings[jobId] = {};
    jobs[jobId].job_skill_lines.forEach((skillLineId) => {
      passiveFillings[jobId][skillLineId] = {
        nsp: skill_lines[skillLineId].passives_filling
      };
    });
  });

  let jobSkillLineIds = [];
  indices.jobs.forEach((jobId) => {
    jobSkillLineIds = jobSkillLineIds.concat(jobs[jobId].job_skill_lines);
  });

  let weaponSkillLineIds = [];
  indices.weapons.forEach((weaponId) => {
    weaponSkillLineIds = weaponSkillLineIds.concat(weapons[weaponId].skill_lines);
  })

  return {
    presetsByLevel: preset_points.by_level,
    presetsByTraining: preset_points.by_training,
    presetsBySkillbooks: preset_points.by_skillbooks,
    bulkSetupLevel: state.owned_points.bulk_setup.by_level,
    bulkSetupTraining: state.owned_points.bulk_setup.by_training,
    bulkSetupSkillbooks: state.owned_points.bulk_setup.by_skillbooks,
    passiveFillings,
    jobSkillLineIds,
    weaponSkillLineIds
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLevelChange: (preset) => {
      dispatch(updateBulkSetupForLevel(preset));
    },
    onTrainingChange: (preset) => {
      dispatch(updateBulkSetupForTraining(preset));
    },
    onSkillbooksChange: (preset) => {
      dispatch(updateBulkSetupForSkillbooks(preset));
    },
    onFullfillPassivesClick: (fillings) => {
      dispatch(fullfillForPassives(fillings));
    },
    onResetSkillsClick: (skillLineIds) => {
      dispatch(resetAssigned(skillLineIds));
    }
  };
}

const ModalBulkContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalBulk);

export default ModalBulkContainer;
