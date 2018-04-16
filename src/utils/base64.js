export const JOB_MASK = 1 << 7;
export const SKILLLINE_MASK = 1 << 6;
export const MSP_MASK = 1 << 1
export const NSP_MASK = 1;

export const encodeBase64url = (array) => {
  if (!(array && array.length)) {
    return '';
  }

  return btoa(
    String.fromCharCode.apply(null, new Uint8Array(array))
  ).replace('+', '-').replace('/', '_');

};

export const decodeBase64url = (base64url) => {
  if (!base64url) {
    return [];
  }
  if (base64url.match(/(?:[^0-9a-zA-Z-_=])/)) {
    return [];
  }

  const buf = atob(base64url.replace('-', '+').replace('_', '/'));
  return Array.prototype.map.call(buf, (b) => { return b.charCodeAt(0) });
};

export const utf8ToBase64 = (str) => {
  return window.btoa(unescape(encodeURIComponent(str)));
};

export const base64ToUtf8 = (str) => {
  return decodeURIComponent(escape(window.atob(str)));
}
