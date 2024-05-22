<script setup>
import { ref } from 'vue'
const props = defineProps(["product"]);

function checkLength(item){
    let text = '';
        for (let i = 0; i < item.length; i++) {
            if(i <= 50){
            text += item[i];
        }
        }
    return text;
}
</script>

<template>
<div class="card"  style="width: 17rem;">
  <img :src="product.image" class="card-img-top" alt="..." style="width: 200px; height: 200px; align-self: center; padding: 2%">
  <h5 class="card-title" style="    text-align: center;">{{ product.title }}</h5>
  <div class="card-body">
    <p class="card-text">{{checkLength(product.description)  + '...'}}</p>
  </div>
</div>
</template>