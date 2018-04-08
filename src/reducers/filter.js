import {
  APPLY_WEAPON_FILTER,
  RELEASE_WEAPON_FILTER
} from '../actions/filter';

const initialState = {
  filter_id: null,
  weapon_ids: []
};

const filter = (state = initialState, action) => {
  switch (action.type) {
    case APPLY_WEAPON_FILTER:
      return {
        filter_id: action.filterId,
        weapon_ids: action.weaponIds
      };

    case RELEASE_WEAPON_FILTER:
      return initialState;

    default:
      return state;
  }
}

export default filter;
