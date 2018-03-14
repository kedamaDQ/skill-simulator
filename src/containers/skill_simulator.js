import { connect } from 'react-redux';
import SkillSimulator from '../components/skill_simulator';
import {
  fetchInitialState
} from '../actions/skill_simulator';

const mapStateToProps = (state, ownProps) => {
  return {
    isFetching: state.skill_simulator.isFetching
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchInitialState: () => {
      dispatch(fetchInitialState())
    }
  };
};

const SkillSimulatorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SkillSimulator);

export default SkillSimulatorContainer;
