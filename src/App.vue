<script setup>
import Vheader from "./components/Vheader.vue";
import Vcard from "./components/Vcard.vue";
import Vfooter from "./components/Vfooter.vue";
import { reactive, ref, onBeforeMount, onMounted } from 'vue';
import Vloader from "./components/Vloader.vue";
import getProducts from "./components/serversFetches"
const products = ref([]);
// на reactive
// const products  = reactive({
//   items: null
// });

onBeforeMount(async ()=>{
 products.value = await getProducts();
 console.log(products);
})

</script>

<template>
  <Vheader/>
  <main>
  <div class="preview">
  <Vloader v-if="products.length == 0"/>
  <!-- <Vloader v-if="products.items == null"/> -->
  
  <div v-else class="cards">
   <!--  <Vcard v-for="product in products.items" -->
    <Vcard v-for="product in products"
    :product="product"
    :key="product.id"/>
  </div>

</div>
  </main>
  <Vfooter />
</template>

<style scoped>
.cards{
  padding: 1%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 30px;
    align-content: center;
    justify-content: center;
}

.preview{
  padding: 2%;
}

</style>
<style>
html {
  margin-left: calc(100vw - 100%);
  margin-right: 0;
}</style>
