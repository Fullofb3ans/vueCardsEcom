<script setup>
import { ref } from 'vue'
const props = defineProps(["product"]);
</script>

<template>
<div class="card">
  <img :src="product.image" class="card-img-top" alt="...">
  <h5 class="card-title" style="    text-align: center;">{{ product.title }}</h5>
  <div class="card-body">
    <p class="card-text">{{product.description}}</p>
  </div>
</div>
</template>

<style scoped>

.card-img-top{
  width: 200px; height: 200px; align-self: center; padding: 2%;
}

.card{
  width: 17rem;
  padding: 3%
}

.card-title{
  white-space: nowrap; /* Текст не переносится */
    overflow: hidden; /* Обрезаем всё за пределами блока */
    text-overflow: ellipsis; 
}

.card-text{
  margin: 0; 
    -webkit-line-clamp: 2; 
    display: -webkit-box; 
    -webkit-box-orient: vertical; 
    overflow: hidden; 
}
</style>