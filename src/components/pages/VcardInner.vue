<script setup>
import { onMounted, ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getProduct } from "../serverFetches";
const route = useRoute();
const product = ref([]);
const emits = defineEmits([]);

function addToCartArr(id, title, price) {
  const cartArr =
    JSON.parse(localStorage.getItem("cartArr")) == null
      ? []
      : JSON.parse(localStorage.getItem("cartArr"));
  if (cartArr.length == 0) {
    cartArr.push({
      id: id,
      numberOf: 1,
      title: title,
      price: price,
    });
  } else if (cartArr.some((item) => item.id == id)) {
    cartArr.map((item) => {
      item.id == id ? (item.numberOf += 1) : "";
    });
  } else {
    cartArr.push({
      id: id,
      title: title,
      numberOf: 1,
      price: price,
    });
  }
  localStorage.setItem("cartArr", JSON.stringify(cartArr));
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
