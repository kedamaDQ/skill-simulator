export const INITIALIZE_SKILLLINES = 'INITIALIZE_SKILLLINES';

export const initializeSkillLines = (indices, jobs, skillLines) => {
  return {
    type: INITIALIZE_SKILLLINES,
    indices,
    jobs,
    skillLines
  }
}
