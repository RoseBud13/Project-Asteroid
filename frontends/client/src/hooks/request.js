export function useFavicon() {
  const getFaviconUrl = domain => {
    if (domain.includes('music.163.com')) {
      return 'https://s1.music.126.net/style/favicon.ico';
    } else if (domain.includes('twitter')) {
      return 'https://b612-static-rsrcs-1306125602.cos.ap-shanghai.myqcloud.com/static-img%2FTwitter_logo_blue_32.png';
    } else if (domain.includes('youtube')) {
      return 'https://b612-static-rsrcs-1306125602.cos.ap-shanghai.myqcloud.com/static-img%2F32x32-youtube-icon-24.png';
    } else {
      return domain + '/favicon.ico';
    }
  };
  return {
    getFaviconUrl
  };
}
