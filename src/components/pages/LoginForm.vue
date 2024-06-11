<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { configure } from "vee-validate";
configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
});
const router = useRouter();

// const toastText = ref("Вы авторизованы, можете добавить товар на страницу");
const emits = defineEmits(["showToast", "loginChanged"]);

function autorize() {
  const userInfo = {
    email: userEmail.value,
    password: userPass.value,
  };
  console.log(userInfo);

  localStorage.setItem("admin", "true");

  emits("showToast", "Вы авторизованы, можете добавить товар на страницу");

  router.push({ name: "adminPanel" });
  emits("loginChanged");
}

const simpleSchema = yup.object({
  email: yup.string().required().email(),
});

const userEmail = ref();
const userPass = ref();
</script>

<template>
  <h4>Авторизация</h4>
  <div class="loginForm">
    <Form :validation-schema="simpleSchema" @submit="autorize">
      <div class="input-group mb-3">
        <label for="emailInput" class="form-label">Email:</label>
        <Field
          v-model="userEmail"
          placeholder="name@example.com"
          class="form-control"
          type="email"
          id="emailInput"
          name="email"
        />
        <ErrorMessage as="div" name="email">
          <p>Некорректный email</p>
        </ErrorMessage>
      </div>

      <div class="input-group mb-3">
        <label for="passInput" class="form-label">Пароль:</label>
        <Field
          v-model="userPass"
          placeholder=""
          class="form-control"
          type="password"
          id="passInput"
          name="password"
        />
        <button class="btn btn-outline-primary">Войти</button>
      </div>
    </Form>
  </div>
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
h4 {
  padding-top: 1%;
  margin: auto;
  text-align: center;
}
</style>
