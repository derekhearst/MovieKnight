<template>
  <form class="input-group w-25" @submit.prevent="searchMovies">
    <input id="search-input" type="search" class="form-control" placeholder="Find Movies" v-model="search.query"/>
    <button id="search-button" type="submit" class="btn maroon w-25">Search
      <i class="mdi mdi-movie-search fs-5"></i>
    </button>
      </form>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { moviesService } from "../services/MoviesService.js";
import { useRouter } from "vue-router";
export default {
  setup(){
    const router = useRouter()
    const search = reactive({
      query: ""
    })
  return {
    search,
    async searchMovies(){
      try {
        await moviesService.searchMovies(search)
        router.push({name: 'Search'})
        search.query = ""
      } catch (error) {
        Pop.error(error)
        logger.log(error)
      }
    }
  }
  }
};
</script>


<style lang="scss" scoped>
.maroon{
  background-color: #fbcf33;
  color: #8f1515;
}
</style>