const opt = Object.prototype.toString;

export function isArray(obj) {
  return opt.call(obj) === '[object Array]';
}

export function isNull(obj) {
  return opt.call(obj) === '[object Null]';
}

export function isBoolean(obj) {
  return opt.call(obj) === '[object Boolean]';
}

export function isObject(obj) {
  return opt.call(obj) === '[object Object]';
}

export function isPromise(obj) {
  return opt.call(obj) === '[object Promise]';
}

export function isString(obj) {
  return opt.call(obj) === '[object String]';
}

export function isNumber(obj) {
  return opt.call(obj) === '[object Number]' && obj === obj;
}

export function isRegExp(obj) {
  return opt.call(obj) === '[object RegExp]';
}

export function isDate(obj) {
  return opt.call(obj) === '[object Date]';
}

function isHex(color) {
  return /^#[a-fA-F0-9]{3}$|#[a-fA-F0-9]{6}$/.test(color);
}

function isRgb(color) {
  return /^rgb\((\s*\d+\s*,?){3}\)$/.test(color);
}

function isRgba(color) {
  return /^rgba\((\s*\d+\s*,\s*){3}\s*\d(\.\d+)?\s*\)$/.test(color);
}

export function isColor(color) {
  return isHex(color) || isRgb(color) || isRgba(color);
}

export function isUndefined(obj) {
  return obj === undefined;
}

export function isFunction(obj) {
  return typeof obj === 'function';
}

export function isEmptyObject(obj) {
  return isObject(obj) && Object.keys(obj).length === 0;
}

export function isExist(obj) {
  return obj || obj === 0;
}

export function isWindow(el) {
  return el === window;
}

export function isUrl(url) {
  return /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi.test(
    url
  );
}

export function isSlotHasContent(slotName, slots) {
  return Boolean(!!slots[slotName] && slots[slotName]()[0].children.length > 0);
}

// export function isDayjs(timey) {
//   return (
//     isObject(time) &&
//     '$y' in time &&
//     '$M' in time &&
//     '$D' in time &&
//     '$d' in time &&
//     '$H' in time &&
//     '$m' in time &&
//     '$s' in time
//   );
// }
