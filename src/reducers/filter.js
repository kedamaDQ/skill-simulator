import {
  APPLY_WEAPON_FILTER,
  RELEASE_WEAPON_FILTER
} from '../actions/filter';

const initialState = {
  weaponId: null
};

const filter = (state = initialState, action) => {
  switch (action.type) {
    case APPLY_WEAPON_FILTER:
      return {
        weaponId: action.weaponId
      };

    case RELEASE_WEAPON_FILTER:
      return initialState;

    default:
      return state;
  }
}

export default filter;
