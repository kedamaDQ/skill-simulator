import { connect } from 'react-redux';
import SkillSimulator from '../components/skill_simulator';
import {
  fetchInitialState
} from '../actions/skill_simulator';
import {
  JOB_HEADER_MASK,
  SKILLLINE_HEADER_MASK,
  decodeBase64url
} from '../utils/base64';
import { updateOwnedPointsByLevel } from '../actions/owned_points';

const mapStateToProps = (state, ownProps) => {
  const props = {
    isFetching: state.skill_simulator.isFetching
  }

  const query = window.location.search;
  if (query.length > 0) {
    const params = new URLSearchParams(query.substring(1));
    if (params.has('o')) {
      props.preOwned = decodeBase64url(params.get('o'));
      props.preAssigned =
        (params.has('a')) ?
        decodeBase64url(params.get('a')) :
        null;
    } else {
      props.preOwned = null;
    }
  }

  return props;
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchInitialState: (preOwned, preAssigned) => {
      dispatch(fetchInitialState(preOwned, preAssigned))
    },
    loadStateFromQueryString: (state) => {
    }
  };
};

const SkillSimulatorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SkillSimulator);

export default SkillSimulatorContainer;
