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
  const skillLines = state.skill_lines;

  const passiveFillings = {};
  state.jobs.forEach((job) => {
    passiveFillings[job.id] = {};
    job.job_skill_lines.forEach((skillLineId) => {
      passiveFillings[job.id][skillLineId] = {
        nsp: skillLines.find((skillLine) => {
          return skillLine.id === skillLineId;
        }).passives_filling
      };
    });
  });

  let jobSkillLineIds = [];
  state.jobs.forEach((job) => {
    jobSkillLineIds = jobSkillLineIds.concat(job.job_skill_lines);
  });

  const weaponSkillLineIds = state.weapons.map((weapon) => {
    return weapon.id;
  })

  return {
    presetsByLevel: state.preset_points.by_level,
    presetsByTraining: state.preset_points.by_training,
    presetsBySkillbooks: state.preset_points.by_skillbooks,
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
