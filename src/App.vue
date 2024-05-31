<script setup>
import Vheader from "./components/Vheader.vue";
import Vcard from "./components/Vcard.vue";
import Vfooter from "./components/Vfooter.vue";
import { reactive, ref, onBeforeMount, onMounted } from "vue";
import Vloader from "./components/Vloader.vue";
import Vsearch from "./components/Vsearch.vue";
import Vmodal from "./components/Vmodal.vue";

const products = ref([]);
const searchArray = ref([]);
const show = ref(false);
const idProduct = ref();
const productInModal = ref("");

onBeforeMount(() => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((dat) => {
      products.value = dat;
    });
  console.log(products);
});

function search(text) {
  searchArray.value = products.value.filter(
    (item) => item.description.includes(text) || item.title.includes(text) || String(item.price).includes(text)
  );
  console.log(searchArray.value);
}

function callBuyModal(id) {
  productInModal.value = products.value.find((item) => item.id == id);
  show.value = true;
  console.log(show.value);
}

function closeModal() {
  show.value = false;
}

</script>

<template>
  <div>
  <Vheader />
  <Vsearch @search="search" />

  <main>
    <body>
      <div class="preview" style="padding: 2%">
        <Vloader v-if="products.length == 0" />

        <div v-else class="cards" style="">
          <Vcard
            v-if="searchArray.length !== 0"
            v-for="product in searchArray"
            :product="product"
            @callBuyModal="callBuyModal"
            :key="'search' + product.id"
          />

          <Vcard
            v-else
            v-for="product in products"
            :product="product"
            @callBuyModal="callBuyModal"
            :key="product.id"
          />
        </div>
        <Vmodal
          :show="show"
          :productInModal="productInModal"
          @closeModal="closeModal"
        />
      </div>
    </body>
  </main>
  <Vfooter />
</div>
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
</style>
