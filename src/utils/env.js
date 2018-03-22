
export const baseUrl = () => {
  return process.env.REACT_APP_BASE_URL.replace(/\/$/, '');
}
