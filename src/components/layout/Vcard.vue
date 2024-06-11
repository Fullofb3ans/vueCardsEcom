<script setup>
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();

const props = defineProps(["product"]);
const emits = defineEmits(["addToCartArr"]);

function addToCartArr(id, title, price) {
  emits("addToCartArr", id, title, price);
}

function aboutProduct(id) {
  // console.log(img, description, title);
  router.push({
    name: "aboutProduct",
    params: {
      id: id,
    },
  });
}
</script>

<template>
  <div class="card">
    <img :src="product.image" class="card-img-top" alt="..." />
    <h5 class="card-title" style="text-align: center">{{ product.title }}</h5>
    <div class="card-body">
      <p class="card-text">
        <b>{{ product.price + "$" }}</b>
      </p>
      <p class="card-text">{{ product.description }}</p>
    </div>
    <button @click="aboutProduct(product.id)" class="moreButton btn btn-outline-primary">
      Подробнее
    </button>
    <button
      @click="addToCartArr(product.id, product.title, product.price)"
      class="butButton btn btn-outline-primary"
    >
      Добавить в корзину
    </button>
  </div>
</template>

<style scoped>
button {
  margin: 2px;
}
.card-img-top {
  width: 200px;
  height: 200px;
  align-self: center;
  padding: 2%;
}

.card {
  width: 17rem;
  padding: 3%;
}

.card-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-text {
  margin: 0;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
