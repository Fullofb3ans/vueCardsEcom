<script setup>
const copyright = "©" + new Date().getFullYear();
</script>
<template>
  <div>
    <footer>
      <ul class="nav justify-content-start">
        <li class="nav-item">
          <p class="copyright">{{ copyright }}</p>
        </li>
      </ul>
    </footer>
  </div>
</template>
<style>
.copyright {
  color: rgb(3, 67, 122);
}
</style>
