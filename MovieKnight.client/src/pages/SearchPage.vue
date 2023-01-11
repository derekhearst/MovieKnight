<template>
  <div class="container-fluid">
    <section class="row justify-content-evenly p-1">
          <!-- TODO v-for over this col-3 -->
          <div v-if="movies" class="col-2 m-1 p-3" v-for="m in movies">
            <MovieCard :movie="m"/>
          </div>
          <div v-if="groups" class="col-2 m-1 p-3" v-for="g in groups">
            <GroupCard :group="g"/>
          </div>
    </section>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { moviesService } from "../services/MoviesService.js";
import MovieCard from "../components/MovieCard.vue";
import GroupCard from "../components/GroupCard.vue";
export default {
    setup() {
        onMounted(() => {
            // getMovies()
        });
        // async function getMovies(){
        //   try {
        //     await moviesService.getMovies()
        //   } catch (error) {
        //     Pop.error(error)
        //     logger.log(error)
        //   }
        // }
        return {
            movies: computed(() => AppState.searchMovies),
            groups: computed(()=> AppState.groups)
        };
    },
    components: { MovieCard, GroupCard }
};
</script>


<style lang="scss" scoped>

</style>