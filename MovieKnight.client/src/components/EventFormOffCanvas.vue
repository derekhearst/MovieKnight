<template>
  <div class="offcanvas offcanvas-end" tabindex="-1" id="event" aria-labelledby="event">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasExampleLabel">Make Event</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <form @submit.prevent="makeEvent">
        <div class="form-group my-2">
          <label for="title">Title</label>
          <input v-model="editable.title" type="text" class="form-control" aria-describedby="emailHelp" minlength="3"
            maxlength="20" id="title" placeholder="Place event title here...">
        </div>
        <div class="form-group my-2">
          <label for="description">Description</label>
          <input v-model="editable.description" type="text" class="form-control" aria-describedby="emailHelp"
            maxlength="200" id="description" placeholder="Place event description here...">
        </div>
        <div class="form-group my-2">
          <label for="coverImg">Cover Image</label>
          <input v-model="editable.coverImg" type="text" class="form-control" aria-describedby="emailHelp" id="coverImg"
            placeholder="Place cover image here...">
        </div>
        <div class="form-group my-2">
          <label for="location">Location</label>
          <input v-model="editable.location" type="text" class="form-control" aria-describedby="emailHelp" id="location"
            placeholder="Where is your event?">
        </div>
        <div class="form-group my-2">
          <label for="capacity">Capacity</label>
          <input v-model="editable.capacity" type="number" class="form-control" aria-describedby="emailHelp"
            id="capacity" placeholder="Capacity">
        </div>
        <div>
          <label for="startTime">Start Time</label>
          <input v-model="editable.startTime" type="datetime-local" class="form-control mb-1">
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
import { eventsService } from "../services/EventsService.js";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute()
    const editable = ref({})
    return {
      myGroups: computed(() => AppState.myGroups),
      group: computed(() => AppState.activeGroup),
      editable,
      async makeEvent() {
        try {
          editable.value.groupId = route.params.id
          editable.value.canceled = false
          await eventsService.makeEvent(editable.value)
          // await eventsService.addMovieToEvent(editable.value)
          editable.value = {}
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