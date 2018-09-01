
const version = {
  major: 1,
  minor: 1,
  patch: 3,
  pre: null,
  flags: 'rc2'
};

export const versionArray = () => {
  const { major, minor, patch, pre } = version;
  return [major, minor, patch, pre].filter(v => v !== null);
}

export const versionString = () => {
  return([versionArray().join('.'), version.flags].join(''));
};
