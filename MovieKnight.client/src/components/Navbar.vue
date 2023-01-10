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
  filter: sepia(100%) saturate(100000000%) hue-rotate(343deg) brightness(97%) contrast(59%)
}

.navBar {
  padding: .25rem;
  display: flex;
  justify-content: space-between;
  background:
    radial-gradient(hsl(0, 100%, 27%) 4%, hsl(0, 100%, 18%) 9%, hsla(0, 100%, 20%, 0) 9%) 0 0,
    radial-gradient(hsl(0, 100%, 27%) 4%, hsl(0, 100%, 18%) 8%, hsla(0, 100%, 20%, 0) 10%) 50px 50px,
    radial-gradient(hsla(0, 100%, 30%, 0.8) 20%, hsla(0, 100%, 20%, 0)) 50px 0,
    radial-gradient(hsla(0, 100%, 30%, 0.8) 20%, hsla(0, 100%, 20%, 0)) 0 50px,
    radial-gradient(hsla(0, 100%, 20%, 1) 35%, hsla(0, 100%, 20%, 0) 60%) 50px 0,
    radial-gradient(hsla(0, 100%, 20%, 1) 35%, hsla(0, 100%, 20%, 0) 60%) 100px 50px,
    radial-gradient(hsla(0, 100%, 15%, 0.7), hsla(0, 100%, 20%, 0)) 0 0,
    radial-gradient(hsla(0, 100%, 15%, 0.7), hsla(0, 100%, 20%, 0)) 50px 50px,
    linear-gradient(45deg, hsla(0, 100%, 20%, 0) 49%, hsla(0, 100%, 0%, 1) 50%, hsla(0, 100%, 20%, 0) 70%) 0 0,
    linear-gradient(-45deg, hsla(0, 100%, 20%, 0) 49%, hsla(0, 100%, 0%, 1) 50%, hsla(0, 100%, 20%, 0) 70%) 0 0;
  background-color: #300;
  background-size: 100px 100px;
  border-bottom: 1px solid #fbd03393;
}

.navLeft {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
