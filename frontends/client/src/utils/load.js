export function useStyleSheet() {
  const loadStyle = () => {
    let cache = {};
    return function (src) {
      return (
        cache[src] ||
        (cache[src] = new Promise((resolve, reject) => {
          let s = document.createElement('link');
          s.rel = 'stylesheet';
          s.href = src;
          s.onload = resolve;
          s.onerror = reject;
          document.head.append(s);
        }))
      );
    };
  };
  return { loadStyle };
}
