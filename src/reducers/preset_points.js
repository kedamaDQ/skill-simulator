import { INITIALIZE_PRESETPOINTS } from '../actions/preset_points';

const initialState = {
  by_level: [
    {label: '', value: 0}
  ],
  by_training: [
    {label: '', value: 0}
  ],
  by_skillbooks: [
    {label: '', value: 0}
  ]
};

const preset_points = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_PRESETPOINTS:
      return action.presetPoints;

    default:
      return state;
  }
}

export default preset_points;
