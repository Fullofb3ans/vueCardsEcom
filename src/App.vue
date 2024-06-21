<template>
  <div class="layout">
    <Vheader @loginChanged="loginChanged" :admin="admin"></Vheader>
    <div class="content">
      <RouterView
        @showToast="showToastf"
        @closeToast="closeToast"
        @loginChanged="loginChanged"
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
const showToast = ref(false);
const toastText = ref("");

const admin = ref(localStorage.getItem("admin") == "true" ? true : false);
console.log(admin.value);

function loginChanged() {
  admin.value = localStorage.getItem("admin") == "true" ? true : false;
  console.log("poihali" + admin.value);
}

function showToastf(text) {
  showToast.value = false;
  setTimeout(() => (showToast.value = true), 150);

  toastText.value = text;
}

function closeToast() {
  showToast.value = false;
  toastText.value = "";
}

const cartArr = reactive([]);

function addToCartArr(id, title, price) {
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
      numberOf: 1,
      title: title,
      price: price,
    });
  }
  localStorage.setItem("cartArr", JSON.stringify(cartArr));
  showToastf("Товар добавлен в корзину");
}

router.beforeEach(async (to, from) => {
  const admin = localStorage.getItem("admin");
  if (admin !== "true" && to.name !== "login" && to.name == "adminPanel") {
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
