export const INITIALIZE_SKILLLINES = 'INITIALIZE_SKILLLINES';

export const initializeSkillLines = (skillLines) => {
  return {
    type: INITIALIZE_SKILLLINES,
    skillLines
  }
}
