import { connect } from 'react-redux';
import SkillTable from '../components/sp_table';

const mapStateToProps = (state, ownProps) => {
  return {
    isFetching: state.skill_simulator.is_fetching,
    jobs: state.skill_simulator.jobs,
    weapons: state.skill_simulator.weapons,
    indices: state.skill_simulator.indices
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

const SpTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SkillTable);

export default SpTableContainer;
