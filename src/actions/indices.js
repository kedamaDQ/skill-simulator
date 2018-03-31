export const INITIALIZE_INDICES = 'INITIALIZE_INDICES';

export const initializeIndices = (indices) => {
  return {
    type: INITIALIZE_INDICES,
    indices
  };
};
