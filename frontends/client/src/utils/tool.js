export const generateUID = length => {
  return window
    .btoa(
      String.fromCharCode(
        ...window.crypto.getRandomValues(new Uint8Array(length * 2))
      )
    )
    .replace(/[+/]/g, '')
    .substring(0, length);
};

export function useDebounce(fn, delay, immediate) {
  let timeout = null;

  return function () {
    let args = arguments;
    if (timeout) {
      clearTimeout(timeout);
    }
    if (immediate) {
      let callNow = !timeout;
      timeout = setTimeout(function () {
        timeout = null;
      }, delay);
      if (callNow) {
        fn.apply(this, args);
      }
    } else {
      timeout = setTimeout(function () {
        fn.apply(this, args);
      }, delay);
    }
  };
}

export function useThrottle(fn, delay) {
  let timeout = null;
  let startTime = Date.now();

  return function () {
    let curTime = Date.now();
    let remaining = delay - (curTime - startTime);
    let args = arguments;
    if (timeout) {
      clearTimeout(timeout);
    }
    if (remaining <= 0) {
      fn.apply(this, args);
      startTime = Date.now();
    } else {
      timeout = setTimeout(fn, remaining);
    }
  };
}
