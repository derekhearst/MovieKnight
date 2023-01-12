<template>
  <div class="container-fluid">
        <div class="about text-center">
          <h1>Welcome {{ account.name }}</h1>
          <img class="rounded" :src="account.picture" alt="" />
          <p>{{ account.email }}</p>
          <p>{{ account.name }}</p>
          <p>{{ account.picture }}</p>
        </div>
        <div class="about text-center">
          <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
          Button with data-target
        </button>
        <div class="collapse" id="collapseExample">
          <div class="bg-dark text-center">
            <form class="">
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
              </div>
              <div class="form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
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
