<template>
  <router-link :to="{ name: 'MovieDetails', params: { id: movie.mdId } }" class="movieCard">
    <img :src="movie.posterImg" alt="" class="poster">
  </router-link>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Movie } from "../models/Movie.js";
export default {
  props: { movie: { type: Movie, required: true } },
  setup() {
    return {}
  }
};
</script>


<style lang="scss" scoped>
.movieCard {
  width: 250px;
  object-fit: cover;
  box-shadow: 3px 3px 2px 2px #ad8a0a;
}

.poster {
  width: 100%;
  height: 25rem;
  object-fit: cover;
}
</style>