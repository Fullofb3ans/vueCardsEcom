<script setup>
const emits = defineEmits([]);

function loadProducts (){
  emits('loadProducts');
}
function deleteProducts (){
  emits('deleteProducts');
}

</script>
<template>
  <header>
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
   <h3> <button class="nav-link active" @click="deleteProducts" aria-current="page" href="#">Запустить лоадер</button>
  </h3></div>
</nav>
</header>
</template>

<style scoped>
.active:hover{
  color: rgb(125, 17, 142);
  transition: 0.2s;
}</style>