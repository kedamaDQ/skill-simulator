import { INITIALIZE_SKILLLINES } from '../actions/skill_lines';

const initialState = [
  {
    id: '',
    display: '',
    max_points: 0,
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

const buildSkillLines = ({ indices, jobs, skillLines }) => {
  const sl = {};
  for (const skillLineId in skillLines) {
    const skillLine = skillLines[skillLineId];
    sl[skillLineId] = {
      ...skillLine,
      max_points: skillLine.skills[skillLine.skills.length -1].points,
      owner_jobs: indices.jobs.filter((jobId) => {
        return jobs[jobId].job_skill_lines.concat(
          jobs[jobId].weapon_skill_lines
        ).includes(skillLineId);
      })
    };
  }
  return sl;
};

const skill_lines = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_SKILLLINES:
     return buildSkillLines(action);

    default:
      return state;
  }
}

export default skill_lines;
