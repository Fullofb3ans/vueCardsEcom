<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const emits = defineEmits(["showToast"]);

function clearStore() {
  localStorage.clear();
  cart.value = [];
  summaryPrice.value = 0;
}

function goToCheckOut() {
  localStorage.cartArr
    ? router.push({ name: "checkout" })
    : emits("showToast", "Добавьте товар в корзину");
}

const cart = ref(JSON.parse(localStorage.getItem("cartArr")));
const summaryPrice = ref(
  cart.value ? cart.value.reduce((accum, item) => accum + item.price, 0) : 0
);
</script>

<template>
  <div class="cartTable">
    <h2>Корзина</h2>
    <table class="table table-sm table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Название</th>
          <th scope="col">Кол-во</th>
          <th scope="col">Цена</th>
        </tr>
      </thead>
      <slot v-for="item in cart">
        <tbody>
          <tr class="">
            <th scope="row">{{ cart.indexOf(item) + 1 }}</th>
            <td>{{ item.title }}</td>
            <td>{{ item.numberOf }}</td>
            <td>{{ item.price }}$</td>
          </tr>
        </tbody>
      </slot>
      <tfoot>
        <tr>
          <th colspan="4">
            <p>{{ summaryPrice }}$</p>
          </th>
        </tr>
      </tfoot>
    </table>
    <div>
      <button @click="goToCheckOut" class="butButton btn btn-outline-primary">
        Оплатить</button
      ><button @click="clearStore" class="butButton btn btn-outline-primary">
        Очистить
      </button>
    </div>
  </div>
</template>

<style scoped>
.cartTable {
  padding: 1%;
}
h2 {
  padding: 10px;
}
button {
  margin: 10px;
}
p {
  text-align: center;
  margin: auto;
}
</style>
