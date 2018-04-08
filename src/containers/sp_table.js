import { connect } from 'react-redux';
import SkillTable from '../components/sp_table';
import {
  applyWeaponFilter,
  releaseWeaponFilter
} from '../actions/filter';

const mapStateToProps = (state, ownProps) => {
  return {
    isFetching: state.skill_simulator.is_fetching,
    jobs: state.skill_simulator.jobs,
    weapons: state.skill_simulator.weapons,
    indices: state.skill_simulator.indices,
    currentFilterId: state.filter.filter_id,
    weaponFilter: state.filter.weapon_ids
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onHeaderClick: (currentFilterId, newFilterId, weaponIds) => {
      if (currentFilterId === newFilterId) {
        dispatch(releaseWeaponFilter());
      } else {
        dispatch(applyWeaponFilter(newFilterId, weaponIds))
      }
    },
    onWeaponHeaderClick: (currentFilter, weaponId) => {
      if (currentFilter === weaponId) {
        dispatch(releaseWeaponFilter());
      } else {
        dispatch(applyWeaponFilter(weaponId))
      }
    }
  };
};

const SpTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SkillTable);

export default SpTableContainer;
