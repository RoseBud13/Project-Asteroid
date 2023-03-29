<template>
  <div class="search-box">
    <div class="search-input">
      <input
        v-model="keywords"
        @keyup.enter="handleSearch"
        @keydown.tab="handleChangeSearchEngine"
        :placeholder="searchPlaceholder"
        :autofocus="props.autofocus"
      />
    </div>
    <div class="search-btn" @click="handleSearch">
      <IconSearch></IconSearch>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useGlobal } from '@/stores/global';
import { useEmbedded } from '@/stores/embedded';
import IconSearch from '@/components/icons/IconSearch.vue';
import useSearch from './search';
import useLocale from '@/hooks/locale';

const globalStore = useGlobal();
const { searchEngine, isFullscreen } = storeToRefs(globalStore);
const { changeSearchEngine, searchEngineList } = useSearch();
const { i18 } = useLocale();
const embeddedStore = useEmbedded();

const props = defineProps({
  autofocus: Boolean
});

const searchPlaceholder = ref();
const keywords = ref('');
const searchLink = ref();
const searchEngines = Object.keys(searchEngineList);
const searchEngineIndex = ref();

const handlePlaceholder = option => {
  switch (option) {
    case 'bing':
      searchPlaceholder.value = i18.t('searchbar.input.placeholder.bing');
      break;
    case 'google':
      searchPlaceholder.value = i18.t('searchbar.input.placeholder.google');
      break;
    case 'baidu':
      searchPlaceholder.value = i18.t('searchbar.input.placeholder.baidu');
      break;
  }
};

const handleChangeSearchEngine = event => {
  if (searchEngineIndex.value === 2) {
    searchEngineIndex.value = 0;
  } else {
    searchEngineIndex.value++;
  }
  changeSearchEngine(searchEngines[searchEngineIndex.value]);
  event.preventDefault();
  event.stopPropagation();
};

const handleSearch = () => {
  if (keywords.value) {
    if (
      isFullscreen.value &&
      searchLink.value === 'https://www.bing.com/search?q='
    ) {
      let url = searchLink.value + encodeURI(keywords.value);
      embeddedStore.openEmbeddedModal(url, keywords.value, true);
    } else {
      window.open(searchLink.value + encodeURI(keywords.value));
    }
    keywords.value = '';
  }
};

watch(searchEngine, () => {
  searchLink.value = searchEngineList[searchEngine.value];
  // console.log('search engine changed to: ', searchLink.value);
  handlePlaceholder(searchEngine.value);
});

onMounted(() => {
  globalStore.setSearchEngine();
  handlePlaceholder(searchEngine.value);
  searchLink.value = searchEngineList[searchEngine.value];
  searchEngineIndex.value = searchEngines.indexOf(searchEngine.value);
});
</script>

<script>
export default {
  name: 'SearchBar'
};
</script>

<style lang="scss" scoped>
.search-box {
  display: flex;
  width: 400px;
  height: 40px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 20px;
}

.search-input {
  flex: 1;
  margin: 5px 5px 5px 10px;
}

.search-input input {
  margin: 0 20px;
  width: 100%;
  line-height: 30px;
  border: 0;
  outline: none;
  background: none;
}

// .search-input input:focus::placeholder {
//   color: transparent;
// }

.search-btn {
  width: 40px;
  margin: 0 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  cursor: pointer;
  color: rgb(120, 120, 120);
}

@media (max-width: 820px) {
  .search-box {
    width: 60vw;
  }
}

@media (max-width: 600px) {
  .search-box {
    width: 70vw;
  }
}
</style>
