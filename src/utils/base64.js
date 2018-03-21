export const JOB_HEADER_MASK = 0b10000000;
export const SKILLLINE_HEADER_MASK = 0b01000000;

export const encodeBase64url = (uint8array) => {
  console.log(uint8array);
  if (!(uint8array && uint8array.length)) {
    return null;
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
