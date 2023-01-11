<template>
  <router-link :to="{ name: 'Event', params: { id: event.id } }" class="event">
    <img class="eventImage" :src="event.coverImg" alt="">
    <div class="eventBody">
      <div class="eventHeader">
        <h4>{{ event.title }}</h4>
        <div>{{ new Date(event.startTime).toUTCString() }}</div>
      </div>
      <p>{{ event.description }}</p>
    </div>
  </router-link>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Group } from "../models/Group.js";
import { eventsService } from "../services/EventsService.js";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
// import { group } from "console";
export default {
  props: { event: { type: Object, required: true } },
  setup(props) {

    return {
      props,
      groupMovies: computed(() => AppState.groupMovies),
      setEventActive() {
        try {
          eventsService.setEventActive(props.event.id)
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
.event {
  display: flex;
  border: 1px solid goldenrod;
  padding: .5rem;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  overflow: hidden;
}

.eventImage {
  width: 100px;
  height: 100%;
  object-fit: cover;
}

.eventBody {
  padding-left: .5rem;
  color: white;
  text-overflow: ellipsis;
  width: 100%;
}

.eventHeader {
  display: flex;
  justify-content: space-between;

  div {
    color: rgba(255, 255, 255, 0.633);
  }
}
</style>