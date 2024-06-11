<script setup>
import { ref, onUpdated } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps(["admin"]);
const emits = defineEmits([]);

function exitFromLk() {
  localStorage.setItem("admin", "false");
  router.push({
    name: "home",
  });
  emits("loginChanged");
}
</script>
<template>
  <div>
    <header>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <router-link :to="{ name: 'home' }">Главная</router-link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link :to="{ name: 'search' }">Поиск</router-link>
              </li>
              <li class="nav-item" :class="{ none: admin }">
                <router-link :to="{ name: 'login' }">Войти</router-link>
              </li>
              <li class="nav-item" :class="{ none: !admin }">
                <router-link :to="{ name: 'adminPanel' }">Добавить товар</router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'cart' }">Корзина</router-link>
              </li>
              <li class="nav-item" :class="{ none: !admin }">
                <a @click="exitFromLk">Выйти</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<style scoped>
.router-link-active {
  text-decoration: underline;
}
.router-link-active:hover {
  text-decoration: underline;
}
.router-link-exact-active {
  color: rgb(14, 142, 50) !important;
}

.router-link {
  transition: 0.2s;
}

.none {
  display: none;
}
h1 {
  font-size: 22px;
}
.navbar-nav {
  gap: 30px;
}
#navbarNav {
  justify-content: space-around;
}
.nav-item > a {
  color: rgba(var(--bs-link-color-rgb), var(--bs-link-opacity, 1));
  text-decoration: underline;
  cursor: pointer;
}
a:hover {
  color: rgba(var(--bs-link-color-rgb), var(--bs-link-opacity, 1)) !important;
  text-decoration: underline !important;
}
</style>
