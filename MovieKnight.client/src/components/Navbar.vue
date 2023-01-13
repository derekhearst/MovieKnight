<template>
  <div class="navBar">


    <router-link :to="{ name: 'Home' }">
      <img src="../assets/img/logo.png" class="logoImage" />
    </router-link>
    <form @submit.prevent="search">
      <input type="text" placeholder="Search" name="field" />
      <button class="button" type="submit">Search</button>
    </form>
    <div class="devider"></div>
    <button v-if="user.id" @click="logout" class="button">
      Logout
    </button>
    <button v-else @click="login" class="button">
      Login
    </button>
    <div v-if="account.picture || user.picture" class="accountProfile">
      <RouterLink to="/Account">
        <img src="../assets/img/profilecircle-removebg-preview.png" class="accountBorder" />
        <img :src="account.picture || user.picture" alt="account photo" class="accountPhoto" />
      </RouterLink>
    </div>


  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { logger } from '../utils/Logger.js';
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'

let router = useRouter()
let user = computed(() => AppState.user)
let account = computed(() => AppState.account)
function search(query) {

  router.push({ name: `Search`, query: { search: query.target.field.value } })
}

async function login() {
  AuthService.loginWithPopup()
}
async function logout() {
  AuthService.logout({ returnTo: window.location.origin })
}

</script>

<style scoped lang="scss">
.logoImage {
  height: 6rem;
}

.navBar {
  padding: .25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
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



form {
  display: flex;
  gap: .5rem;
  align-items: center;
  justify-content: center;
  overflow-y: visible;

  input {
    width: clamp(50px, 40vw, 500px);
    height: 3rem;
    font-size: 1.5rem;
    font-family: 'MedievalSharp', cursive;
    font-weight: bold;
    border: 3px solid goldenrod;
    border-radius: 5px;
    background-color: white;
    color: #8f1515;

    &:valid {
      border: 3px solid goldenrod;

    }

    &:focus {
      outline: none;
      border: 3px solid goldenrod;

    }

    &:focus-visible {
      outline: none;
      border: 3px solid black;

    }
  }
}

.devider {
  margin-left: auto;
}

.accountProfile {
  position: relative;
  width: 100px;
  height: 100px;
}

.accountPhoto {
  position: absolute;
  height: 100px;
  width: 100px;
  padding: .09rem;
  border-radius: 50%;
  object-fit: cover;
}

.accountBorder {
  position: absolute;
  height: 100px;
  width: 100px;
  object-fit: cover;
  z-index: 2;
}

@media (max-width:1040px) {
  .navBar {
    flex-wrap: wrap;
    justify-content: center;
  }

  .devider {
    display: none;
  }
}
</style>
