import { connect } from 'react-redux';
import SkillTable from '../components/sp_table';

const mapStateToProps = (state, ownProps) => {
  return {
    isFetching: state.skill_simulator.isFetching,
    jobs: state.jobs,
    weapons: state.weapons,
    indices: state.indices
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
