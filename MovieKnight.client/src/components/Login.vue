<template>
  <div class="userSection">
    <button v-if="user.id" @click="logout">
      Logout
    </button>
    <button v-else @click="login">
      Login
    </button>
    <router-link to="Account" class="link" v-if="user.id">
      <div>Account</div>
    </router-link>
    <div v-if="account.picture || user.picture">
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

.accountPhoto {
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

button {
  background-color: maroon;
  color: #fbcf33;
  border: none;
  border-radius: 5px;
  padding: .5rem;
  font-size: 1.5rem;
  cursor: pointer;

}

.link {
  color: #fbcf33;
  text-decoration: none;
  font-size: 1.5rem;
}
</style>
