export const APPLY_WEAPON_FILTER = 'APPLY_WEAPON_FILTER';
export const RELEASE_WEAPON_FILTER = 'RELEASE_WEAPON_FILTER';

export const applyWeaponFilter = (weaponId) => {
  return {
    type: APPLY_WEAPON_FILTER,
    weaponId
  };
}

export const releaseWeaponFilter = () => {
  return {
    type: RELEASE_WEAPON_FILTER
  };
}
