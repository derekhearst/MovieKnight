<template>
  <router-link :to="{ name: 'Event', params: { id: event.id } }" class="event">
    <div class="eventHeader">
      <img class="eventImage" :src="event.coverImg" alt="">
      <div class="eventStack">
        <h4>{{ event.title }}</h4>
        <div>{{ new Date(event.startTime).toDateString() }}</div>
      </div>
    </div>
    <p>{{ event.description }}</p>
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
  flex-direction: column;
  padding: .5rem;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  overflow: hidden;
  color: white;
  align-items: flex-start;
  word-break: break-all;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.9);
}

.eventImage {
  width: 100px;
  height: 100%;
  object-fit: cover;
}

.eventStack {
  display: flex;
  flex-direction: column;
  gap: .5rem;
  margin-left: 1rem;
  color: white;
}

.eventHeader {
  display: flex;
  justify-content: space-between;


}
</style>