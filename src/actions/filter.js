export const APPLY_WEAPON_FILTER = 'APPLY_WEAPON_FILTER';
export const RELEASE_WEAPON_FILTER = 'RELEASE_WEAPON_FILTER';

export const applyWeaponFilter = (filterId, weaponIds) => {
  return {
    type: APPLY_WEAPON_FILTER,
    filterId,
    weaponIds
  };
}

export const releaseWeaponFilter = () => {
  return {
    type: RELEASE_WEAPON_FILTER
  };
}
