<script setup>
import { ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import Vtoast from "../components/Vtoast.vue";
import { configure } from "vee-validate";
configure({
  validateOnBlur: true, // controls if `blur` events should trigger validation with `handleChange` handler
  validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
  validateOnInput: true, // controls if `input` events should trigger validation with `handleChange` handler
});

const props = defineProps(["show", "productInModal"]);
const emits = defineEmits([]);
const showToast = ref(false);

function onInvalidSubmit() {
  console.log("invalid");
  showToast.value = false;
}

function closeModal() {
  emits("closeModal");
}

function closeToast() {
  showToast.value = false;
}

function submitData() {
  const userInfo = {
    'email': userEmail.value,
    'ФИО': userFio.value,
    'Адрес': userAddress.value,
    "Номер карты": userCard.value,
    "Дата рождения": userBirth.value,
    "Согласие": userAgree.value,
    "Id товара": productId.value
  };
  console.log(userInfo);
  fetch("https://httpbin.org/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  })
    .then((response) => {
      response.ok ? alert("vse good") : alert("error");
    })
    .then(() => (showToast.value = true));
}

const simpleSchema = yup.object({
  email: yup.string().required().email(),
  fio: yup.string().required(),
  address: yup.string().required(),
  card: yup.string().required().min(13),
  birth: yup.date().max(new Date()).required('Birthdate is required'),
  birth: yup.date().min(1900).required('Birthdate is required'),
  agree: yup.string().required(),
});

const userEmail = ref();
const userFio = ref();
const userAddress = ref();
const userCard = ref();
const userBirth = ref();
const userAgree = ref();
const productId = ref(props.productInModal.id);
</script>

<template>
  <Form
    :validation-schema="simpleSchema"
    @submit="submitData"
    @invalid-submit="onInvalidSubmit"
  >
    <div class="modal" :class="{ open: props.show }" tabindex="1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Ваш заказ:</h5>
            <button
              @click="closeModal"
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <h5>{{ show == true ? props.productInModal.title : "" }}</h5>
            <p>{{ show == true ? props.productInModal.description : "" }}</p>
          </div>

          <div class="modal__form">
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
                  <p>Некорректное фио'</p>
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

          <div class="modal-footer">
            <button
              type="button"
              @click="closeModal"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="submit" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </Form>
  <Vtoast @closeToast="closeToast" :showToast="showToast" />
</template>

<style>
.container-fluid:not(:first-child) {
  padding-bottom: 2%;
}
.open {
  display: block;
}

.modal{
  background: #00000087;
}
</style>