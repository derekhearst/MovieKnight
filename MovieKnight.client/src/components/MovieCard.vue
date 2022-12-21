<template>
  <router-link :to="{ name: 'MovieDetails', params: {id: movie.id} }">
    <img :src="movie.posterImg" alt="" class="movie-elv">
  </router-link>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Movie } from "../models/Movie.js";
export default {
  props: {movie: {type: Movie, required: true}},
  setup(){
  return {  }
  }
};
</script>


<style lang="scss" scoped>
.movie-elv{
  box-shadow: 3pt 3pt 3pt whitesmoke;
  height: 33vh;
  width: 100%;
  object-fit: cover;
}
</style>