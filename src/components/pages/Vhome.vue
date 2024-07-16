<script setup>
import Vcard from "@/components/layout/Vcard.vue";
import Vloader from "../Vloader.vue";

import { useCatalogStore } from "@/stores/catalog";

const catalog = useCatalogStore();

console.log(catalog.isLoading);

const emits = defineEmits(["showToast", "addToCartArr"]);

function addToCartArr(id, title, price) {
  emits("addToCartArr", id, title, price);
}
</script>

<template>
  <main>
    <div class="preview">
      <Vloader v-if="catalog.isLoading || catalog.isEmpty" />
      <div v-else class="cards">
        <Vcard
          v-for="product in catalog.catalog"
          :product="product"
          :key="product.id"
          @addToCartArr="addToCartArr"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
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
