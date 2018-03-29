export const INITIALIZE_WEAPONS = 'INITIALIZE_WEAPONS';

export const initializeWeapons = (weapons, jobs) => {
  return {
    type: INITIALIZE_WEAPONS,
    weapons,
    jobs
  };
}
