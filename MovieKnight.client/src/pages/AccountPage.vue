<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { accountService } from "../services/AccountService.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
export default {
  setup() {
    onMounted(()=>{
    })
    return {
      account: computed(() => AppState.account),
      myMovies: computed(()=> AppState.myMovies),
      favoriteMovies: computed(()=> AppState.myFavoriteMovies),
      events: computed(()=> AppState.myEvents),
      groups: computed(()=> AppState.myGroups),

    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
