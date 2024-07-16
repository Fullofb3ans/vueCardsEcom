<script setup>
import { useCartStore } from "@/stores/cart";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const emits = defineEmits(["showToast"]);
const cart = useCartStore();

function goToCheckOut() {
  cart.cart
    ? router.push({ name: "checkout" })
    : emits("showToast", "Добавьте товар в корзину");
}
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
      <slot v-for="(item, index) in cart.cart" :key="index">
        <tbody>
          <tr class="">
            <th scope="row">{{ cart.cart.indexOf(item) + 1 }}</th>
            <td>{{ item.title }}</td>
            <td>{{ item.numberOf }}</td>
            <td>{{ item.price }}$</td>
          </tr>
        </tbody>
      </slot>
      <tfoot>
        <tr>
          <th colspan="4">
            <p>{{ cart.summaryPrice }}$</p>
          </th>
        </tr>
      </tfoot>
    </table>
    <div>
      <button @click="goToCheckOut" class="butButton btn btn-outline-primary">
        Оплатить</button
      ><button @click="cart.cleanCart" class="butButton btn btn-outline-primary">
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
