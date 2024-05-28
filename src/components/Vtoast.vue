<script setup>
import { ref } from "vue";

const props = defineProps(["showToast"]);
const emits = defineEmits([]);
</script>
<template>
  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div
      id="liveToast"
      class="toast"
      :class="{ show: props.showToast }"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-header">
        <strong class="me-auto"></strong>
        <button
          @click="emits('closeToast')"
          type="button"
          class="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
      <div class="toast-body">Заказ успешно оформлен</div>
    </div>
  </div>
</template>

<style scoped></style>
