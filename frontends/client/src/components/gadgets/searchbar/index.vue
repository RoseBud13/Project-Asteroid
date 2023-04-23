<template>
  <div class="search-box">
    <div class="search-input">
      <input
        v-model="keywords"
        @keyup.enter="handleSearch"
        @keydown.tab="handleChangeSearchEngine"
        @input="hanldeInput"
        :placeholder="$t(searchPlaceholder)"
        :autofocus="props.autofocus"
      />
    </div>
    <div class="search-btn" @click="handleSearch">
      <IconSearch></IconSearch>
    </div>
  </div>
  <div class="search-assist-wrapper" v-if="showSearchAssist">
    <AstraDropdownOption
      v-for="item in filteredSearchAssistList"
      :key="item.id"
      @click="handleSearchAssist(item.id)"
      >{{ item.name }}</AstraDropdownOption
    >
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useGlobal } from '@/stores/global';
import { useModalStore } from '@/stores/modal';
import { useWallpaperStore } from '@/stores/wallpaper';
import { useSearchAssistStore } from '@/stores/searchAssist';
import { useAppNotesStore } from '@/stores/appNotes';
import IconSearch from '@/components/icons/IconSearch.vue';
import AstraDropdownOption from '@/components/basics/dropdown/DropdownOption.vue';
import useSearch from './search';

const globalStore = useGlobal();
const { searchEngine, isFullscreen, searchPlaceholder, deviceType } =
  storeToRefs(globalStore);
const { changeSearchEngine, searchEngineList } = useSearch();
const modalStore = useModalStore();
const wallpaperStore = useWallpaperStore();
const searchAssistStore = useSearchAssistStore();
const { searchAssistList, moonshinerUrl } = storeToRefs(searchAssistStore);
const appNotesStore = useAppNotesStore();
const { showNotes } = storeToRefs(appNotesStore);

const props = defineProps({
  autofocus: Boolean
});

const keywords = ref('');
const searchLink = ref();
const searchEngines = Object.keys(searchEngineList);
const searchEngineIndex = ref();
const showSearchAssist = ref(false);
const inputValue = ref('');

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
      modalStore.openEmbeddedModal(url, keywords.value, true);
    } else if (
      (deviceType.value === 'ios' || deviceType.value === 'mobile') &&
      searchLink.value === 'https://www.bing.com/search?q='
    ) {
      let url = searchLink.value + encodeURI(keywords.value);
      modalStore.openEmbeddedModal(url, keywords.value, true);
    } else {
      window.open(searchLink.value + encodeURI(keywords.value));
    }
    keywords.value = '';
  }
};

const filteredSearchAssistList = computed(() => {
  let unFiltered = searchAssistList.value;
  let filtered = [];
  unFiltered.forEach(item => {
    if (
      item['name'].startsWith(inputValue.value) ||
      item['alt'].startsWith(inputValue.value)
    ) {
      filtered.push(item);
    }
  });
  return filtered;
});

const hanldeInput = event => {
  inputValue.value = event.target.value;
  if (
    event.target.value.startsWith('/') &&
    filteredSearchAssistList.value.length > 0
  ) {
    showSearchAssist.value = true;
  } else {
    showSearchAssist.value = false;
  }
};

const handleSearchAssist = assistId => {
  switch (assistId) {
    case 'notes':
      showNotes.value = true;
      break;
    case 'starry-eyed-moonshiner':
      if (moonshinerUrl.value.length > 0) {
        wallpaperStore.setVideoWallpaper(
          moonshinerUrl.value[
            Math.floor(Math.random() * moonshinerUrl.value.length)
          ]
        );
      }
      break;
  }
  showSearchAssist.value = false;
  keywords.value = '';
};

watch(searchEngine, () => {
  searchLink.value = searchEngineList[searchEngine.value];
  // console.log('search engine changed to: ', searchLink.value);
  globalStore.setSearchPlaceholder(searchEngine.value);
});

globalStore.setSearchEngine();
globalStore.setSearchPlaceholder(searchEngine.value);

onMounted(() => {
  searchLink.value = searchEngineList[searchEngine.value];
  searchEngineIndex.value = searchEngines.indexOf(searchEngine.value);
  searchAssistStore.initMoonshiner();
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

.search-assist-wrapper {
  position: absolute;
  bottom: calc(100vh * 0.4 * 0.6 + 20px);
  transform: translateY(100%);
  width: 400px;
  min-height: 60px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 20px;
  z-index: 1;
}

@media (max-width: 820px) {
  .search-box {
    width: 60vw;
  }

  .search-assist-wrapper {
    width: 60vw;
  }
}

@media (max-width: 600px) {
  .search-box {
    width: 70vw;
  }

  .search-assist-wrapper {
    width: 70vw;
  }
}
</style>
