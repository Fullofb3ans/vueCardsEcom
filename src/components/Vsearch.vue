<script setup>
import { ref } from "vue";
const emits = defineEmits([]);
const searchText = ref("");
function search() {
  emits("search", searchText.value);
}
function clear() {
  searchText.value = "";
  search();
}
</script>
<template>
  <form @submit.prevent = 'search'>
  <div class="input-group">
    <input
      v-model="searchText"
      type="text"
      class="form-control"
      aria-label="Dollar amount (with dot and two decimal places)"
    />
    <span @click="search" id="searchButton" class="input-group-text">Поиск</span>
    <span @click="clear" id="searchButton" class="input-group-text">Очистить</span>
  </div>
</form>
</template>

<style scoped>
#searchButton {
  transition: linear 0.2s;
  cursor: pointer;
}
#searchButton:hover {
  background-color: aqua;
}
</style>
