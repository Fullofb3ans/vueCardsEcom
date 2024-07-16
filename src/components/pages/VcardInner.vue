<script setup>
import { onMounted, ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getProduct } from "../serverFetches";
import { useCartStore } from "@/stores/cart";
const emits = defineEmits(["showToast"]);
const route = useRoute();
const product = ref([]);

const cart = useCartStore();

function addToCartArr(id, title, price) {
  cart.addToCart(id, title, price);
  emits("showToast", "Товар добавлен в корзину");
}

onMounted(async () => {
  product.value = await getProduct(route.params.id);
});
</script>

<template>
  <div class="container text-center">
    <div class="preview">
      <div class="row">
        <div class="col-6">
          <img :src="product.image" />
        </div>

        <div class="col-6 product__text">
          <h4>{{ product.title }}</h4>
          <p>
            {{ product.description }}
          </p>
          <div>
            <button
              @click="addToCartArr(product.id, product.title, product.price)"
              class="butButton btn btn-outline-primary"
            >
              Добавить в корзину
            </button>
          </div>
        </div>
      </div>
      <div class="row justify-content-md-center"></div>
    </div>
  </div>
</template>

<style scoped>
.product__text {
  text-align: justify;
}
.row {
  padding-bottom: 5%;
}
.preview {
  padding: 1%;
}
img {
  max-width: 80%;
}
button {
  width: 100%;
}
h5 {
  text-align: left;
}
</style>
