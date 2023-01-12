<template>
  <div class="container-fluid">
    <section class="row justify-content-evenly p-1">
      <!-- TODO v-for over this col-3 -->
      <div v-if="movies" class="movies">
        <MovieCard :movie="m" v-for="m in movies" />
      </div>
      <div v-if="groups" class="groups">
        <GroupCard :group="g" v-for="g in groups" />
      </div>
    </section>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, watchEffect } from 'vue';
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { moviesService } from "../services/MoviesService.js";
import MovieCard from "../components/MovieCard.vue";
import GroupCard from "../components/GroupCard.vue";
import { useRoute, useRouter } from "vue-router";
import { groupsService } from "../services/GroupsService.js";
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    onMounted(() => {
      handlePage()
      // getMovies()
    });
    watchEffect(() => {
      handlePage()
    })
    //  logger.log('re-routing')
    //   if(AppState.movies == 0 && AppState.groups == 0){
    //   router.push({ name: 'Home' })
    async function handlePage() {
      if (route.params.category == 'group') {
        await groupsService.searchGroups(route.query)
      } else {
        await moviesService.searchMovies(route.query.search)
      }
    }

    async function getMovies() {
      try {
        await moviesService.getMovies()
      } catch (error) {
        Pop.error(error)
        logger.log(error)
      }
    }
    return {
      route,
      router,
      movies: computed(() => AppState.movies),
      groups: computed(() => AppState.groups)
    };
  },
};
</script>


<style lang="scss" scoped>
.movies {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 1rem;
}

.groups {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 1rem;
}
</style>