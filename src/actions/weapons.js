export const INITIALIZE_WEAPONS = 'INITIALIZE_WEAPONS';

export const initializeWeapons = (weapons, skillLines) => {
  return {
    type: INITIALIZE_WEAPONS,
    weapons,
    skillLines
  };
}
