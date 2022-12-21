<template>
  <div class="container">
    <section class="row">
      <div class="col-3"></div>
    </section>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { moviesService } from "../services/MoviesService.js";
export default {
  setup(){
    onMounted(()=>{
      getMovies()
    })
    async function getMovies(){
      try {
        await moviesService.getMovies()
      } catch (error) {
        Pop.error(error)
        logger.log(error)
      }
    }
  return {
    movies: computed(()=> AppState.movies)
  }
  }
};
</script>


<style lang="scss" scoped>

</style>