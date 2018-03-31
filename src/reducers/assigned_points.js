import {
  INITIALIZE_ASSIGNED,
  UPDATE_ASSIGNED,
  RESET_ASSIGNED,
  FULLFILL_FOR_PASSIVES
} from '../actions/assigned_points';
import {
  JOB_MASK,
  SKILLLINE_MASK,
  NSP_MASK,
  MSP_MASK
} from '../utils/base64';

const initialState = {
  details: {
    jobId: {
      skillLineId: {
        nsp: 0, // normal skill points
        msp: 0, // master's skill points
        total: 0
      }
    }
  },
  summaries: {
    skillLineId: {
      nsp: 0,
      msp: 0,
      total: 0
    },
    jobId: {
      nsp: 0,
      msp: 0,
      total: 0
    },
  }
};

const defShape = { nsp: 0, msp: 0, total: 0 };

const mergeDetails = ({ details }, { jobId, skillLineId, assigned }) => {
  const merged = Object.assign({}, details[jobId][skillLineId], assigned);
  merged.total = merged.nsp + merged.msp;
  return {
    ...details,
    [jobId]: {
      ...details[jobId],
      [skillLineId]: merged
    }
  };
};

const mergeSummaries = ({details, summaries}, {jobId, skillLineId, ownerJobs, assigned}) => {
  const jobSummary = Object.assign({}, defShape);
  for (const slId in details[jobId]) {
    const existing = details[jobId][slId];
    if (slId === skillLineId) {
      jobSummary.nsp += (typeof assigned.nsp === 'number') ? assigned.nsp : existing.nsp;
      jobSummary.msp += (typeof assigned.msp === 'number') ? assigned.msp : existing.msp;
    } else {
      jobSummary.nsp += existing.nsp;
      jobSummary.msp += existing.msp;
    }
  }
  jobSummary.total = jobSummary.nsp + jobSummary.msp;

  const skillSummary = Object.assign({}, defShape);
  ownerJobs.forEach((ownerJobId) => {
    const existing = details[ownerJobId][skillLineId];
    if (ownerJobId === jobId) {
      skillSummary.nsp += (typeof assigned.nsp === 'number') ? assigned.nsp : existing.nsp;
      skillSummary.msp += (typeof assigned.msp === 'number') ? assigned.msp : existing.msp;
    } else {
      skillSummary.nsp += existing.nsp;
      skillSummary.msp += existing.msp;
    }
  });
  skillSummary.total = skillSummary.nsp + skillSummary.msp;

  return {
    ...summaries,
    [jobId]: jobSummary,
    [skillLineId]: skillSummary
  }
};

const buildSummaries = (details) => {
  const summaries = {};
  for (const jobId in details) {
    summaries[jobId] = {
      nsp: 0,
      msp: 0,
      total: 0
    };
    for (const skillLineId in details[jobId]) {
      const total = details[jobId][skillLineId].nsp + details[jobId][skillLineId].msp;
      summaries[jobId].nsp += details[jobId][skillLineId].nsp;
      summaries[jobId].msp += details[jobId][skillLineId].msp;
      summaries[jobId].total += total;

      if (!summaries[skillLineId]) {
        summaries[skillLineId] = Object.assign({}, defShape);
      }
      summaries[skillLineId].nsp += details[jobId][skillLineId].nsp;
      summaries[skillLineId].msp += details[jobId][skillLineId].msp;
      summaries[skillLineId].total += details[jobId][skillLineId].nsp;
    }
  }
  return summaries;
};

const fullfillForPassives = (state, fillings) => {
  const details = Object.assign({}, state.details);
  for (const jobId in details) {
    for (const skillLineId in details[jobId]) {
      details[jobId][skillLineId] = Object.assign(
        {},
        details[jobId][skillLineId],
        fillings[jobId][skillLineId]
      );
    }
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
        details[jobId][skillLineId] = Object.assign({}, defShape);
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
    case INITIALIZE_ASSIGNED:
      const { indices, jobs, preAssignedHeaders, preAssignedDatas } = action;
      const assigned = {
        details: {},
        summaries: {}
      };
      action.indices.jobs.forEach((jobId) => {
        const {job_skill_lines, weapon_skill_lines} = jobs[jobId];
        assigned.details[jobId] = {};
        job_skill_lines.concat(weapon_skill_lines).forEach((skillLineId) => {
          assigned.details[jobId][skillLineId] = Object.assign({}, defShape);
          assigned.summaries[skillLineId] = Object.assign({}, defShape);
        });
        assigned.summaries[jobId] = Object.assign({}, defShape);
      });

      if (preAssignedHeaders.length && preAssignedDatas.length) {
        const APPLY_TRIGGER_MASK = JOB_MASK | SKILLLINE_MASK;
        const apply = {};
        let currentDataIdx = 0;
        preAssignedHeaders.forEach((header) => {
          if (header & APPLY_TRIGGER_MASK) {
            if (apply.jobId && apply.skillLineId) {
              assigned.details[apply.jobId][apply.skillLineId] = apply.assigned;
            }
            if (header & JOB_MASK) {
              apply.jobId = indices.jobs[header & ~APPLY_TRIGGER_MASK];
              apply.skillLineId = null;
            } else if (header & SKILLLINE_MASK) {
              apply.skillLineId = indices.skill_lines[header & ~APPLY_TRIGGER_MASK];
            }
            apply['assigned'] = {
              nsp: 0,
              msp: 0 
            }
          } else {
            if (apply.jobId && apply.skillLineId) {
              if (header & NSP_MASK) {
                apply.assigned.nsp = preAssignedDatas[currentDataIdx++];
              }
              if (header & MSP_MASK) {
                apply.assigned.msp = preAssignedDatas[currentDataIdx++];
              }
              apply.assigned.total = apply.assigned.nsp + apply.assigned.msp;
            }
          }
        });
        if (apply.jobId && apply.skillLineId) {
          assigned.details[apply.jobId][apply.skillLineId] = apply.assigned;
        }
        assigned.summaries = buildSummaries(assigned.details);
      }
      return assigned;

    case UPDATE_ASSIGNED:
      return {
        details: mergeDetails(state, action),
        summaries: mergeSummaries(state, action)
      };

    case RESET_ASSIGNED:
      return resetSkillLines(state, action.skillLineIds);

    case FULLFILL_FOR_PASSIVES:
      return fullfillForPassives(state, action.fillings);

    default:
      return state;
  }
}

export default assigned_points;
