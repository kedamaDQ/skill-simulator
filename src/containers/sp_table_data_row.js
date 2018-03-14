import { connect } from 'react-redux';
import SpTableDataRow from '../components/sp_table_data_row';
import {
  updateOwnedPointsByLevel,
  updateOwnedPointsByTraining,
  updateOwnedPointsBySkillbooks
} from '../actions/owned_points';

const mapStateToProps = (state, ownProps) => {
  return {
    weapons: state.weapons,
    skillLines: state.skill_lines,
    ownedByLevel: state.owned_points[ownProps.job.id].by_level,
    ownedByTraining: state.owned_points[ownProps.job.id].by_training,
    ownedBySkillbooks: state.owned_points[ownProps.job.id].by_skillbooks,
    ownedTotal: state.owned_points[ownProps.job.id].total,
    presetsByLevel: state.preset_points.by_level,
    presetsByTraining: state.preset_points.by_training,
    presetsBySkillbooks: state.preset_points.by_skillbooks,
    assignedTotal: state.assigned_points.summaries[ownProps.job.id]
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
    onSkilbooksChange: (selected) => {
      dispatch(updateOwnedPointsBySkillbooks(ownProps.job.id, selected));
    }
  };
}

const SpTableDataRowContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SpTableDataRow);

export default SpTableDataRowContainer;
