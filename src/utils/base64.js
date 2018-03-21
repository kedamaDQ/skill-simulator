export const JOB_MASK = 1 << 7;
export const SKILLLINE_MASK = 1 << 6;
export const MSP_MASK = 1 << 1
export const NSP_MASK = 1;

export const encodeBase64url = (uint8array) => {
  if (!(uint8array && uint8array.length)) {
    return '';
  }

  return btoa(
    String.fromCharCode.apply(null, uint8array)
  ).replace('+', '-').replace('/', '_');

};

export const decodeBase64url = (base64url) => {
  if (!base64url) {
    return new Uint8Array();
  }
  if (base64url.match(/(?:[^0-9a-zA-Z-_=])/)) {
    return new Uint8Array();
  }

  const buf = atob(base64url.replace('-', '+').replace('_', '/'));
  return new Uint8Array(
    Array.prototype.map.call(buf, (b) => { return b.charCodeAt(0) })
  );
};
