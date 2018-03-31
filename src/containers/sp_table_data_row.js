import { connect } from 'react-redux';
import SpTableDataRow from '../components/sp_table_data_row';
import {
  updateOwnedPointsByLevel,
  updateOwnedPointsByTraining,
  updateBulkSetupForSkillbooks
} from '../actions/owned_points';

const mapStateToProps = (state, ownProps) => {
  const { jobId } = ownProps;
  const {
    indices,
    jobs,
    weapons,
    preset_points,
    skill_lines
  } = state.skill_simulator;
  return {
    indices,
    job: jobs[jobId],
    weapons,
    presets: preset_points,
    skillLines: skill_lines,
    owned: state.owned_points[jobId],
    assigned: state.assigned_points.summaries[jobId]
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLevelChange: (selected) => {
      dispatch(updateOwnedPointsByLevel(ownProps.jobId, selected));
    },
    onTrainingChange: (selected) => {
      dispatch(updateOwnedPointsByTraining(ownProps.jobId, selected));
    },
    onSkillbooksChange: (selected) => {
      dispatch(updateBulkSetupForSkillbooks(selected));
    }
  };
}

const SpTableDataRowContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SpTableDataRow);

export default SpTableDataRowContainer;
