<script setup>
import Vcard from "@/components/layout/Vcard.vue";
import Vfooter from "@/components/layout/Vfooter.vue";
import { reactive, ref, onBeforeMount, onMounted } from "vue";
import Vloader from "@/components/Vloader.vue";
import { getProducts } from "@/components/serverFetches";

const products = ref([]);
const emits = defineEmits(["showToast", "addToCartArr"]);

onBeforeMount(async () => {
  products.value = await getProducts();
});

function addToCartArr(id, title, price) {
  emits("addToCartArr", id, title, price);
}
</script>

<template>
  <main>
    <div class="preview">
      <Vloader v-if="products.length == 0" />
      <div class="cards">
        <Vcard
          v-for="product in products"
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
