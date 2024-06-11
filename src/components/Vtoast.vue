<script setup>
import { ref } from "vue";
const props = defineProps(["showToast", "toastText"]);
const emits = defineEmits(["closeToast"]);
function closeToast() {
  emits("closeToast");
}
</script>
<template>
  <div class="toast-container position-fixed top-0 end-0 p-3">
    <div
      @click="console.log(props)"
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
          @click="closeToast"
          type="button"
          class="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
      <div class="toast-body">{{ props.toastText }}</div>
    </div>
  </div>
</template>

<style scoped>
.show {
  display: block;
}

.toast-header {
  background: #0d6efd;
}
</style>
