<template>
    <img :src="movie.posterImg" alt="" class="movie-elv selectable" @click="addMovieToEvent">
    <!-- <button v-if="group" class="btn"><i class="mdi mdi-plus"></i></button> -->
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Movie } from "../models/Movie.js";
import { eventsService } from "../services/EventsService.js";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";

export default {
  props: {movie: {type: Movie, required: true}},
  setup(props){
  return {
    activeEventId: computed(()=> AppState.activeEventId),
    async addMovieToEvent(){
            try {
              await eventsService.addMovieToEvent(this.activeEventId, props.movie)
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
.movie-elv{
  box-shadow: 3pt 3pt 3pt whitesmoke;
  height: 40em;
  width: 100%;
  object-fit: cover;
}
</style>