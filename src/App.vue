<template>
  <div class="layout">
    <Vheader />
    <div class="content">
      <RouterView
        @showToast="showToastf"
        @closeToast="closeToast"
        @addToCartArr="addToCartArr"
      ></RouterView>
      <Vtoast @closeToast="closeToast" :showToast="showToast" :toastText="toastText" />
    </div>
    <Vfooter />
  </div>
</template>

<script setup>
import Vheader from "./components/layout/Vheader.vue";
import Vfooter from "./components/layout/Vfooter.vue";
import Vtoast from "./components/Vtoast.vue";
import { ref, reactive } from "vue";
import router from "./router";

import { useCatalogStore } from "./stores/catalog";
import { useUserStore } from "./stores/user";
import { useCartStore } from "./stores/cart";
const user = useUserStore();
const cart = useCartStore();
const catalog = useCatalogStore();

catalog.loadCatalog();

const showToast = ref(false);
const toastText = ref("");

function showToastf(text) {
  showToast.value = false;
  setTimeout(() => (showToast.value = true), 150);

  toastText.value = text;
}

function closeToast() {
  showToast.value = false;
  toastText.value = "";
}

function addToCartArr(id, title, price) {
  cart.addToCart(id, title, price);
  showToastf("Товар добавлен в корзину");
}

router.beforeEach(async (to, from) => {
  console.log(user.admin);
  if (user.admin !== true && to.name !== "login" && to.name == "adminPanel") {
    showToastf("Для добавления товара необходимо авторизоваться");
    return { name: "login" };
  }
});
</script>

<style>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.content {
  flex: 1;
}
footer {
  padding: 10px;
}
</style>
