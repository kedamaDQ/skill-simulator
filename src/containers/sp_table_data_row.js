import { connect } from 'react-redux';
import SpTableDataRow from '../components/sp_table_data_row';
import {
  updateOwnedPointsByLevel,
  updateOwnedPointsByTraining,
  updateBulkSetupForSkillbooks
} from '../actions/owned_points';

const mapStateToProps = (state, ownProps) => {
  const { job } = ownProps;
  return {
    presets: state.preset_points,
    weapons: state.weapons,
    skillLines: state.skill_lines,
    owned: state.owned_points[job.id],
    assigned: state.assigned_points.summaries[job.id]
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLevelChange: (selected) => {
      dispatch(updateOwnedPointsByLevel(ownProps.job.id, selected));
    },
    onTrainingChange: (selected) => {
      dispatch(updateOwnedPointsByTraining(ownProps.job.id, selected));
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
