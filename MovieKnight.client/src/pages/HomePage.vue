<template>
  <div class="container-fluid">
    <section class="row justify-content-center mt-3">
      <!-- SECTION movies -->
      <div class="col-7 m-2 p-1">
        <section class="row justify-content-evenly p-1">
          <!-- TODO v-for over this col-3 -->
          <div class="col-3 p-3" v-for="m in movies">
            <MovieCard :movie="m"/>
          </div>
        </section>
      </div>
      <!-- SECTION groups and events -->
      <div class="col-4">
        <!-- SECTION groups -->
        <section class="row justify-content-center">
          <div class="col-10">
            <h1 class="fw-bold">My Groups</h1>
          </div>
          <div class="col-10"></div>
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

</style>
