<template>

  <div class="navBar">
    <div>
      <router-link class="" :to="{ name: 'Home' }">
        <img src="../assets/img/logo.png" class="logoImage" />
      </router-link>
    </div>
    <SearchBar />
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
  height: 80px;
  filter: sepia(100%) saturate(100000000%) hue-rotate(339deg) brightness(100%) contrast(100%)
}

.navBar {
  padding: .25rem;
  display: flex;
  justify-content: space-between;
  background-color: maroon;
  ;
}
</style>
