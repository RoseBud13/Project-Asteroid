<template>
  <div class="search-box">
    <div class="search-box-border-effect" v-if="showSearchAssist"></div>
    <div class="search-box-content">
      <div class="search-input">
        <input
          ref="searchInput"
          v-model="keywords"
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
  </div>
  <div class="search-assist-wrapper" v-if="showSearchAssist">
    <AstraDropdownOption
      v-for="item in filteredSearchAssistList"
      :key="item.id"
      :selected="item.id === selectedID"
      @click="handleSearchAssist(item.id)"
      >{{ $t(item.name) }}</AstraDropdownOption
    >
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed, inject } from 'vue';
import { storeToRefs } from 'pinia';
import { useGlobal } from '@/stores/global';
import { useModalStore } from '@/stores/modal';
import { useWallpaperStore } from '@/stores/wallpaper';
import { useSearchAssistStore } from '@/stores/searchAssist';
import { useAppNotesStore } from '@/stores/appNotes';
import useLocale from '@/hooks/locale';
import IconSearch from '@/components/icons/IconSearch.vue';
import AstraDropdownOption from '@/components/basics/dropdown/DropdownOption.vue';
import useSearch from './search';

const toast = inject('toast');
const { i18 } = useLocale();

const globalStore = useGlobal();
const { searchEngine, isFullscreen, searchPlaceholder, deviceType } =
  storeToRefs(globalStore);
const { changeSearchEngine, searchEngineList } = useSearch();
const modalStore = useModalStore();
const wallpaperStore = useWallpaperStore();
const searchAssistStore = useSearchAssistStore();
const {
  showSearchAssist,
  searchAssistList,
  moonshinerUrl,
  latestMoonshinerIndex
} = storeToRefs(searchAssistStore);
const appNotesStore = useAppNotesStore();

const props = defineProps({
  autofocus: Boolean
});

const keywords = ref('');
const searchLink = ref();
const searchEngines = Object.keys(searchEngineList);
const searchEngineIndex = ref();
const inputValue = ref('');
const selectedIndex = ref(-1);
const selectedID = ref('');
const searchInput = ref(null);
const addNotesFlag = ref(false);
const moonshinerIndex = ref(null);

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

const handleSearch = event => {
  // isComposing to check if compositionstart event is fired
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionstart_event
  if (keywords.value && !event.isComposing) {
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
      item['matchText'].startsWith(inputValue.value) ||
      item['alt'].startsWith(inputValue.value) ||
      item['alt1'].startsWith(inputValue.value)
    ) {
      filtered.push(item);
      selectedIndex.value = -1;
      selectedID.value = '';
    }
  });
  return filtered;
});

const addNotesCommand = () => {
  let content = inputValue.value.substring(inputValue.value.indexOf(' ') + 1);
  appNotesStore.addNewNote(content);
  addNotesFlag.value = false;
  keywords.value = '';
};

const hanldeInput = event => {
  inputValue.value = event.target.value;
  if (
    (event.target.value.startsWith('/notes ') ||
      event.target.value.startsWith('/Notes ') ||
      event.target.value.startsWith('/便签 ')) &&
    event.target.value.split(' ').length > 1 &&
    event.target.value.split(' ')[1] !== ''
  ) {
    appNotesStore.initNotes();
    addNotesFlag.value = true;
  } else {
    addNotesFlag.value = false;
  }
  if (
    event.target.value.startsWith('/') &&
    filteredSearchAssistList.value.length > 0
  ) {
    searchAssistStore.toggleShowSearchAssist(true);
  } else {
    searchAssistStore.toggleShowSearchAssist(false);
  }
  if (filteredSearchAssistList.value.length === 1) {
    selectedID.value = filteredSearchAssistList.value[0]['id'];
  }
};

const handleSearchAssist = assistId => {
  switch (assistId) {
    case 'notes':
      appNotesStore.toggleNotes();
      break;
    case 'starry-eyed-moonshiner':
      if (moonshinerUrl.value.length > 0) {
        moonshinerIndex.value = Math.floor(
          Math.random() * moonshinerUrl.value.length
        );
        if (latestMoonshinerIndex.value) {
          while (moonshinerIndex.value === latestMoonshinerIndex.value) {
            moonshinerIndex.value = Math.floor(
              Math.random() * moonshinerUrl.value.length
            );
          }
        }
        latestMoonshinerIndex.value = moonshinerIndex.value;
        wallpaperStore.setVideoWallpaper(
          moonshinerUrl.value[latestMoonshinerIndex.value]
        );
      }
      break;
    default:
      toast(i18.t('searchbar.assist.shortcut.unavailable'), 'warn');
  }
  searchAssistStore.toggleShowSearchAssist(false);
  keywords.value = '';
};

