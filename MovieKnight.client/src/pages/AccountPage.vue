<template>
  <div class="container-fluid">
    <section class="row justify-content-center">

      <div class="about text-center col-8">
        <h1>Welcome {{ account.name }}</h1>
        <img class="rounded" :src="account.picture" alt="" />
        <p>{{ account.email }}</p>
        </div>
        <div class="about text-center col-5">
          <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
            Edit Account
          </button>
          <div class="collapse" id="collapseExample">
            <div class="bg-dark text-center">
              <form @submit.prevent="editAccount">
                <div class="form-group">
                  <label for="exampleInputEmail1">Name</label>
                  <input v-model="editable.name" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" :placeholder=account.name>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input v-model="editable.picture" type="text" class="form-control" id="exampleInputPassword1" :placeholder=account.picture>
                </div>
                <button type="submit" class="btn btn-success">Save Changes</button>
              </form>
            </div>
          </div>
        </div>
      </section>
      </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { AppState } from '../AppState'
import { accountService } from "../services/AccountService.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
export default {
  setup() {
    const editable = ref({})
    onMounted(()=>{
    })
    return {
      // NOTE information brought to the page: my account, myMovie list, myEvents, and myGroups
      editable,
      account: computed(() => AppState.account),
      myMovies: computed(()=> AppState.myMovies),
      favoriteMovies: computed(()=> AppState.myFavoriteMovies),
      events: computed(()=> AppState.myEvents),
      groups: computed(()=> AppState.myGroups),
      async editAccount(){
      try {
        await accountService.editAccount(editable.value)
      } catch (error) {
        Pop.error(error)
        logger.log(error)
      }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
