<template>
  <div class="modal fade" id="addmovietoevent" tabindex="-1" role="dialog" aria-labelledby="movie" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Which movie would you like to add?</h5>
        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        
          <h3>Guild Movies</h3>
          <div>
            <section class="row align-items-evenly"  >
              <div class="col-6 p-2" v-for="m in movies">
                <NoRouterMovieCard :movie="m.movie"/>
              </div>
          </section>
          </div>
          <div class="modal-footer">
          </div>
        
      </div>
    </div>
  </div>
</div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { groupsService } from "../services/GroupsService.js";
import { useRoute } from "vue-router";
import NoRouterMovieCard from "./NoRouterMovieCard.vue";

export default {
    setup() {
      const route = useRoute();
      const editable = ref({});
      // TODO get all guilds and get active movie
      return {
            movies: computed(() => AppState.groupMovies),
            editable,
            route,
        };
    },
};
</script>


<style lang="scss" scoped>

</style>