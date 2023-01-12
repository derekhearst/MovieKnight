<template>
  <div class="searchPage">
    <img src="https://rare-gallery.com/mocahbig/480150-artwork-digital-art-castle-medieval.png" class="bgImage" />
    <div class="container" v-if="movies.length">
      <h1>Movies</h1>
      <div class="movies">
        <MovieCard :movie="m" v-for="m in movies" />
      </div>
    </div>
    <div class="container" v-if="groups.length">
      <h1>Groups</h1>
      <div class="groups">
        <GroupCard :group="g" v-for="g in groups" />
      </div>
    </div>
  </div>

</template>


<script setup>
import { AppState } from '../AppState';
import { computed, onMounted, watchEffect } from 'vue';
import { useRoute } from "vue-router";
import { moviesService } from "../services/MoviesService.js";
import { groupsService } from "../services/GroupsService.js";
import { logger } from "../utils/Logger.js";
import MovieCard from "../components/MovieCard.vue";
import GroupCard from "../components/GroupCard.vue";

const route = useRoute();

onMounted(() => {
  handlePage()
});
watchEffect(() => {
  if (route.query) {
    handlePage()
  }
})

async function handlePage() {
  try {
    await groupsService.searchGroups(route.query)
    await moviesService.searchMovies(route.query.search)
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}
let movies = computed(() => AppState.searchMovies)
let groups = computed(() => AppState.searchGroups)
</script>


<style lang="scss" scoped>
.searchPage {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  background-color: transparent;
}

.bgImage {
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

}

.container {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;


  h1 {
    font-family: 'MedievalSharp', cursive;
    font-size: 3rem;
    font-weight: bold;
    color: black;
    background-image: url("../assets/img/goodsecondarybutton-removebg-preview.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    padding-left: 3rem;
    padding-right: 3rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
}

.movies {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.groups {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
</style>