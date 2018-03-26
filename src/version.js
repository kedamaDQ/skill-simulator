
const version = {
  major: 0,
  minor: 11,
  patch: 1,
  pre: null,
  flags: ''
};

export const versionArray = () => {
  const { major, minor, patch, pre } = version;
  return [major, minor, patch, pre].filter(v => v !== null);
}

export const versionString = () => {
  return([versionArray().join('.'), version.flags].join(''));
};
