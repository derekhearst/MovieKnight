<template>
<div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasExampleLabel">Form Guild</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <form @submit.prevent="createGroup()">
      <div class="form-group my-2">
        <label for="title">Title</label>
        <input v-model="editable.title" type="text" class="form-control" aria-describedby="emailHelp" minlength="3" maxlength="20" id="title" placeholder="Place group title here...">
      </div>
      <div class="form-group my-2">
        <label for="description">Description</label>
        <input v-model="editable.description" type="text" class="form-control" aria-describedby="emailHelp" maxlength="200" id="description" placeholder="Place group description here...">
      </div>
      <div class="form-group my-2">
        <label for="coverImg">Cover Image</label>
        <input v-model="editable.coverImg" type="text" class="form-control" aria-describedby="emailHelp" id="coverImg" placeholder="Place cover image here...">
      </div>
      <div class="form-group my-2">
        <label for="visibility">Visibility</label>
        <select v-model="editable.visibility" class="form-control" aria-describedby="emailHelp" id="visibility">
          <option value="true">Public</option>
          <option value="false">Private</option>
        </select>
        
      </div>
  <button type="submit" class="btn btn-primary">Submit</button>
    </form>
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
  return {
    editable,
    async createGroup(){
      try {
        await groupsService.createGroup(editable.value)
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