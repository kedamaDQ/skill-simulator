import { INITIALIZE_WEAPONS } from '../actions/weapons';

const initialState = [
  {
    id: '',
    display: '',
    max_points: 180,
    skill_lines: []
  }
]

const weapons = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_WEAPONS:
      const {weapons, skillLines} = action;
      return weapons.map((weapon) => {
        const skills = skillLines.find((skillLine) => {
          return(skillLine.id === weapon.id);
        }).skills;
        return {
          ...weapon,
          max_points: skills[skills.length - 1].points
        };
      })

    default:
      return state;
  }
}

export default weapons;
