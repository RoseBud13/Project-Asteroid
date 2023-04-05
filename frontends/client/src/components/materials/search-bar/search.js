import { useGlobal } from '@/stores/global';

export default function useSearch() {
  const globalStore = useGlobal();
  const changeSearchEngine = option => {
    localStorage.setItem('search-engine', option);
    globalStore.changeSearchEngine(option);
  };
  const searchEngineList = {
    google: 'https://www.google.com/search?q=',
    bing: 'https://www.bing.com/search?q=',
    baidu: 'https://www.baidu.com/s?wd='
  };
  return {
    changeSearchEngine,
    searchEngineList
  };
}
