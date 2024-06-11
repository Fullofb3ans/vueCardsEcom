<script setup>
import { ref } from "vue";
import { getProducts } from "../serverFetches";
import Vcard from "../layout/Vcard.vue";
const emits = defineEmits(["addToCartArr"]);
const searchText = ref("");

function clear() {
  searchText.value = "";
  search();
}

const searchArray = ref([]);

function addToCartArr(id, title, price) {
  emits("addToCartArr", id, title, price);
}

async function search() {
  console.log(searchText.value);
  const resp = await getProducts();
  console.log(resp);

  searchArray.value = resp.filter(
    (item) =>
      item.description.toUpperCase().includes(searchText.value.toUpperCase()) ||
      item.title.toUpperCase().includes(searchText.value.toUpperCase()) ||
      String(item.price) == searchText.value
  );
  console.log(searchArray.value);
}
</script>
<template>
  <form @submit.prevent="search">
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
  <div class="preview">
    <div class="cards">
      <Vcard
        v-if="searchArray.length !== 0"
        v-for="product in searchArray"
        :product="product"
        :key="'search' + product.id"
        @addToCartArr="addToCartArr"
      />
    </div>
  </div>
</template>

<style scoped>
#searchButton {
  transition: linear 0.2s;
  cursor: pointer;
}
#searchButton:hover {
  background-color: aqua;
}
.cards {
  padding: 1%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 30px;
  align-content: center;
  justify-content: center;
}

.preview {
  padding: 2%;
}
</style>
