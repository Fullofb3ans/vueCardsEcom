<script setup>
import { ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { configure } from "vee-validate";
const emits = defineEmits([]);
configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
});

function addOk() {
  emits("showToast", "Товар успешно добавлен на витрину");
}
function addBad() {
  emits("showToast", "Что-то пошло не так");
}

function addNewProduct() {
  fetch("https://fakestoreapi.com/products", {
    method: "POST",
    body: JSON.stringify({
      title: productTitle.value,
      price: productPrice.value,
      description: productDescription.value,
      image: productImg.value,
      category: productCategory.value,
    }),
  })
    .then((res) => res.json())
    .then((json) => (json ? addOk() : addBad()));
}

const simpleSchema = yup.object({
  productTitle: yup.string().required(),
  productImg: yup.string().required(),
  productDescription: yup.string().required(),
  productPrice: yup.number().required(),
  productCategory: yup.string().required(),
});

const productTitle = ref();
const productImg = ref();
const productDescription = ref();
const productPrice = ref();
const productCategory = ref();
const admin = ref(localStorage.getItem("admin"));
</script>

<template>
  <h4>Добавление товара</h4>
  <div class="loginForm">
    <Form :validation-schema="simpleSchema" @submit="addNewProduct">
      <div class="input-group mb-3">
        <label for="productTitle" class="form-label">Название:</label>
        <Field
          v-model="productTitle"
          placeholder="Название"
          class="form-control"
          type="text"
          id="productTitle"
          name="productTitle"
        />
        <ErrorMessage as="div" name="productTitle">
          <p>Некорректное название</p>
        </ErrorMessage>
      </div>
      <div class="input-group mb-3">
        <label for="productPrice" class="form-label">Цена:</label>
        <Field
          v-model="productPrice"
          placeholder=".......Р"
          class="form-control"
          type="text"
          id="productPrice"
          name="productPrice"
        />
        <ErrorMessage as="div" name="productPrice">
          <p>Некорректная цена</p>
        </ErrorMessage>
      </div>
      <div class="input-group mb-3">
        <label for="productDescription" class="form-label">Описание:</label>
        <Field
          v-model="productDescription"
          placeholder="......."
          class="form-control"
          type="text"
          id="productDescription"
          name="productDescription"
        />
        <ErrorMessage as="div" name="productDescription">
          <p>Некорректное описание</p>
        </ErrorMessage>
      </div>
      <div class="input-group mb-3">
        <label for="productImg" class="form-label">Изображение:</label>
        <Field
          v-model="productImg"
          class="form-control"
          type="file"
          id="productImg"
          name="productImg"
        />
      </div>
      <div class="input-group mb-3">
        <label for="productCategory" class="form-label">Категория:</label>
        <Field
          v-model="productCategory"
          placeholder=""
          class="form-control"
          type="text"
          id="productCategory"
          name="productCategory"
        />
        <ErrorMessage as="div" name="productCategory">
          <p>Некорректная категория</p>
        </ErrorMessage>
      </div>
      <button class="btn btn-outline-primary">Добавить</button>
    </Form>
  </div>
  <!-- <div v-else><h5>Страница требует авторизации</h5></div> -->
</template>

<style scoped>
input {
  width: 100% !important;
}

button {
  /* padding: 10px; */
  margin-top: 10px;
}
.container-fluid:not(:first-child) {
  padding-bottom: 2%;
}
.open {
  display: block;
}

.modal {
  background: #00000087;
}

.loginForm {
  border-radius: 25px;
  background-color: #f0f8ffb3;
  display: flex;
  flex-direction: column;
  margin: 2% auto;
  border: solid 1px gray;
  width: 50%;
  padding: 30px;
}

.mb-3 {
  place-content: center;
  display: block;
}
h4,
h5 {
  padding-top: 1%;
  margin: auto;
  text-align: center;
}
h5 {
  color: red;
}
</style>
