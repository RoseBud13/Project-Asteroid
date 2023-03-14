export function useFullscreen() {
  const openFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    }
  };
  const closeFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
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
      return 'mobile';
    } else {
      return 'PC';
    }
  };
  return { getDeviceType };
}
