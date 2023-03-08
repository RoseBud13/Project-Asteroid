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
