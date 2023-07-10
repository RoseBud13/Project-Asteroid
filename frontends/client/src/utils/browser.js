export function useFullscreen() {
  const docEl = document.documentElement;
  const fullEl =
    document.fullcreenElement ||
    document.mozFullScreenElement ||
    document.webkitCurrentFullScreenElement;
  const openFullscreen = () => {
    if (!fullEl) {
      if (docEl.requestFullscreen) {
        docEl.requestFullscreen();
      } else if (docEl.webkitRequestFullscreen) {
        docEl.webkitRequestFullscreen();
      } else if (docEl.msRequestFullscreen) {
        docEl.msRequestFullscreen();
      }
    }
  };
  const closeFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };
  return {
    openFullscreen,
    closeFullscreen
  };
}

export function useUserAgent() {
  const getDeviceType = () => {
    if (
      navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      )
    ) {
      if (navigator.userAgent.match(/(iPhone|iPod|ios|iPad)/i)) {
        return 'ios';
      }
      return 'mobile';
    } else {
      return 'PC';
    }
  };
  return { getDeviceType };
}
