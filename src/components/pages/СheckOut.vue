<script setup>
import { ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { configure } from "vee-validate";
configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
});

const emits = defineEmits([]);

const cart = ref(localStorage.getItem("cartArr"));

function onInvalidSubmit() {
  console.log("invalid");
  emits("closeToast");
}

function closeToast() {
  emits("closeToast");
}

function submitData() {
  const userInfo = {
    email: userEmail.value,
    ФИО: userFio.value,
    Адрес: userAddress.value,
    "Номер карты": userCard.value,
    "Дата рождения": userBirth.value,
    Согласие: userAgree.value,
    Товары: cart.value,
  };
  console.log(userInfo);
  fetch("https://httpbin.org/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  }).then((response) => {
    response.ok ? emits("showToast", "Заказ оформлен") : alert("error");
  });
}

const simpleSchema = yup.object({
  email: yup.string().required().email(),
  fio: yup.string().required(),
  address: yup.string().required(),
  card: yup.string().required().min(13),
  birth: yup.date().max(new Date()).required("Birthdate is required"),
  birth: yup.date().min(1900).required("Birthdate is required"),
  agree: yup.string().required(),
});

const userEmail = ref();
const userFio = ref();
const userAddress = ref();
const userCard = ref();
const userBirth = ref();
const userAgree = ref();
</script>

<template>
  <div class="preview">
    <Form
      :validation-schema="simpleSchema"
      @submit="submitData"
      @invalid-submit="onInvalidSubmit"
    >
      <div class="checkout" tabindex="1">
        <div class="checkout-dialog">
          <div class="checkout-content">
            <div class="checkout-header">
              <h5 class="checkout-title">Ваш заказ:</h5>
            </div>
            <div class="checkout-body"></div>

            <div class="checkout__form">
              <div class="mb-3">
                <div class="container-fluid">
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

                <div class="container-fluid">
                  <label for="fioInput" class="form-label">Ваше ФИО:</label>
                  <Field
                    v-model="userFio"
                    placeholder="ФИО"
                    class="form-control"
                    type="text"
                    id="fioInput"
                    name="fio"
                  />
                  <ErrorMessage as="div" name="fio">
                    <p>Некорректное фио</p>
                  </ErrorMessage>
                </div>

                <div class="container-fluid">
                  <label for="addressInput" class="form-label">Адрес:</label>
                  <Field
                    v-model="userAddress"
                    name="address"
                    type="text"
                    class="form-control"
                    id="addressInput"
                    placeholder="г. Москва, ..."
                  />
                  <ErrorMessage as="div" name="address">
                    <p>Некорректный адрес</p>
                  </ErrorMessage>
                </div>

                <div class="container-fluid">
                  <label for="cardInput" class="form-label">Номер карты:</label>
                  <Field
                    v-model="userCard"
                    name="card"
                    type="text"
                    class="form-control"
                    id="cardInput"
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                  />
                  <ErrorMessage as="div" name="card">
                    <p>Некорректный номер карты</p>
                  </ErrorMessage>
                </div>
                <div class="container-fluid">
                  <label for="birthInput" class="form-label">Дата рождения:</label>
                  <Field
                    v-model="userBirth"
                    name="birth"
                    type="date"
                    class="form-control"
                    id="birthInput"
                    placeholder="xx.xx.xxxx"
                  />
                  <ErrorMessage as="div" name="birth">
                    <p>Некорректная дата рождения</p>
                  </ErrorMessage>
                </div>
                <div class="container-fluid">
                  <div class="form-check">
                    <label class="form-check-label" for="agreeInput">Согласие</label>
                    <Field
                      v-model="userAgree"
                      name="agree"
                      type="checkbox"
                      class="form-check-input"
                      id="agreeInput"
                      true-value="Согласен"
                      false-value="Не согласен"
                      :value="true"
                    />
                    <ErrorMessage as="div" name="agree">
                      <p>Пропущено согласие</p>
                    </ErrorMessage>
                  </div>
                </div>
              </div>
            </div>

            <div class="checkout-footer">
              <button type="submit" class="btn btn-primary">Оформить</button>
            </div>
          </div>
        </div>
      </div>
    </Form>
  </div>
</template>

<style>
.preview {
  padding: 2%;
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

.checkout {
  max-width: 50%;
  margin: auto;
  padding: 2%;
  border: 1px solid #00000033;
  background: aliceblue;
  border-radius: 30px;
}
button {
  margin: 3px;
}
</style>
