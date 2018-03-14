export const INITIALIZE_PRESETPOINTS = 'INITIALIZE_PRESETPOINTS';

export const initializePresetPoints = (presetPoints) => {
  return {
    type: INITIALIZE_PRESETPOINTS,
    presetPoints
  }
}
