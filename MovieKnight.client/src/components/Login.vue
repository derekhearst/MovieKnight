<template>
  <div class="userSection">
    <button v-if="user.id" @click="logout" class="goodButton">
      Logout
    </button>
    <button v-else @click="login" class="goodButton">
      Login
    </button>
    <router-link to="Account" class="link" v-if="user.id">
      <div class="goodButton">Account</div>
    </router-link>
    <div v-if="account.picture || user.picture" class="accountProfile">
      <img src="../assets/img/profilecircle-removebg-preview.png" class="accountBorder" />
      <img :src="account.picture || user.picture" alt="account photo" class="accountPhoto" />
    </div>


  </div>
</template>

<script setup>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'

let user = computed(() => AppState.user)
let account = computed(() => AppState.account)
async function login() {
  AuthService.loginWithPopup()
}
async function logout() {
  AuthService.logout({ returnTo: window.location.origin })
}


</script>

<style lang="scss" scoped>
.userSection {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .75rem;
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


.goodButton {
  background-image: url("../assets/img/goodsecondarybutton-removebg-preview.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  text-align: center;
  height: 4rem;
  width: 14rem;
  border: none;
  color: black;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: .1rem;
  background-color: transparent;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: 'MedievalSharp', cursive;

}
</style>
