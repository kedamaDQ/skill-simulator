export const INITIALIZE_JOBS = 'INITIALIZE_JOBS';

export const initializeJobs = (jobs) => {
  return {
    type: INITIALIZE_JOBS,
    jobs 
  };
}
