export const INITIALIZE_WEAPONS = 'INITIALIZE_WEAPONS';

export const initializeWeapons = (indices, jobs, weapons) => {
  return {
    type: INITIALIZE_WEAPONS,
    weapons,
    jobs,
    indices
  };
}
