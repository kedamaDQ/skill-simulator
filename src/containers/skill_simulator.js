import { connect } from 'react-redux';
import SkillSimulator from '../components/skill_simulator';
import {
  fetchInitialState
} from '../actions/skill_simulator';
import { decodeBase64url } from '../utils/base64';

const mapStateToProps = (state, ownProps) => {
  const props = {
    isFetching: state.skill_simulator.isFetching
  }

  const query = window.location.search;
  if (query.length > 0) {
    if (URLSearchParams) {
      const params = new URLSearchParams(query.substring(1));
      if (params.has('o')) {
        props.preOwnedDatas = decodeBase64url(params.get('o'));
  
        if (params.has('ah') && params.has('ad')) {
          props.preAssignedHeaders = decodeBase64url(params.get('ah'));
          props.preAssignedDatas = decodeBase64url(params.get('ad'));
        } else {
          props.preAssignedHeaders = null;
          props.preAssignedDatas = null;
        }
      } else {
        props.preOwned = null;
      }
    } else {
      const params = {};
      query.substring(1).split('&').forEach(q => {
        const splitted = q.split('=', 2);
        switch(splitted[0]) {
          case 'o':
            props.preOwnedDatas = decodeBase64url(splitted[1]);
            return;

          case 'ah': 
            props.preAssignedHeaders = decodeBase64url(splitted[1]);
            return;

          case 'ad':
            props.preAssignedDatas = decodeBase64url(splitted[1]);
            return;
          
          default:
            return;
        }
      });
    }
  }

  return props;
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchInitialState: (preOwnedDatas, preAssignedHeaders, preAssignedDatas) => {
      dispatch(fetchInitialState(preOwnedDatas, preAssignedHeaders, preAssignedDatas))
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
