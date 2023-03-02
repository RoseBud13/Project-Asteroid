<template>
  <div class="search-box">
    <div class="search-input">
      <input
        v-model="keywords"
        @keyup.enter="handleInputKeyDown"
        :placeholder="$t('searchbar.input.placeholder.bing')"
        :autofocus="props.autofocus"
      />
    </div>
    <div class="search-btn" @click="handleSearchClick">
      <IconSearch></IconSearch>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import IconSearch from '@/components/icons/IconSearch.vue';

const props = defineProps({
  autofocus: Boolean
});
const keywords = ref('');
const searchLink = ref('https://www.bing.com/search?q=');

const handleSearchClick = () => {
  if (keywords.value) {
    window.open(searchLink.value + encodeURI(keywords.value));
    keywords.value = '';
  }
};

const handleInputKeyDown = () => {
  handleSearchClick();
};
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
  background-color: rgba(255, 255, 255, 0.7);
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
