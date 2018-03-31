export const INITIALIZE_WEAPONS = 'INITIALIZE_WEAPONS';

export const initializeWeapons = (weapons) => {
  return {
    type: INITIALIZE_WEAPONS,
    weapons
  };
}
