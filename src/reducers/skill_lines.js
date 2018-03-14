import { INITIALIZE_SKILLLINES } from '../actions/skill_lines';

const initialState = [
  {
    id: '',
    display: '',
    skills: [
      {
        display: '',
        points: 0,
        additional: false
      }
    ],
    additional_skills: [
      {
        display: '',
        values: []
      }
    ],
  }
];

const skill_lines = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_SKILLLINES:
      return action.skillLines;

    default:
      return state;
  }
}

export default skill_lines;
