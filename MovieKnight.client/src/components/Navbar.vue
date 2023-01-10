<template>

  <div class="navBar">
    <div class="navLeft">
      <router-link class="" :to="{ name: 'Home' }">
        <img src="../assets/img/logo.png" class="logoImage" />
      </router-link>
      <SearchBar />
    </div>
    <Login />

  </div>

</template>

<script>
import Login from './Login.vue'
import SearchBar from "./SearchBar.vue";
export default {
  setup() {
    return {}
  },
  components: { Login, SearchBar }
}
</script>

<style scoped>
.logoImage {
  height: 90px;
  width: 225px;
  filter: sepia(100%) saturate(100000000%) hue-rotate(339deg) brightness(100%) contrast(100%)
}

.navBar {
  padding: .25rem;
  display: flex;
  justify-content: space-between;

  background-color: maroon;
}

.navLeft {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
