<template>
  <div class="container-fluid">
    <section class="row justify-content-evenly mt-3">
      <!-- SECTION movies -->
      <div class="col-8 p-1 overflow-auto">
        <section class="row justify-content-evenly p-1">
          <!-- TODO v-for over this col-3 -->
          <div class="col-3 p-3" v-for="m in movies">
            <MovieCard :movie="m"/>
          </div>
        </section>
      </div>
      <!-- SECTION groups and events -->
      <div class="col-3 border-style">
        <!-- SECTION groups -->
        <section class="row justify-content-center">
          <div class="col-10 d-flex justify-content-between">
            <h1 class="fw-bold">My Groups</h1>
            <button class="btn maroon fw-bold fs-4">Make Group</button>
          </div>
          <div class="col-10 card my-3">
            <section class="row text-dark">
              <div class="col-4">
                <img src="http://thiscatdoesnotexist.com" class="img-fluid" alt="">
              </div>
              <div class="col-7">
                <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos magni fugit cum eveniet commodi suscipit! Ipsam dicta eveniet quo atque corrupti ipsa possimus at quaerat aliquam. Nostrum dolores nam quia.</h6>
              </div>
            </section>
          </div>
        </section>
        <!-- SECTION events -->
        <section class="row">
          <div class="col-10"></div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import { AppState } from "../AppState.js";
import { computed, reactive, onMounted } from 'vue';
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { moviesService } from "../services/MoviesService.js";
import MovieCard from "../components/MovieCard.vue";


export default {
    setup() {
        onMounted(() => {
            getMovies();
        });
        async function getMovies() {
            try {
                await moviesService.getMovies();
            }
            catch (error) {
                Pop.error(error);
                logger.log(error);
            }
        }
        return {
            movies: computed(() => AppState.movies)
        };
    },
    components: { MovieCard }
}
</script>

<style scoped lang="scss">
.maroon{
  background-color: #fbcf33;
  color: #8f1515;
}
.border-style{
  // border-color:#fbcf33;
  border-left: 2px solid #fbcf33;
}
</style>