const handleArrowKeySelect = event => {
  let maxIndex = filteredSearchAssistList.value.length - 1;
  if (event.code === 'ArrowDown') {
    if (selectedIndex.value < maxIndex) {
      selectedIndex.value++;
    } else {
      selectedIndex.value = 0;
    }
  } else if (event.code === 'ArrowUp') {
    if (selectedIndex.value > 0) {
      selectedIndex.value--;
    } else {
      selectedIndex.value = maxIndex;
    }
  } else if (event.code === 'Enter') {
    if (selectedID.value !== '') {
      handleSearchAssist(selectedID.value);
      selectedID.value = '';
    }
  }
  if (selectedIndex.value !== -1) {
    selectedID.value =
      filteredSearchAssistList.value[selectedIndex.value]['id'];
  } else {
    selectedID.value = '';
  }
};

watch(searchEngine, () => {
  searchLink.value = searchEngineList[searchEngine.value];
  // console.log('search engine changed to: ', searchLink.value);
  globalStore.setSearchPlaceholder(searchEngine.value);
});

watch(
  showSearchAssist,
  () => {
    if (showSearchAssist.value === true) {
      window.addEventListener('keydown', handleArrowKeySelect);
      searchInput.value.addEventListener('keydown', e => {
        if (e.code === 'ArrowDown' || e.code === 'ArrowUp') {
          e.preventDefault();
        }
      });
    } else {
      window.removeEventListener('keydown', handleArrowKeySelect);
      searchInput.value.removeEventListener('keydown', e => {
        if (e.code === 'ArrowDown' || e.code === 'ArrowUp') {
          e.preventDefault();
        }
      });
    }
  },
  { deep: true }
);

globalStore.setSearchEngine();
globalStore.setSearchPlaceholder(searchEngine.value);

onMounted(() => {
  searchLink.value = searchEngineList[searchEngine.value];
  searchEngineIndex.value = searchEngines.indexOf(searchEngine.value);
  searchAssistStore.initMoonshiner();
  searchInput.value.addEventListener('keydown', e => {
    if (
      e.code === 'Enter' &&
      showSearchAssist.value === false &&
      addNotesFlag.value === false
    ) {
      handleSearch(e);
    } else if (e.code === 'Enter' && addNotesFlag.value === true) {
      addNotesCommand();
    }
  });
});

onBeforeUnmount(() => {
  searchInput.value.removeEventListener('keydown', e => {
    if (
      e.code === 'Enter' &&
      showSearchAssist.value === false &&
      addNotesFlag.value === false
    ) {
      handleSearch(e);
    } else if (e.code === 'Enter' && addNotesFlag.value === true) {
      addNotesCommand();
    }
  });
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
  width: 401px;
  height: 41px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.search-box-border-effect {
  background-image: linear-gradient(in hsl longer hue 90deg, red 0 0);
  position: absolute;
  left: 0;
  top: -180px;
  width: 401px;
  height: 401px;
  animation: 6s infinite linear rotate;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.search-box-content {
  display: flex;
  background-color: #fff;
  border-radius: 20px;
  width: 398px;
  height: 38px;
}

.search-input {
  position: relative;
  flex: 1;
  margin: 4px 4px 4px 10px;
}

.search-input input {
  margin: 0 10px;
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
  width: 38px;
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

  .search-box-border-effect {
    width: 60vw;
    height: 60vw;
    top: calc(-60vw / 2);
  }

  .search-box-content {
    width: calc(60vw - 3px);
  }
}

@media (max-width: 600px) {
  .search-box {
    width: 70vw;
  }

  .search-assist-wrapper {
    width: 70vw;
  }

  .search-box-border-effect {
    width: 70vw;
    height: 70vw;
  }

  .search-box-content {
    width: calc(70vw - 3px);
  }
}
</style>
