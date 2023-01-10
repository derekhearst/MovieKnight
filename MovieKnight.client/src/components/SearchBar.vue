<template>

  <form class="searchBar" @submit.prevent="searchMovies">
    <input class="form-control" placeholder="Find Movies" v-model="search.query" />
    <button class="searchButton">Search
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
  setup() {
    const router = useRouter()
    const search = reactive({
      query: ""
    })
    return {
      search,
      async searchMovies() {
        try {
          await moviesService.searchMovies(search)
          router.push({ name: 'Search' })
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
.maroon {
  background-color: #fbcf33;
  color: #8f1515;
  display: flex;
  align-items: center;
  gap: .25rem;
}

.maroon:hover {
  background-color: hsla(47, 100%, 60%, 0.726) !important;

}


.searchBar {
  width: clamp(100px, 50vw, 500px);
  display: flex;
  gap: .5rem
}

.searchButton {
  background-image: url("../assets/img/goodbutton-removebg-preview.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  background-color: transparent;
  width: 13rem;
  height: 3rem;
  font-size: 1.5rem;
  font-family: 'MedievalSharp', cursive;
  font-weight: bold;

}
</style>