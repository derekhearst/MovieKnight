<template>
  <div class="modal fade" id="movieModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add Movie to Guild</h5>
        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form action="" @submit.prevent="addMovieToGuild">
          <h3>Which Guild?</h3>
          <select name="" id="" v-model="editable">
            <option  v-for="g in myGroups" :value="g.group.id">{{ g.group.title }}</option>
          </select>
          <div class="modal-footer">
            <button class="btn btn-primary" data-bs-dismiss="modal" aria-label="Close">Add to Guild</button>
          </div>
        </form>
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
export default {
  setup(){
    const editable = ref({})
    // TODO get all guilds and get active movie
  return {
    myGroups: computed(()=> AppState.myGroups),
    movie: computed(()=> AppState.activeMovie),
    editable,
    async addMovieToGuild(){
      try {
        await groupsService.addMovieToGroup(editable.value, this.movie)
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

</style>