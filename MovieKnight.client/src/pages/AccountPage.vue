<template>
  <div class="container-fluid">
    <section class="row justify-content-center">
      <div class="about text-center col-8">
        <h1>Welcome {{ account.name }}</h1>
        <img class="rounded" :src="account.picture" alt="" />
        <p>{{ account.email }}</p>
      </div>
      <div class="about text-center col-5">
        <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample"
          aria-expanded="false" aria-controls="collapseExample">
          Edit Account
        </button>
        <div class="collapse" id="collapseExample">
          <div class="bg-dark text-center">
            <form @submit.prevent="editAccount">
              <div class="form-group">
                <label for="exampleInputEmail1">Name</label>
                <input v-model="editable.name" type="text" class="form-control" id="exampleInputEmail1"
                  aria-describedby="emailHelp" :placeholder=account.name>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input v-model="editable.picture" type="text" class="form-control" id="exampleInputPassword1"
                  :placeholder=account.picture>
              </div>
              <button type="submit" class="btn btn-success">Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    </section>
    <section class="row">
      <h1>My Favorites</h1>
      <!-- <div v-if="myMovies" class="movies">
      <MovieCard :movie="m.movie" v-for="m in myMovies" />
    </div> -->
      <h1>My Movies</h1>
      <div v-if="myMovies" class="movies movie">
        <div class="movie"  v-for="m in myMovies" >
          <MovieCard :movie="m.movie"/>
          <i v-if="m.isFavorite" @click="switchFavorite(m.id)" class="mdi mdi-heart fs-2 text-danger selectable" title="UnFavorite"></i>
          <i v-else @click="switchFavorite(m.id)" class="btn mdi mdi-heart-outline fs-2 selectable" title="Favorite"></i>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { AppState } from '../AppState'
import MovieCard from "../components/MovieCard.vue"
import { accountService } from "../services/AccountService.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
export default {
  setup() {
    const editable = ref({});
    onMounted(() => {
    });
    return {
      // NOTE information brought to the page: my account, myMovie list, myEvents, and myGroups
      editable,
      account: computed(() => AppState.account),
      myMovies: computed(() => AppState.myMovies),
      favoriteMovies: computed(() => AppState.myFavoriteMovies),
      events: computed(() => AppState.myEvents),
      groups: computed(() => AppState.myGroups),
      async editAccount() {
        try {
          await accountService.editAccount(editable.value);
        }
        catch (error) {
          Pop.error(error);
          logger.log(error);
        }
      },
      async switchFavorite(id){
        try {
          await accountService.switchFavorite(id)
        } catch (error) {
          Pop.error(error)
          logger.log(error)
        }
      }
    };
  },
}
</script>

<style scoped lang="scss">
.movies {
  flex-basis: 75vw;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.movie {
  position: relative;
i{
  position: absolute;
  top: 0;
  right:0;
  z-index: 3;
}
}
</style>
