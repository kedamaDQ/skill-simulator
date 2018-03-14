import {
  INITIALIZE_ASSIGNEDPOINTS,
  UPDATE_ASSIGNEDPOINTS,
  FULLFILL_FOR_PASSIVES,
  RESET_SKILLS
} from '../actions/assigned_points';

const initialState = {
  details: {
    jobId: {
      skillLineId: 0
    }
  },
  summaries: {
    skillLineId: 0,
    jobId: 0
  }
};

const mergeDetails = ({details}, {jobId, skillLineId, assigned}) => {
  return {
    ...details,
    [jobId]: Object.assign({}, details[jobId], {
      [skillLineId]: assigned
    })
  };
};

const mergeSummaries = ({details, summaries}, {jobId, skillLineId, assigned}) => {
  let skillTotal = 0;
  for (const job in details) {
    if (details[job].hasOwnProperty(skillLineId)) {
      skillTotal += (job === jobId) ? assigned : details[job][skillLineId];
    }
  }

  let jobTotal = 0;
  for (const skillLine in details[jobId]) {
    jobTotal += (skillLine === skillLineId) ? assigned : details[jobId][skillLine];
  }

  return {
    ...summaries,
    [skillLineId]: skillTotal,
    [jobId]: jobTotal
  }
};

const buildSummaries = (details) => {
  const summaries = {};
  for (const jobId in details) {
    summaries[jobId] = 0;
    for (const skillLineId in details[jobId]) {
      summaries[jobId] += details[jobId][skillLineId];
      if (summaries[skillLineId]) {
        summaries[skillLineId] += details[jobId][skillLineId];
      } else {
        summaries[skillLineId] = details[jobId][skillLineId];
      }
    }
  }
  return summaries;
};

const fullfillForPassives = (state, fillings) => {
  const details = Object.assign({}, state.details);
  for (const jobId in details) {
    details[jobId] = Object.assign({}, details[jobId], fillings[jobId]);
  }
  return {
    details,
    summaries: buildSummaries(details)
  };
};

const resetSkillLines = (state, targetSkillLineIds) => {
  const details = Object.assign({}, state.details);

  for (const jobId in details) {
    for (const skillLineId in details[jobId]) {
      if (targetSkillLineIds.includes(skillLineId)) {
        details[jobId][skillLineId] = 0;
      }
    }
  }
  return {
    details,
    summaries: buildSummaries(details)
  };
};

const assigned_points = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_ASSIGNEDPOINTS:
      const assigned = Object.assign({}, state);
      action.jobs.forEach((job) => {
        const {job_skill_lines, weapon_skill_lines} = job;
        assigned.details[job.id] = {};
        job_skill_lines.concat(weapon_skill_lines).forEach((skillLine) => {
          assigned.details[job.id][skillLine] = 0;
          assigned.summaries[skillLine] = 0;
        });
        assigned.summaries[job.id] = 0;
      });
      return assigned;

    case UPDATE_ASSIGNEDPOINTS:
      return {
        details: mergeDetails(state, action),
        summaries: mergeSummaries(state, action)
      };

    case FULLFILL_FOR_PASSIVES:
      return fullfillForPassives(state, action.fillings);

    case RESET_SKILLS:
      return resetSkillLines(state, action.skillLineIds);

    default:
      return state;
  }
}

export default assigned_points;
